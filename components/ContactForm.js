'use client';

import { useRef, useState } from 'react';
import { EMPRESA } from '../lib/categorias';
import { track } from '../lib/analytics';

const MSG_VACIO = 'Cuéntanos qué es lo que quieres antes de enviar el correo.';

const CAMPO =
  'w-full bg-transparent border border-border-default rounded-[4px] px-3 py-2.5 font-sans text-[13px] font-light text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors';
const ETIQUETA = 'block type-label mb-1.5 text-text-body';

export default function ContactForm() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    email: '',
    rubro: 'Banquetería',
    telefono: '',
    mensaje: '',
  });
  const mensajeRef = useRef(null);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // Envío confiable al backend: guarda el lead (panel /admin) y —si el correo
  // está configurado— notifica al equipo. Ya NO depende del cliente de correo
  // del visitante (el mailto anterior fallaba si no tenía app de correo).
  const handleSubmit = async (e) => {
    e.preventDefault();
    // El mensaje es obligatorio: no permitir enviar en blanco (ni solo espacios).
    if (!form.mensaje.trim()) {
      const el = mensajeRef.current;
      if (el) {
        el.setCustomValidity(MSG_VACIO);
        el.reportValidity();
      }
      return;
    }
    setEnviando(true);
    setError(false);
    track('enviar_formulario', { rubro: form.rubro });
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error();
      setEnviado(true);
    } catch {
      setError(true);
    }
    setEnviando(false);
  };

  if (enviado) {
    return (
      <div className="border border-border-default rounded-[4px] p-8">
        <p className="type-eyebrow">Solicitud lista</p>
        <h3 className="type-section text-[28px] mt-2 mb-3">Gracias por escribirnos</h3>
        <p className="type-body">
          Recibimos tu solicitud y te responderemos a la brevedad. Si prefieres,
          llámanos al{' '}
          <a href={`tel:${EMPRESA.telefonoLink}`} className="text-gold">
            {EMPRESA.telefono}
          </a>
          .
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

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={ETIQUETA} htmlFor="email">
            Correo
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update('email')}
            className={CAMPO}
            placeholder="tucorreo@empresa.cl"
          />
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
      </div>

      <div>
        <label className={ETIQUETA} htmlFor="mensaje">
          Mensaje / cantidad estimada
        </label>
        <textarea
          id="mensaje"
          ref={mensajeRef}
          required
          rows={4}
          value={form.mensaje}
          onChange={(e) => {
            update('mensaje')(e);
            e.currentTarget.setCustomValidity('');
          }}
          onInvalid={(e) => e.currentTarget.setCustomValidity(MSG_VACIO)}
          className={`${CAMPO} resize-none`}
          placeholder="Cuéntanos qué formatos y cantidades necesitas"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {enviando ? 'Enviando…' : 'Enviar solicitud'}
        </button>
        {error && (
          <p className="text-[12.5px] text-red-500">
            No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos a{' '}
            <a href="mailto:contacto@velasdevas.cl" className="underline">
              contacto@velasdevas.cl
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
