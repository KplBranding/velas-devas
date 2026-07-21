#!/usr/bin/env python3
"""
Procesa los logos de public/marcas/ para el carrusel "Confían en nosotros".

Para cada imagen (PNG, JPG, JPEG, WEBP):
  - conserva la transparencia previa
  - elimina el fondo: transparencia + blanco + color de borde/esquina
  - detecta el área del logo y lo recorta
  - lo recolorea a #6B7280 (bordes suavizados)
  - lo centra en un lienzo de 240x120 px con 10% de margen, a proporción
  - exporta PNG transparente en public/marcas/logos_funerarias/

Protección: si el logo es mayormente blanco (logo "en blanco"), NO borra el
blanco, para no hacerlo desaparecer.

Si un archivo falla, continúa con los demás y genera un reporte final.

Los logos crudos van por categoría en:  public/marcas/origen/<categoria>/
y el resultado se guarda en:             public/marcas/logos_<categoria>/

Uso:
  npm run logos                # categoría: funerarias (por defecto)
  npm run logos banqueteria    # lee origen/banqueteria → logos_banqueteria
  npm run logos religiosas     # lee origen/religiosas  → logos_religiosas
"""

import os
import re
import sys
import unicodedata
from PIL import Image, ImageChops, ImageFilter

# ── Configuración ──────────────────────────────────────────────
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CAT = sys.argv[1] if len(sys.argv) > 1 else "funerarias"
MARCAS_DIR = os.path.join(BASE, "public", "marcas")
SRC = os.path.join(MARCAS_DIR, "origen", CAT)   # logos crudos de esta categoría
OUT = os.path.join(MARCAS_DIR, f"logos_{CAT}")  # salida procesada

CANVAS = (240, 120)          # medida ideal para el carrusel
MARGIN = 0.10                # 10% de margen por lado (por defecto)
COLOR = (107, 114, 128)      # #6B7280
FUZZ = 40                    # tolerancia color de borde (0-441)
WHITE_CUTOFF = 234           # >= en los 3 canales = fondo blanco
EXTS = (".png", ".jpg", ".jpeg", ".webp")

# Margen por logo (slug de salida) para afinar el tamaño relativo en el carrusel.
MARGIN_OVERRIDE = {
    "funeraria-forlivesi": 0.19,  # se veía más grande que el resto
}


def slugify(name):
    name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    name = name.lower().replace(" ", "-").replace("_", "-")
    name = re.sub(r"[^a-z0-9-]", "", name)
    return re.sub(r"-+", "-", name).strip("-")


def const(size, v):
    return Image.new("L", size, v)


def channel_min(rgb):
    r, g, b = rgb.split()
    return ImageChops.darker(ImageChops.darker(r, g), b)


def near_color_mask(rgb, color, fuzz):
    """255 = píxel cercano a `color` (fondo)."""
    r, g, b = rgb.split()
    dr = ImageChops.difference(r, const(rgb.size, color[0]))
    dg = ImageChops.difference(g, const(rgb.size, color[1]))
    db = ImageChops.difference(b, const(rgb.size, color[2]))
    dist = ImageChops.lighter(ImageChops.lighter(dr, dg), db)
    return dist.point(lambda p: 255 if p <= fuzz else 0)


