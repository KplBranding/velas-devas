'use client';

import { usePathname } from 'next/navigation';
import CustomCursor from './CustomCursor';
import WhatsAppFAB from './WhatsAppFAB';
import AvisoCookies from './AvisoCookies';

// Chrome del sitio público (cursor personalizado + FAB de WhatsApp + aviso de cookies). Se oculta en
// el panel interno /admin, que debe verse como una herramienta, no como el sitio.
export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return (
    <>
      <CustomCursor />
      <WhatsAppFAB />
      <AvisoCookies />
    </>
  );
}
