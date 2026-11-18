import { ldJson } from '../lib/seo';

// Incrusta datos estructurados (JSON-LD) en la página. Invisible para el usuario.
export default function JsonLd({ data }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(data) }} />
  );
}
