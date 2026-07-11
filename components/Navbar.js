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
    <header className="sticky top-0 z-50 bg-bg-base">
      {/* Fila superior: logo + acciones */}
      <div className="h-[52px] px-5 md:px-8 flex items-center justify-between border-b border-border-default">
        <Link href="/" className="flex items-center" aria-label="Velas Devas — inicio">
          <Image
            src="/logo-horizontal.png"
            alt="Velas Devas"
            width={140}
            height={48}
            priority
            className="h-7 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/contacto"
            className="hidden sm:inline-block font-sans text-nav text-text-primary hover:text-gold transition-colors"
          >
            Cotizar
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="md:hidden flex flex-col gap-[5px] p-1"
          >
            <span className="block w-5 h-px bg-text-primary" />
            <span className="block w-5 h-px bg-text-primary" />
            <span className="block w-5 h-px bg-text-primary" />
          </button>
        </div>
      </div>

      {/* Submenú (desktop) */}
      <nav className="hidden md:flex h-[42px] px-5 md:px-8 items-center gap-7 border-b border-border-default">
        {SUB_LINKS.map((link) => {
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-nav pb-[2px] transition-colors ${
                active
                  ? 'text-text-primary border-b-active border-text-primary'
                  : 'text-text-footer hover:text-text-primary'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Submenú (mobile desplegable) */}
      {open && (
        <nav className="md:hidden flex flex-col px-5 py-3 border-b border-border-default">
          {SUB_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-sans text-nav py-2 ${
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
