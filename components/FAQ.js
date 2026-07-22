'use client';

import { useState } from 'react';
import { FAQS } from '../lib/contenido';
import AnimatedText from './AnimatedText';

export default function FAQ() {
  const [abierta, setAbierta] = useState(0);

  return (
    <section className="border-t border-border-default bg-bg-base">
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <p className="type-eyebrow eyebrow-rule" data-reveal-up>Preguntas frecuentes</p>
        <AnimatedText
          as="h2"
          animation="maskReveal"
          className="type-section text-[clamp(24px,3.4vw,38px)] mt-3 mb-10"
        >
          Antes de cotizar
        </AnimatedText>

        <div className="border-t border-border-default">
          {FAQS.map((item, i) => {
            const open = abierta === i;
            return (
              <div key={i} data-reveal-up className="border-b border-border-default">
                <button
                  type="button"
                  onClick={() => setAbierta(open ? -1 : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="font-display text-[17px] md:text-[19px] text-text-primary leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border border-gold text-gold flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      open ? 'rotate-45' : ''
                    }`}
                    aria-hidden
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Contenido animado (grid-rows 0fr → 1fr) */}
                <div
                  className="grid transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="type-body text-[15px] leading-[1.85] pb-6 pr-10 max-w-2xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
