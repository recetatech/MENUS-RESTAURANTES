import React, { useEffect, useRef } from 'react';
import { RestaurantData } from '../types';

interface DigitalMenuPreviewProps {
  data: RestaurantData;
  activeCategory?: string;
  onCategorySelect?: (catSlug: string) => void;
}

export function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-');
}

export const DigitalMenuPreview: React.FC<DigitalMenuPreviewProps> = ({ data }) => {
  const navContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = (e: React.MouseEvent<HTMLAnchorElement>, categoryName: string) => {
    e.preventDefault();
    const id = slug(categoryName);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -64;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const cleanWhatsappNumber = (data.whatsappNumero || '').replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    data.whatsappMensaje || 'Hola, quiero hacer un pedido del menú'
  )}`;

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300 pb-28"
      style={{
        backgroundColor: data.bgColor || '#FAF6F0',
        color: data.inkColor || '#2B241C',
        fontFamily: "'Public Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        .custom-serif {
          font-family: 'Fraunces', Georgia, serif;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Hero Section */}
      <div
        className="text-center relative px-5 pt-14 pb-10"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(20,15,8,0.58) 0%, rgba(20,15,8,0.92) 100%),
            linear-gradient(180deg, ${data.inkColor || '#2B241C'} 0%, #1c170f 100%),
            url('portada.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#F5EFE4',
        }}
      >
        <div className="max-w-[640px] mx-auto">
          {data.ciudadBarrio && (
            <div
              className="text-[13px] tracking-wider uppercase mb-2 font-medium"
              style={{ color: '#C9BBA1' }}
            >
              {data.ciudadBarrio}
            </div>
          )}
          <h1 className="custom-serif text-3xl sm:text-5xl font-semibold leading-tight tracking-tight text-[#F9F6F0]">
            {data.nombreRestaurante || 'Nombre del Restaurante'}
          </h1>
          {data.fraseCorta && (
            <p
              className="mt-3 text-[15px] leading-relaxed mx-auto max-w-[42ch]"
              style={{ color: '#D8CBB4' }}
            >
              {data.fraseCorta}
            </p>
          )}
        </div>
      </div>

      {/* Sticky Category Navigation */}
      <nav
        className="sticky top-0 z-20 overflow-x-auto hide-scrollbar border-b backdrop-blur-sm"
        style={{
          backgroundColor: data.bgColor || '#FAF6F0',
          borderColor: '#E4DACB',
        }}
      >
        <div
          ref={navContainerRef}
          className="inline-flex gap-1.5 py-3 px-4 max-w-[640px] mx-auto w-full min-w-max justify-start md:justify-center"
        >
          {data.menu.map((cat, idx) => {
            const id = slug(cat.categoria);
            return (
              <a
                key={idx}
                href={`#${id}`}
                onClick={(e) => scrollToCategory(e, cat.categoria)}
                className="text-[13px] font-semibold px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap border"
                style={{
                  color: '#7A6F5E',
                  borderColor: '#E4DACB',
                  backgroundColor: 'rgba(255,255,255,0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = data.inkColor || '#2B241C';
                  e.currentTarget.style.borderColor = data.inkColor || '#2B241C';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#7A6F5E';
                  e.currentTarget.style.borderColor = '#E4DACB';
                }}
              >
                {cat.categoria}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Menu Sections Container */}
      <main className="max-w-[640px] mx-auto px-5">
        {data.menu.map((cat, catIdx) => {
          const id = slug(cat.categoria);
          return (
            <section
              key={catIdx}
              id={id}
              className="pt-9 pb-2 scroll-mt-16"
            >
              <h2 className="custom-serif text-[22px] font-semibold mb-1" style={{ color: data.inkColor || '#2B241C' }}>
                {cat.categoria}
              </h2>
              {cat.descripcion && (
                <div className="text-[14px] mb-5 leading-normal" style={{ color: '#7A6F5E' }}>
                  {cat.descripcion}
                </div>
              )}

              <div className="mt-1 divide-y" style={{ borderColor: '#E4DACB' }}>
                {cat.platos.map((plato, pIdx) => (
                  <div
                    key={pIdx}
                    className="py-3.5 flex gap-3 border-b last:border-b-0"
                    style={{ borderColor: '#E4DACB' }}
                  >
                    {plato.foto ? (
                      <img
                        className="w-14 h-14 rounded-[10px] object-cover shrink-0 bg-[#E4DACB]"
                        src={plato.foto}
                        alt={plato.nombre}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    ) : null}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-[16px] leading-snug">
                          {plato.nombre}
                        </span>
                        <span
                          className="flex-1 border-b border-dotted mb-1"
                          style={{ borderColor: '#E4DACB' }}
                        />
                        <span
                          className="font-semibold text-[15px] whitespace-nowrap shrink-0"
                          style={{ color: data.accentColor || '#B5482A' }}
                        >
                          {plato.precio}
                        </span>
                      </div>
                      {plato.desc && (
                        <div
                          className="text-[13.5px] mt-0.5 leading-relaxed max-w-[52ch]"
                          style={{ color: '#7A6F5E' }}
                        >
                          {plato.desc}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Footer / Info */}
        <footer
          className="mt-11 pt-7 pb-8 border-t"
          style={{ borderColor: '#E4DACB' }}
        >
          {data.horario && (
            <div className="flex gap-2.5 text-[14px] mb-2 leading-relaxed" style={{ color: '#7A6F5E' }}>
              <b className="min-w-[76px] font-semibold" style={{ color: data.inkColor || '#2B241C' }}>
                Horario
              </b>
              <span>{data.horario}</span>
            </div>
          )}
          {data.direccion && (
            <div className="flex gap-2.5 text-[14px] mb-2 leading-relaxed" style={{ color: '#7A6F5E' }}>
              <b className="min-w-[76px] font-semibold" style={{ color: data.inkColor || '#2B241C' }}>
                Dirección
              </b>
              <span>{data.direccion}</span>
            </div>
          )}
          {data.telefonoVisible && (
            <div className="flex gap-2.5 text-[14px] mb-2 leading-relaxed" style={{ color: '#7A6F5E' }}>
              <b className="min-w-[76px] font-semibold" style={{ color: data.inkColor || '#2B241C' }}>
                Teléfono
              </b>
              <span>{data.telefonoVisible}</span>
            </div>
          )}
        </footer>
      </main>

      {/* Floating WhatsApp Action Button */}
      <div
        className="fixed left-0 right-0 bottom-0 px-5 pt-3.5 pb-[calc(14px+env(safe-area-inset-bottom,0px))] z-30 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(250,246,240,0) 0%, ${data.bgColor || '#FAF6F0'} 40%)`,
        }}
      >
        <div className="max-w-[600px] mx-auto pointer-events-auto">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-white no-underline font-semibold text-[15px] py-3.5 px-5 rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{
              backgroundColor: data.accentColor || '#B5482A',
              boxShadow: '0 8px 20px -6px rgba(0,0,0,0.35)',
            }}
          >
            <svg
              className="w-5 h-5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.35-.5.05-1 .25-3.37-.7-2.85-1.14-4.7-4.04-4.84-4.22-.14-.18-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.31.37-.44.5-.14.14-.29.29-.13.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.42.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
            </svg>
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
