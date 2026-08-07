// Metadata central de las 3 categorías del sitio
export const CATEGORIAS = {
  banqueteria: {
    slug: 'banqueteria',
    nombre: 'Banquetería',
    eyebrow: 'Matrimonios y eventos',
    superindice: '01',
    descripcion:
      'Velas para banquetería, matrimonios y producción de eventos. Más de 30 medidas en blanco e marfil, con stock permanente para pedidos por volumen y despacho a todo Chile.',
    descripcionCorta: 'Velas para matrimonios y eventos.',
    // Lista de precios en PDF (descarga lead-gated). Sin `pdf` → el chip no aparece.
    pdf: '/pdf/lista-precios-banqueteria-2026.pdf',
    heroBg: '#283028',
    imagen: '/images/fotos_web/banqueteria-hero-web.jpg',
    imagenPanel: '/images/categorias/banqueteria-panel.jpg',
    heroPos: '50% 50%',
    cta: 'Ver colección',
    // Frase corta de valor sobre la foto del hero
    heroLead: 'Velas que están a la altura de tus eventos.',
    // Narrativa de "landing de confianza" (solo definida para Banquetería).
    // Si existe, CatalogoCategoria arma el recorrido completo; si no, usa el layout base.
    landing: {
      // Scrollytelling de impacto: título en 4 líneas + bajada + bullets
      dolorLineas: [
        'Cuando un evento no',
        'admite errores,',
        'un buen proveedor',
        'marca la diferencia.',
      ],
      dolor:
        'Por eso, en Velas Devas somos un partner estratégico para nuestros clientes.',
      // Conceptos que aparecen uno por uno (pin + scroll)
      bullets: [
        '+30 años de oficio',
        'Velas de máxima calidad',
        'Producción 100% nacional',
        'Lotes estandarizados',
        'Stock permanente',
        'Responsabilidad y respaldo',
      ],
      beneficios: [
        { t: 'Más de 30 años de experiencia y oficio.' },
        { t: 'La misma calidad, pedido tras pedido.' },
        { t: 'Producción nacional con altos estándares.' },
        { t: 'Entregas comprometidas a todo Chile.' },
        { t: 'Relaciones basadas en confianza y responsabilidad.' },
      ],
      // Pausa full-bleed en vídeo (evento) con filtro oscuro dramático.
      pausa: {
        frase: 'Estamos contigo en esos momentos donde nada puede salir mal.',
        video: '/images/video_web/0_Wedding_Reception_1280x720.mp4',
        imagen: '/images/fotos_web/banqueteria-pausa.jpg',
        pos: '50% 50%',
        cta: 'Haz tu pedido aquí',
      },
      // Split editorial "El oficio": manos moldeando la cera (materialidad real).
      oficio: {
        eyebrow: 'Nuestro compromiso',
        titulo: '¿Por qué confiar en Velas Devas?',
        texto:
          'Porque sabemos que no solo buscas velas. Buscas la tranquilidad de trabajar con un proveedor que cumpla lo prometido, mantenga la misma calidad en cada pedido y responda cuando más lo necesitas. Desde hace más de 30 años, ese ha sido nuestro compromiso con cada cliente.',
        foto: '/images/fotos_web/banqueteria-oficio.jpg',
        fotoPos: '50% 45%',
        cta: 'Contactar proveedor',
      },
      catalogoTitulo: 'El formato ideal para cada proyecto.',
      catalogoIntro:
        'Explora nuestro catálogo y encuentra la medida que mejor se adapta a tus necesidades. Cada una de nuestras velas se fabrica con el mismo cuidado, calidad y compromiso que nos han caracterizado por más de 30 años.',
      // Franja fotográfica full-bleed (respiro antes de la prueba social)
      fotoFranja: '/images/fotos_web/banqueteria-franja.jpg',
      ctaFinal: {
        titulo: '¿Listo para hacer tu pedido?',
        bajada: 'Contáctanos y trabajaremos en tu requerimiento.',
        boton: 'Contáctanos',
        imagen: '/images/fotos_web/banqueteria-cta.jpg',
      },
    },
  },
  religiosas: {
    slug: 'religiosas',
    nombre: 'Religiosas',
    eyebrow: 'Parroquias e iglesias',
    superindice: '02',
    // Los velones se presentan como un CONFIGURADOR (un módulo con selector de
    // diámetro/alto + silueta a escala), en vez de una grilla de tarjetas con la
    // misma foto repetida. Los productos sueltos (p. ej. Vela de Bautizo) siguen
    // como tarjeta normal. Ver ConfiguradorVelones + CatalogoCategoria.
    configurador: true,
    // Tres SEGMENTOS apilados, cada uno con su propio configurador (selector
    // diámetro/alto + precio) y su galería de fotos. Los productos se asocian por
    // su campo `segmento` en productos.json. Cada galería tiene hasta 6 fotos;
    // decorados/impresos usan PLACEHOLDERS (mismas fotos) hasta reemplazarlas.
    segmentos: [
      {
        key: 'normales',
        eyebrow: 'Línea litúrgica',
        titulo: 'Velones y cirios lisos',
        lead: 'La línea clásica de fabricación propia, en blanco nieve y marfil, disponible en todas las medidas.',
        fotos: [
          { src: '/images/catalogo/religiosos/01.jpg', color: 'Color marfil' },
          { src: '/images/catalogo/religiosos/02.jpg', color: 'Color blanco nieve' },
          { src: '/images/catalogo/religiosos/03.jpg', color: 'Color blanco nieve' },
          { src: '/images/catalogo/religiosos/04.jpg', color: 'Color blanco nieve' },
        ],
      },
      {
        key: 'decorados',
        eyebrow: 'Línea litúrgica',
        titulo: 'Velones y cirios decorados',
        lead: 'Decorados a mano para celebraciones, sacramentos y ocasiones especiales.',
        sueltosTitulo: 'Bautizo y primera comunión',
        // ⚠️ PLACEHOLDER — reemplazar por fotos reales de decorados en esta carpeta.
        fotos: [
          { src: '/images/catalogo/religiosos-decorados/01.jpg' },
          { src: '/images/catalogo/religiosos-decorados/02.jpg' },
          { src: '/images/catalogo/religiosos-decorados/03.jpg' },
          { src: '/images/catalogo/religiosos-decorados/04.jpg' },
        ],
      },
      {
        key: 'impresos',
        eyebrow: 'Línea litúrgica',
        titulo: 'Velones y cirios impresos',
        lead: 'Con impresión personalizada para tu parroquia, comunidad o evento.',
        // ⚠️ PLACEHOLDER — reemplazar por fotos reales de impresos en esta carpeta.
        fotos: [
          { src: '/images/catalogo/religiosos-impresos/01.jpg' },
          { src: '/images/catalogo/religiosos-impresos/02.jpg' },
          { src: '/images/catalogo/religiosos-impresos/03.jpg' },
          { src: '/images/catalogo/religiosos-impresos/04.jpg' },
        ],
      },
    ],
    descripcion:
      'Cirios y velones de fabricación propia para parroquias, capillas y comunidades religiosas. Elaboramos cada pieza con altos estándares de calidad, disponibles en distintas medidas y en tonos blanco nieve o marfil. Además, desarrollamos velones pascuales decorados e impresos para celebraciones y ocasiones especiales.',
    descripcionCorta: 'Cirios y velones para iglesias.',
    pdf: '/pdf/lista-precios-religiosas-2026.pdf',
    heroBg: '#323C32',
    imagen: '/images/categorias/religiosas.jpg',
    imagenPanel: '/images/categorias/religiosas.jpg',
    // Encuadre hacia arriba: incluye la cruz y las llamas de los cirios
    heroPos: '50% 12%',
    panelPos: '60% 30%',
    cta: 'Ver colección',
    heroLead: 'La luz que acompaña cada celebración.',
    // Narrativa de "landing de confianza" adaptada al nicho religioso.
    // ⚠️ Imágenes 🖼️ son placeholders con fotos existentes — reemplazar por
    // fotografía real de contexto religioso cuando esté disponible.
    landing: {
      dolorLineas: [
        'Cada celebración',
        'merece una luz',
        'a la altura de',
        'su significado.',
      ],
      dolor:
        'Por eso, parroquias y comunidades religiosas de todo Chile\nconfían en Velas Devas.',
      bullets: [
        'Fabricación propia',
        'Cirios y velones de calidad',
        'Blanco nieve y marfil',
        'Cirios pascuales decorados',
        'Disponibilidad todo el año',
        'Despacho a todo Chile',
      ],

      beneficios: [
        { t: 'Más de 30 años fabricando velas.' },
        { t: 'Cirios y velones que honran cada celebración.' },
        { t: 'Tonos blanco nieve y marfil, medidas tradicionales.' },
        { t: 'Velones pascuales decorados e impresos a pedido.' },
        { t: 'Abastecimiento constante para tu comunidad.' },
      ],
      pausa: {
        frase:
          'Una llama que acompaña la oración, el recogimiento y la esperanza.',
        imagen: '/images/fotos_web/religiosa_pausa.jpg', // foto real Devas (optimizada)
        pos: '50% 50%',
        cta: 'Haz tu pedido aquí',
      },
      oficio: {
        eyebrow: 'Nuestro compromiso',
        titulo: '¿Por qué las comunidades religiosas eligen Velas Devas?',
        texto:
          'Porque una vela litúrgica no es un producto más: acompaña momentos de fe, memoria y celebración. Desde hace más de 30 años fabricamos cirios y velones con la calidad, la constancia y el respeto que cada comunidad merece, cumpliendo lo prometido en cada pedido.',
        foto: '/images/fotos_web/religiosa_oficio.jpg', // foto real Devas (optimizada)
        fotoPos: '50% 45%',
        fotoColor: true, // símbolos pascuales a color (cruz, cáliz)
        cta: 'Contactar proveedor',
      },
      catalogoTitulo: 'La medida justa para cada celebración.',
      catalogoIntro:
        'Explora nuestro catálogo de cirios y velones. Desde el uso diario del altar hasta el cirio pascual, cada pieza se fabrica con el mismo cuidado y calidad que nos caracterizan hace más de 30 años. Disponibles en blanco nieve y marfil.',
      fotoFranja: '/images/fotos_web/religiosa_franja.jpg', // foto real Devas (optimizada)
      ctaFinal: {
        titulo: '¿Listo para abastecer a tu comunidad?',
        bajada: 'Cuéntanos qué necesitas y preparamos tu pedido.',
        boton: 'Contáctanos',
        imagen: '/images/editorial/llama.jpg', // 🖼️ placeholder
      },
    },
  },
  funerarias: {
    slug: 'funerarias',
    nombre: 'Funerarias',
    eyebrow: 'Servicios funerarios',
    superindice: '03',
    descripcion:
      'Velas y velones para funerarias y salas velatorias. Stock permanente, precios mayoristas y despacho a todo Chile, con formatos especiales a pedido.',
    descripcionCorta: 'Velas de uso profesional.',
    heroBg: '#1F261F',
    imagen: '/images/categorias/funerarias.jpg',
    imagenPanel: '/images/categorias/funerarias.jpg',
    // Encuadre para mostrar los velones encendidos y la rosa blanca
    heroPos: '50% 32%',
    panelPos: '55% 42%',
    cta: 'Ver colección',
    heroLead:
      'Velas que acompañan con la calidad y el respeto que cada ceremonia merece.',
    // Narrativa de "landing de confianza" adaptada al rubro funerario. Misma
    // estructura/animaciones que Banquetería; solo cambia el mensaje.
    // ⚠️ Imágenes 🖼️ son placeholders (fotos existentes) — reemplazar por
    // fotografía real de contexto funerario cuando esté disponible.
    landing: {
      // Flujo "sobrio" (solo Funerarias): intro sin conceptos, pausa sticky que
      // "Nuestro compromiso" tapa al subir, y costuras orgánicas entre secciones.
      variante: 'sobria',
      // Frase de CTA del hero (parametrizada; el resto de categorías usa "Ver catálogo")
      ctaVerCatalogo: 'Ver catálogo funerario',
      // ── Sección 2 · El desafío (intro centrada, 2 líneas, sin conceptos) ──
      dolorLineas: ['Cuando una vela falla,', 'se nota.'],
      dolor:
        'Una llama inestable, el exceso de cera, el humo o una duración menor a la esperada afectan la presentación en un momento donde todo debe transcurrir con serenidad. Por eso cuidamos cada etapa de nuestra fabricación.',
      // ── Sección 3 · Por qué elegir Velas Devas (tarjetas numeradas) ──
      beneficios: [
        {
          titulo: 'Calidad que se nota',
          desc: 'Combustión uniforme, mínimo humo, sin chispazos y con derrame controlado de cera.',
        },
        {
          titulo: 'Mayor duración',
          desc: 'Velas de alto rendimiento que entregan más horas de iluminación.',
        },
        {
          titulo: 'Consistencia en cada lote',
          desc: 'Calidad uniforme en cada producción, para que siempre recibas el mismo estándar.',
        },
        {
          titulo: 'Excelente relación precio–calidad',
          desc: 'Fabricación nacional y precios competitivos, sin comprometer la calidad.',
        },
      ],
      pausa: {
        frase: 'En una ceremonia de despedida no hay espacio para improvisar.',
        imagen: '/images/fotos_web/para_fondo_funeraria_02.jpg',
        pos: '50% 50%',
        cta: 'Haz tu pedido aquí',
      },
      oficio: {
        eyebrow: 'Nuestro compromiso',
        titulo: '¿Por qué las funerarias eligen Velas Devas?',
        texto:
          'En un momento de despedida, cada detalle importa, y tu servicio no puede fallar. Desde hace más de 30 años fabricamos velas de combustión uniforme, gran duración y calidad constante, para que siempre puedas responder con la tranquilidad de un proveedor confiable.',
        foto: '/images/fotos_web/handcrafted-candle-making.jpg', // 🖼️ placeholder (oficio B&N)
        fotoPos: '50% 45%',
        cta: 'Contactar proveedor',
      },
      catalogoTitulo: 'La medida justa para cada servicio.',
      catalogoIntro:
        'Explora nuestro catálogo de velas y velones para funerarias. Cada formato se fabrica con la misma calidad, combustión uniforme y consistencia, disponible en Blanco Nieve y Marfil, con stock permanente y despacho a todo Chile.',
      fotoFranja: '/images/fotos_web/para_fondo_funeraria_01.jpg',
      ctaFinal: {
        titulo: 'Más de 30 años siendo un proveedor en quien confiar.',
        bajada:
          'Fabricamos velas para funerarias que necesitan un producto uniforme, confiable y disponible cuando lo requieren. Porque en momentos donde cada detalle importa, contar con un proveedor que responde hace toda la diferencia.',
        boton: 'Contáctanos',
        imagen: '/images/fotos_web/imagen_banner_cierre_funeraria.jpg',
        // Imagen ya oscura (velas sobre negro) → se muestra más presente que el
        // opacity-40 por defecto; el negro del fondo da contraste al texto.
        imagenClase: 'object-cover object-center opacity-80',
      },
    },
  },
};

