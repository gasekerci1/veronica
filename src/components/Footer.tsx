import { useState } from 'react';
import { ExternalLink, SlidersHorizontal, X } from 'lucide-react';
import { validateAustralianABN, type SiteConfig } from '../data/pricingData';
import { LeafLogo, Wordmark } from './LeafLogo';
import { IS_OWNER_MODE } from '../data/ownerMode';
interface FooterProps {
  siteConfig: SiteConfig;
  onOpenSettings: () => void;
}

export function Footer({ siteConfig, onOpenSettings }: FooterProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const abnStatus = validateAustralianABN(siteConfig.abn);
  const displayAbn = abnStatus.isValid ? abnStatus.formatted : siteConfig.abn;
  const abrLink =
    abnStatus.cleaned.length === 11
      ? `https://abr.business.gov.au/ABN/View?abn=${abnStatus.cleaned}`
      : 'https://abr.business.gov.au/Search/Run';

  return (
    <footer className="bg-[#23262A] text-[#DAD6CB] py-12 no-print">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-2.5 max-w-lg">
            <div className="inline-flex items-center gap-2 text-lg font-semibold text-white tracking-tight">
              <LeafLogo onDark className="w-6 h-6 shrink-0" />
              <Wordmark onDark className="text-xl" />
            </div>
            <p className="text-sm text-[#C9C5B9]">
              Chester Hill NSW 2162
              {siteConfig.phone ? ` · ${siteConfig.phone}` : ''}
              {siteConfig.email ? ` · ${siteConfig.email}` : ''}
            </p>
            <p className="text-xs font-mono text-[#C9C5B9] tabular-nums">
              ABN {displayAbn}
              {siteConfig.insuranceActive ? ' · Fully insured ($20M public liability)' : ''}
            </p>
            <p className="text-xs text-[#ADA99D]">
              Servicing Chester Hill, Bankstown, Fairfield and surrounds
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              <a
                href={abrLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white hover:underline"
              >
                ABR Lookup
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              {siteConfig.facebookUrl && (
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DAD6CB] hover:text-white hover:underline"
                >
                  Facebook
                </a>
              )}
              {siteConfig.instagramUrl && (
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DAD6CB] hover:text-white hover:underline"
                >
                  Instagram
                </a>
              )}
              {IS_OWNER_MODE && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="inline-flex items-center gap-1 text-[#C9D6BC] hover:text-white cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3" aria-hidden="true" />
                Business Details Setup
              </button>
              )}
            </div>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#plans" className="hover:text-white transition-colors">
              Plans
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              Meet Veronica
            </a>
            <a href="#service-area" className="hover:text-white transition-colors">
              Service Area
            </a>
            <a href="#faqs" className="hover:text-white transition-colors">
              FAQs
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Get a free quote
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#ADA99D]">
          <span>© 2026 Lawn & Order · Veronica Rolles</span>
          <button
            type="button"
            onClick={() => setPrivacyOpen(true)}
            className="text-left sm:text-right hover:text-white underline underline-offset-4 cursor-pointer"
          >
            Privacy Policy
          </button>
        </div>
      </div>

      {privacyOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 text-[#23262A]"
        >
          <div className="bg-white rounded-xl border border-[#23262A]/15 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 id="privacy-modal-title" className="text-lg font-semibold">
                Privacy Policy — Lawn & Order
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                aria-label="Close privacy policy"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#EEEBE3] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-[#4E534B] leading-relaxed">
              Contact details (name, phone number, email address, suburb, and job photos) are only
              used to quote, book, and invoice your gardening or lawn maintenance job. They are
              never sold or shared with third parties.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4F6F4A] rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
