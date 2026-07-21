'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const SUB_LINKS = [
  { href: '/', label: 'Inicio', exact: true },
  { href: '/banqueteria', label: 'Banquetería', group: 'catalogo' },
  { href: '/religiosas', label: 'Religiosas', group: 'catalogo' },
  { href: '/funerarias', label: 'Funerarias', group: 'catalogo' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (link) =>
    link.exact ? pathname === link.href : pathname.startsWith(link.href);

  return (
    <header className="sticky top-0 z-50 chrome-glass border-b border-border-default">
      {/* Fila única: logo grande + menú + CTA */}
      <div className="h-[112px] px-5 md:px-8 flex items-center justify-between gap-6">
        {/* Logo grande */}
        <Link
          href="/"
          className="flex items-center press shrink-0"
          aria-label="Velas Devas — inicio"
        >
          <Image
            src="/logos/devas-verde.png"
            alt="Velas Devas — expertos en velas"
            width={996}
            height={627}
            priority
            className="h-20 lg:h-24 w-auto object-contain"
          />
        </Link>

        {/* Menú en la misma línea (desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {SUB_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[13px] pb-[3px] transition-colors ${
                  active
                    ? 'text-text-primary border-b-active border-gold'
                    : 'text-text-body hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contacto"
            className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[#F5F5EE] bg-graphite hover:bg-[#1F261F] px-4 py-2.5 rounded-[3px] press transition-colors"
          >
            Cotizar
          </Link>
        </nav>

        {/* Hamburguesa (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className="md:hidden flex flex-col gap-[5px] p-1 press shrink-0"
        >
          <span
            className={`block w-6 h-px bg-text-primary transition-transform duration-300 ${
              open ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-text-primary transition-opacity duration-200 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-text-primary transition-transform duration-300 ${
              open ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Menú desplegable (mobile) */}
      {open && (
        <nav className="md:hidden flex flex-col px-5 py-2 border-t border-border-default chrome-glass">
          {SUB_LINKS.map((link, i) => {
            const active = isActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 35}ms` }}
                className={`stagger font-sans text-[15px] py-3 border-b border-border-default/60 last:border-0 ${
                  active ? 'text-gold' : 'text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
