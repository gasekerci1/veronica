import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { FAQS, POLICIES, type SiteConfig } from '../data/pricingData';

interface FaqsReviewsPoliciesProps {
  siteConfig: SiteConfig;
}

export function FaqsReviewsPolicies({ siteConfig }: FaqsReviewsPoliciesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-14 sm:py-20 border-b border-[#23262A]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-16">
        {/* FAQs + Short Policies Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#4F6F4A] mb-2">Common Questions</p>
            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#23262A] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Frequently asked questions
            </h2>

            <div className="bg-white rounded-xl border border-[#23262A]/10 divide-y divide-[#23262A]/10">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={faq.q}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F7F5F0]/60 transition-colors cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-medium text-[#23262A]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#4E534B] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-[#4E534B] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Customer Reviews (Real Only) + Short Policies */}
          <div className="lg:col-span-5 space-y-6">
            {/* Section 11: Reviews (Real Google Reviews Only — No Placeholders) */}
            <div className="bg-white rounded-xl border border-[#23262A]/10 p-6 space-y-3">
              <p className="text-xs font-medium text-[#4F6F4A]">Verified Feedback</p>
              <h3 className="text-xl font-semibold text-[#23262A]">What our customers say</h3>
              <p className="text-sm text-[#4E534B] leading-relaxed">
                We only publish real Google Business Profile reviews from local clients. Verified
                customer reviews will appear here once 3 or more Google reviews are live.
              </p>
              {siteConfig.gbpUrl ? (
                <a
                  href={siteConfig.gbpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4F6F4A] hover:underline pt-1"
                >
                  View our Google Business Profile
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : (
                <p className="text-xs text-[#5C6158] pt-1">
                  Google Business Profile link can be added anytime in Business Settings.
                </p>
              )}
            </div>

            {/* Section 14: Short Policies */}
            <div className="bg-white rounded-xl border border-[#23262A]/10 p-6">
              <h3 className="text-lg font-semibold text-[#23262A] mb-4">Service Policies</h3>
              <dl className="divide-y divide-[#23262A]/10 text-sm">
                {POLICIES.map((pol) => (
                  <div key={pol.label} className="py-3 first:pt-0 last:pb-0">
                    <dt className="font-medium text-[#23262A] text-xs">{pol.label}</dt>
                    <dd className="text-xs text-[#4E534B] mt-0.5 leading-relaxed">{pol.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
