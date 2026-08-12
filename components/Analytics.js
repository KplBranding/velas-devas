'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_ID, analyticsHabilitado } from '../lib/analytics';

// Monta GA4 SOLO en el dominio de producción (velasdevas.cl). En local y en las
// previews de Vercel no se carga → los datos quedan limpios.
export default function Analytics() {
  const [habilitado, setHabilitado] = useState(false);
  useEffect(() => setHabilitado(analyticsHabilitado()), []);
  if (!GA_ID || !habilitado) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
