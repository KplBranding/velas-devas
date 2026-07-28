'use client';

import { useState } from 'react';
import { EMPRESA } from '../lib/categorias';

const CAMPO =
  'w-full bg-transparent border border-border-default rounded-[4px] px-3 py-2.5 font-sans text-[13px] font-light text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors';
const ETIQUETA = 'block type-label mb-1.5 text-text-body';

export default function ContactForm() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    rubro: 'Banquetería',
    telefono: '',
    mensaje: '',
  });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sin backend: abre el cliente de correo con los datos precargados.
    const cuerpo = [
      `Nombre: ${form.nombre}`,
      `Empresa: ${form.empresa}`,
      `Rubro: ${form.rubro}`,
      `Teléfono: ${form.telefono}`,
      '',
      form.mensaje,
    ].join('\n');
    const asunto = `Cotización mayorista — ${form.rubro}`;
    window.location.href = `mailto:contacto@velasdevas.cl?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpo)}`;
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="border border-border-default rounded-[4px] p-8">
        <p className="type-eyebrow">Solicitud lista</p>
        <h3 className="type-section text-[28px] mt-2 mb-3">Gracias por escribirnos</h3>
        <p className="type-body">
          Se abrió tu correo con la solicitud. Si prefieres, llámanos al{' '}
          <a href={`tel:${EMPRESA.telefonoLink}`} className="text-gold">
            {EMPRESA.telefono}
          </a>
          . Te responderemos a la brevedad.
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="btn-secondary mt-6"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={ETIQUETA} htmlFor="nombre">
          Nombre completo
        </label>
        <input
          id="nombre"
          type="text"
          required
          value={form.nombre}
          onChange={update('nombre')}
          className={CAMPO}
          placeholder="Tu nombre"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={ETIQUETA} htmlFor="empresa">
            Empresa
          </label>
          <input
            id="empresa"
            type="text"
            value={form.empresa}
            onChange={update('empresa')}
            className={CAMPO}
            placeholder="Nombre de tu empresa"
          />
        </div>
        <div>
          <label className={ETIQUETA} htmlFor="rubro">
            Rubro
          </label>
          <select
            id="rubro"
            value={form.rubro}
            onChange={update('rubro')}
            className={`${CAMPO} cursor-pointer`}
          >
            <option>Banquetería</option>
            <option>Religiosas</option>
            <option>Funerarias</option>
            <option>Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label className={ETIQUETA} htmlFor="telefono">
          Teléfono
        </label>
        <input
          id="telefono"
          type="tel"
          value={form.telefono}
          onChange={update('telefono')}
          className={CAMPO}
          placeholder="+56 9 ..."
        />
      </div>

      <div>
        <label className={ETIQUETA} htmlFor="mensaje">
          Mensaje / cantidad estimada
        </label>
        <textarea
          id="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={update('mensaje')}
          className={`${CAMPO} resize-none`}
          placeholder="Cuéntanos qué formatos y cantidades necesitas"
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Enviar solicitud
      </button>
    </form>
  );
}
