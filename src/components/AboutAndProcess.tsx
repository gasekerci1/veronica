import { Phone } from 'lucide-react';
import type { SiteConfig } from '../data/pricingData';
import { ResilientImage } from './ResilientImage';

interface AboutAndProcessProps {
  siteConfig: SiteConfig;
}

const WHY_CHOOSE_US = [
  {
    index: '01.',
    title: 'Same gardener, every visit',
    body: 'No revolving crews — Veronica looks after your lawn and garden personally.',
  },
  {
    index: '02.',
    title: 'Local to Chester Hill (within 10 km)',
    body: 'Based right in Chester Hill NSW 2162 so we are never far away.',
  },
  {
    index: '03.',
    title: 'One call covers it all',
    body: 'Lawns, gardens, hedges, cleanups, pressure cleaning and small tree removal.',
  },
  {
    index: '04.',
    title: 'Clear pricing',
    body: 'Fixed prices for regular visits and clear written quotes for one-off jobs.',
  },
  {
    index: '05.',
    title: 'Reliable communication',
    body: 'SMS reminder the day before, and we let you know right away if rain moves your visit.',
  },
  {
    index: '06.',
    title: 'Before & after photos on every job',
    body: 'Visual confirmation sent after every visit so you can see the finish even when out.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01.',
    title: 'Get in touch',
    body: 'Fill in the quote form below, call or text. Photos of your garden always help.',
  },
  {
    step: '02.',
    title: 'Free quote',
    body: 'Receive your quote within 24 hours, with a quick site visit arranged for bigger jobs.',
  },
  {
    step: '03.',
    title: 'Book in',
    body: 'Pick a one-off job or a flexible fortnightly or monthly maintenance plan.',
  },
  {
    step: '04.',
    title: 'Relax',
    body: "We'll text you the day before and send before & after photos once finished.",
  },
];

export function AboutAndProcess({ siteConfig }: AboutAndProcessProps) {
  const cleanPhoneHref = siteConfig.phone.replace(/[^\d+]/g, '');

  return (
    <section id="about" className="py-14 sm:py-20 border-b border-[#141D17]/10 bg-[#ECEEE9]/45">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-16">
        {/* Meet Veronica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] max-h-[520px] w-full rounded-xl overflow-hidden border border-[#141D17]/10 bg-white">
              <ResilientImage
                src="/assets/aistudio/about-veronica-portrait-4x5_db07a5af.jpg"
                alt="Veronica Rolles holding garden shears in a sunlit Australian native garden"
                fallbackLabel="Veronica Rolles — The Avid Gardener"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-[#1F5132] mb-2">About The Avid Gardener</p>
              <h2
                className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#141D17] mb-5"
                style={{ textWrap: 'balance' }}
              >
                Meet Veronica
              </h2>
              <div className="space-y-4 text-base text-[#445248] leading-relaxed max-w-2xl">
                <p>
                  Hi, I&apos;m Veronica — the gardener behind The Avid Gardener. I&apos;ve spent the
                  last five years looking after gardens around Sydney, and I started this business
                  to give local homeowners something that&apos;s hard to find: a reliable gardener
                  who turns up when she says she will, does the job properly, and treats your garden
                  like it&apos;s her own.
                </p>
                <p>
                  When you book with me, you get me — not a different crew every week. I&apos;m
                  based in Chester Hill and work across the surrounding suburbs, so I&apos;m never
                  far away.
                </p>
              </div>
            </div>

            {/* Service Van Callout */}
            <div className="bg-white rounded-xl border border-[#141D17]/10 overflow-hidden grid grid-cols-1 sm:grid-cols-12 items-stretch">
              <div className="sm:col-span-5 aspect-[3/2] bg-[#ECEEE9]">
                <ResilientImage
                  src="/assets/aistudio/nissan-elgrand-van-3x2_ee626443.jpg"
                  alt="The Avid Gardener silver Nissan Elgrand service van loaded with gardening equipment on a Chester Hill street"
                  fallbackLabel="The Avid Gardener Service Van"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:col-span-7 p-4 sm:p-5 flex flex-col justify-between gap-3">
                <div>
                  <p className="text-xs font-mono text-[#1F5132]">
                    Fully Equipped · Chester Hill NSW 2162
                  </p>
                  <h3 className="text-base font-semibold text-[#141D17] mt-1">
                    Arriving on time with our own gear
                  </h3>
                  <p className="text-xs text-[#445248] leading-relaxed mt-1">
                    Commercial mowers, hedge trimmers, blowers, pressure cleaner and green waste
                    bags packed ready — we just need gate access and an outdoor tap for pressure
                    cleaning.
                  </p>
                </div>
                {siteConfig.phone && (
                  <a
                    href={`tel:${cleanPhoneHref}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#1F5132] hover:underline self-start"
                  >
                    <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                    Call or SMS {siteConfig.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="pt-12 border-t border-[#141D17]/10">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#141D17] mb-6">Why choose us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.index}
                className="bg-white rounded-xl border border-[#141D17]/10 p-5"
              >
                <p className="text-xs font-mono text-[#1F5132] mb-1.5">{item.index}</p>
                <h4 className="text-base font-semibold text-[#141D17] mb-1.5">{item.title}</h4>
                <p className="text-sm text-[#445248] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="pt-12 border-t border-[#141D17]/10">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#141D17] mb-6">How it works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-xl border border-[#141D17]/10 p-5"
              >
                <p className="text-xs font-mono text-[#1F5132] mb-2">{step.step}</p>
                <h4 className="text-base font-semibold text-[#141D17] mb-1.5">{step.title}</h4>
                <p className="text-sm text-[#445248] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
