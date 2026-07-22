import Link from 'next/link';
import { EMPRESA } from '../lib/categorias';
import Flame from './Flame';

export default function Footer() {
  return (
    <footer className="relative bg-bg-footer text-text-footer grain overflow-hidden">
      {/* acento dorado superior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Marca */}
          <div data-reveal-up className="col-span-2 md:col-span-1">
            <p className="flex items-center gap-2.5 font-display text-[24px] text-[#F5F5EE] leading-none">
              <Flame size={16} className="translate-y-[1px]" />
              Velas Devas
            </p>
            <p className="font-sans text-[12px] font-light mt-4 leading-relaxed max-w-[220px]">
              {EMPRESA.tagline}
            </p>
          </div>

          {/* Catálogo */}
          <div data-reveal-up>
            <p className="type-eyebrow mb-4">Catálogo</p>
            <ul className="space-y-2">
              <li><FooterLink href="/banqueteria">Banquetería</FooterLink></li>
              <li><FooterLink href="/religiosas">Religiosas</FooterLink></li>
              <li><FooterLink href="/funerarias">Funerarias</FooterLink></li>
            </ul>
          </div>

          {/* Empresa */}
          <div data-reveal-up>
            <p className="type-eyebrow mb-4">Empresa</p>
            <ul className="space-y-2">
              <li><FooterLink href="/nosotros">Nosotros</FooterLink></li>
              <li><FooterLink href="/contacto">Contacto</FooterLink></li>
            </ul>
          </div>

          {/* Contacto */}
          <div data-reveal-up>
            <p className="type-eyebrow mb-4">Contacto</p>
            <ul className="space-y-2 font-sans text-[12px] font-light">
              <li>
                <a
                  href={`tel:${EMPRESA.telefonoLink}`}
                  className="hover:text-[#F5F5EE] transition-colors"
                >
                  {EMPRESA.telefono}
                </a>
              </li>
              <li className="leading-relaxed">{EMPRESA.direccion}</li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-12 pt-6 border-t border-border-dark flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-sans text-[11px] font-light">
            © 2026 Velas Devas · {EMPRESA.web}
          </p>
          <p className="font-sans text-[11px] font-light">
            Fabricación mayorista desde el año {EMPRESA.desde}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="font-sans text-[12px] font-light text-text-footer hover:text-[#F5F5EE] transition-colors"
    >
      {children}
    </Link>
  );
}