// Rutas de imágenes reutilizables (fotos reales de Devas).
// Estructura: /images/categorias/ (portadas) · /images/editorial/ (nosotros, contacto, CTA)
export const IMAGENES = {
  velaOscura: '/images/editorial/vela-oscura.jpg', // poster del video en Nosotros
  religiosas: '/images/categorias/religiosas.jpg', // fondo CTA Nosotros
  llama: '/images/editorial/llama.jpg', // detalle llama (CTA catálogo)
  banqueteria: '/images/categorias/banqueteria-hero.jpg', // hero Nosotros
  bodasRosas: '/images/editorial/bodas-rosas.jpg', // contacto + imagen lateral Nosotros
};

export const CATEGORIAS_LISTA = Object.values(CATEGORIAS);

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/banqueteria', label: 'Banquetería' },
  { href: '/religiosas', label: 'Religiosas' },
  { href: '/funerarias', label: 'Funerarias' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export const EMPRESA = {
  nombre: 'Velas Devas',
  desde: 2000,
  direccion: 'Av. Santa Rosa N° 6435, Bodega 11, Santiago',
  telefono: '(2) 2526 3491',
  telefonoLink: '+56225263491',
  whatsapp: '56998846164', // ✅ CONFIRMADO (+56 9 9884 6164) — formato wa.me (sin +)
  email: 'contacto@velasdevas.cl',
  web: 'velasdevas.cl',
  tagline:
    'Fabricantes de velas para banquetería, iglesias y funerarias. Mayorista en todo Chile desde el año 2000.',
};
