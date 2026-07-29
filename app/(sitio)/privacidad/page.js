import { EMPRESA } from '../../../lib/categorias';
import { buildMeta } from '../../../lib/seo';

export const metadata = buildMeta({
  title: 'Política de privacidad y cookies',
  description:
    'Cómo Velas Devas recopila, usa y protege tus datos personales, y el uso de cookies en el sitio.',
  path: '/privacidad',
});

export default function PrivacidadPage() {
  return (
    <section className="bg-bg-base">
      <div className="max-w-3xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-20">
        <p className="type-eyebrow eyebrow-rule">Legal</p>
        <h1 className="font-display text-[clamp(30px,5vw,48px)] text-text-primary leading-[1.1] mt-4">
          Política de privacidad y cookies
        </h1>
        <p className="type-label mt-4">Última actualización: julio de 2026</p>

        <div className="mt-10 space-y-9">
          <Bloque titulo="1. Responsable">
            El responsable del tratamiento de los datos es <strong>{EMPRESA.nombre}</strong>,
            con domicilio en {EMPRESA.direccion}. Para cualquier consulta sobre esta
            política puedes escribirnos a{' '}
            <Correo>{EMPRESA.email}</Correo>.
          </Bloque>

          <Bloque titulo="2. Qué datos recopilamos">
            Recopilamos únicamente los datos que nos entregas de forma voluntaria a
            través del sitio:
            <ul className="mt-3 space-y-1.5 list-disc pl-5">
              <li>
                <strong>Formulario de contacto y cotización:</strong> nombre, empresa,
                correo electrónico, teléfono y el mensaje o requerimiento que nos envíes.
              </li>
              <li>
                <strong>Descarga de catálogo en PDF:</strong> nombre de la empresa, RUT y
                correo electrónico.
              </li>
              <li>
                <strong>Datos de navegación:</strong> información técnica anónima (tipo de
                dispositivo, páginas visitadas) mediante cookies, según se detalla más abajo.
              </li>
            </ul>
          </Bloque>

          <Bloque titulo="3. Para qué usamos tus datos">
            Utilizamos tus datos exclusivamente para:
            <ul className="mt-3 space-y-1.5 list-disc pl-5">
              <li>Responder tus consultas y preparar cotizaciones.</li>
              <li>Enviarte el catálogo de productos y precios solicitado.</li>
              <li>Dar seguimiento comercial a tu requerimiento.</li>
              <li>Mejorar el funcionamiento y la experiencia del sitio.</li>
            </ul>
            No vendemos ni cedemos tus datos a terceros con fines publicitarios.
          </Bloque>

          <Bloque titulo="4. Cookies">
            Este sitio utiliza cookies propias y de terceros para su correcto
            funcionamiento y para obtener estadísticas de uso de forma anónima. Las
            cookies son pequeños archivos que se almacenan en tu navegador. Puedes
            configurar o eliminar las cookies desde los ajustes de tu navegador en
            cualquier momento; ten en cuenta que desactivarlas puede afectar algunas
            funciones del sitio.
          </Bloque>

          <Bloque titulo="5. Conservación y seguridad">
            Conservamos tus datos solo durante el tiempo necesario para las finalidades
            descritas y aplicamos medidas razonables para protegerlos frente a accesos no
            autorizados, pérdida o alteración.
          </Bloque>

          <Bloque titulo="6. Tus derechos">
            De acuerdo con la Ley N° 19.628 sobre Protección de la Vida Privada, puedes
            solicitar en cualquier momento el acceso, la rectificación, la cancelación o
            la oposición al tratamiento de tus datos personales escribiéndonos a{' '}
            <Correo>{EMPRESA.email}</Correo>.
          </Bloque>

          <Bloque titulo="7. Cambios en esta política">
            Podemos actualizar esta política para reflejar cambios legales o de
            funcionamiento del sitio. Publicaremos siempre la versión vigente en esta
            misma página.
          </Bloque>
        </div>

        <p className="type-label mt-12 border-t border-border-default pt-6">
          Este documento es un texto base y puede requerir revisión legal según los datos
          formales de la empresa.
        </p>
      </div>
    </section>
  );
}

function Bloque({ titulo, children }) {
  return (
    <div>
      <h2 className="font-display text-[clamp(19px,2.6vw,24px)] text-text-primary leading-tight">
        {titulo}
      </h2>
      <div className="type-body text-[15px] leading-[1.85] mt-3">{children}</div>
    </div>
  );
}

function Correo({ children }) {
  return (
    <a
      href={`mailto:${children}`}
      className="text-text-primary font-medium underline underline-offset-2 hover:text-accent-mid transition-colors"
    >
      {children}
    </a>
  );
}
