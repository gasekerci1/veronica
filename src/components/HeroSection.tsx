import { ArrowRight, Phone } from 'lucide-react';
import type { SiteConfig } from '../data/pricingData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  siteConfig: SiteConfig;
  onOpenQuoteForm: () => void;
}

export function HeroSection({ siteConfig, onOpenQuoteForm }: HeroSectionProps) {
  const cleanPhoneHref = siteConfig.phone.replace(/[^\d+]/g, '');

  const trustMarkers = [
    { label: "5 years' experience", detail: 'Hands-on Sydney garden & lawn care' },
    { label: 'Same gardener every visit', detail: 'Looked after personally by Veronica' },
    siteConfig.insuranceActive
      ? { label: '$20M public liability', detail: 'Active public liability insurance' }
      : { label: 'Local Chester Hill base', detail: 'Servicing suburbs within 10 km' },
    { label: 'Free quotes within 24 hours', detail: 'Clear fixed plans & written quotes' },
  ];

  return (
    <section id="top" className="pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#141D17]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Proposition Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#445248] mb-4">
                Chester Hill, NSW 2162 · Bankstown · Sefton · Bass Hill &amp; Nearby Suburbs
              </p>

              <h1
                className="font-semibold tracking-tight text-[#141D17] leading-[1.08] mb-5"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.6rem)',
                  textWrap: 'balance',
                }}
              >
                Local garden care you can count on
              </h1>

              <p className="text-base sm:text-lg text-[#445248] leading-relaxed max-w-xl mb-8">
                Lawn mowing, garden maintenance, hedging, cleanups and pressure cleaning across
                Chester Hill and surrounding suburbs — by the same friendly gardener, every visit.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenQuoteForm}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1F5132] rounded-lg hover:bg-[#173E26] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5132]"
              >
                Get a free quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              {siteConfig.phone ? (
                <a
                  href={`tel:${cleanPhoneHref}`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#141D17] bg-white border border-[#141D17]/15 rounded-lg hover:bg-[#ECEEE9] transition-colors whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4 text-[#1F5132]" aria-hidden="true" />
                  Call {siteConfig.phone}
                </a>
              ) : (
                <a
                  href="#calculator"
                  className="text-sm font-medium text-[#141D17] hover:text-[#1F5132] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                >
                  Estimate 400 m² NSW Price
                </a>
              )}
            </div>
          </div>

          {/* Right Dominant Visual Carrier */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] sm:min-h-[360px] rounded-xl overflow-hidden border border-[#141D17]/10 bg-[#ECEEE9]">
              <ResilientImage
                src="/assets/aistudio/hero-veronica-mowing-16x9_11c07705.jpg"
                alt="Veronica Rolles mowing a sunlit Chester Hill front lawn beside neat brick garden beds"
                fallbackLabel="The Avid Gardener — Chester Hill Garden & Lawn Care"
                className="w-full h-full lg:h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 sm:p-6">
                <p className="text-xs text-white/85 font-mono tabular-nums">
                  {siteConfig.hours} · ABN {siteConfig.abn}
                </p>
                <p className="text-sm sm:text-base font-medium text-white mt-1">
                  Owner-operated by Veronica Rolles · Chester Hill &amp; surrounds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Trust Strip below the hero split */}
        <div className="mt-10 pt-8 border-t border-[#141D17]/10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustMarkers.map((item) => (
            <div key={item.label}>
              <p className="text-base sm:text-lg font-semibold text-[#141D17]">{item.label}</p>
              <p className="text-xs text-[#445248] mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