def estimate_bg(rgb):
    """Color de fondo = promedio de parches en las 4 esquinas."""
    w, h = rgb.size
    p = max(2, min(w, h) // 20)
    boxes = [(0, 0, p, p), (w - p, 0, w, p), (0, h - p, p, h), (w - p, h - p, w, h)]
    cols = [rgb.crop(b).resize((1, 1)).getpixel((0, 0)) for b in boxes]
    return tuple(sum(c[i] for c in cols) // len(cols) for i in range(3))


def bbox_area(mask):
    bb = mask.getbbox()
    if not bb:
        return 0
    return (bb[2] - bb[0]) * (bb[3] - bb[1])


def foreground_alpha(img):
    """Devuelve la máscara de alfa del logo (255 = logo, 0 = fondo).

    Distingue tres casos:
      · fondo blanco / tarjeta blanca  → se quita el blanco
      · fondo de color, logo blanco     → se conserva el blanco (es el logo)
      · fondo de color con tarjeta blanca dominante (marco de color) → se quita
    """
    rgba = img.convert("RGBA")
    rgb = img.convert("RGB")
    size = rgba.size
    w, h = size
    total = w * h

    trans = rgba.getchannel("A").point(lambda p: 0 if p >= 250 else 255)
    white = channel_min(rgb).point(lambda p: 255 if p >= WHITE_CUTOFF else 0)
    white_ratio = white.histogram()[255] / total

    bgcol = estimate_bg(rgb)
    is_white_bg = min(bgcol) >= 226

    # ¿Quitar el blanco? Solo si el fondo es blanco, o si el blanco domina la
    # imagen (tarjeta blanca con marco de color). Si el fondo es de color y hay
    # poco blanco, ese blanco es el LOGO → se conserva.
    remove_white = is_white_bg or white_ratio > 0.35

    parts = [trans]
    if not is_white_bg:
        parts.append(near_color_mask(rgb, bgcol, FUZZ))  # quita el fondo/marco de color
    if remove_white:
        parts.append(white)

    bg = parts[0]
    for p in parts[1:]:
        bg = ImageChops.lighter(bg, p)
    fg = ImageChops.invert(bg)

    # Protección: si casi no queda logo, reintentar sin quitar el blanco.
    if bbox_area(fg) < 0.004 * total:
        keep = [trans]
        if not is_white_bg:
            keep.append(near_color_mask(rgb, bgcol, FUZZ))
        bg = keep[0]
        for p in keep[1:]:
            bg = ImageChops.lighter(bg, p)
        fg = ImageChops.invert(bg)
        if bbox_area(fg) < 0.004 * total:
            fg = ImageChops.invert(trans)

    return fg.filter(ImageFilter.GaussianBlur(0.6))


def process(path, out_path, margin=MARGIN):
    img = Image.open(path)
    img.load()

    alpha = foreground_alpha(img)

    colored = Image.new("RGBA", img.size, (*COLOR, 255))
    colored.putalpha(alpha)

    bbox = alpha.getbbox()
    if bbox is None:
        raise ValueError("imagen vacía tras quitar el fondo")
    logo = colored.crop(bbox)

    max_w = int(round(CANVAS[0] * (1 - 2 * margin)))
    max_h = int(round(CANVAS[1] * (1 - 2 * margin)))
    logo.thumbnail((max_w, max_h), Image.LANCZOS)

    canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    x = (CANVAS[0] - logo.width) // 2
    y = (CANVAS[1] - logo.height) // 2
    canvas.paste(logo, (x, y), logo)
    canvas.save(out_path, "PNG")


def main():
    if not os.path.isdir(SRC):
        print(f"✗ No existe la carpeta de origen: public/marcas/origen/{CAT}/")
        print(f"  Crea esa carpeta, deja ahí los logos crudos y vuelve a correr:")
        print(f"  npm run logos {CAT}")
        sys.exit(1)

    os.makedirs(OUT, exist_ok=True)
    archivos = [
        f for f in sorted(os.listdir(SRC))
        if f.lower().endswith(EXTS) and os.path.isfile(os.path.join(SRC, f))
    ]

    if not archivos:
        print(f"No hay imágenes para procesar en {SRC}")
        print(f"Formatos aceptados: {', '.join(EXTS)}")
        return

    ok, errores = [], []
    for f in archivos:
        base = slugify(os.path.splitext(f)[0])
        out_path = os.path.join(OUT, base + ".png")
        margin = MARGIN_OVERRIDE.get(base, MARGIN)
        try:
            process(os.path.join(SRC, f), out_path, margin)
            ok.append((f, base + ".png"))
            print(f"  ✓ {f}  →  logos_{CAT}/{base}.png")
        except Exception as e:  # noqa: BLE001
            errores.append((f, str(e)))
            print(f"  ✗ {f}  —  ERROR: {e}")

    linea = "─" * 52
    print("\n" + linea)
    print(f"RESUMEN · {len(ok)} procesados · {len(errores)} con error")
    print(linea)

    with open(os.path.join(OUT, "_reporte.txt"), "w", encoding="utf-8") as r:
        r.write(f"Procesados correctamente: {len(ok)}\n")
        for src, dst in ok:
            r.write(f"  OK   {src} -> {dst}\n")
        r.write(f"\nCon error: {len(errores)}\n")
        for src, msg in errores:
            r.write(f"  FAIL {src} : {msg}\n")

    print(f"Salida:  public/marcas/logos_{CAT}/")
    print(f"Reporte: public/marcas/logos_{CAT}/_reporte.txt")
    if ok:
        print("\nPara activarlos en el carrusel, avísame y los registro en lib/contenido.js")


if __name__ == "__main__":
    main()
