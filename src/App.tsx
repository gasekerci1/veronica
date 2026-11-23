import { useEffect, useState } from 'react';
import { AboutAndProcess } from './components/AboutAndProcess';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { BookingSection } from './components/BookingSection';
import { FaqsReviewsPolicies } from './components/FaqsReviewsPolicies';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MaintenancePlans } from './components/MaintenancePlans';
import { Navbar } from './components/Navbar';
import { QuoteCalculator } from './components/QuoteCalculator';
import { ServiceAreaMap } from './components/ServiceAreaMap';
import { ServicesCarousel } from './components/ServicesCarousel';
import { SiteSettingsModal } from './components/SiteSettingsModal';
import {
  DEFAULT_SITE_CONFIG,
  type MaintenancePlan,
  type QuoteInput,
  type ServiceCategory,
  type SiteConfig,
} from './data/pricingData';

const SETTINGS_STORAGE_KEY = 'avid_gardener_site_config_v1';

export default function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SiteConfig>;
        return {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          phone: parsed.phone || DEFAULT_SITE_CONFIG.phone,
        };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  const [quoteInput, setQuoteInput] = useState<QuoteInput>({
    lengthM: 10,
    widthM: 40,
    service: 'regular-fortnightly',
    grassType: 'buffalo',
    growthCondition: 'maintained',
    accessTerrain: 'open-flat',
    wasteDisposal: 'council-bin',
    suburb: 'Chester Hill',
    includeHedgeTrim: false,
    includeGardenWeeding: false,
    includePressureWash: false,
    softscapeScope: 'turf-lay',
    hardscapeScope: 'stepping-pavers',
  });

  const [preselectedServiceName, setPreselectedServiceName] = useState('Lawn mowing');
  const [preselectedFrequency, setPreselectedFrequency] = useState<
    'One-off' | 'Fortnightly' | 'Monthly' | 'Not sure'
  >('Fortnightly');
  const [preselectedSize, setPreselectedSize] = useState<
    'Small (under 100 m²)' | 'Medium (100–250 m²)' | 'Large (250 m²+)' | 'Not sure'
  >('Medium (100–250 m²)');
  const [prefilledQuoteSummary, setPrefilledQuoteSummary] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(siteConfig));
    } catch {
      // ignore storage errors
    }
  }, [siteConfig]);

  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceName: string, category: ServiceCategory) => {
    setPreselectedServiceName(serviceName);
    setQuoteInput((prev) => ({ ...prev, service: category }));
    scrollToElement('contact');
  };

  const handleSelectPlan = (plan: MaintenancePlan) => {
    setPreselectedServiceName(plan.serviceTag);
    setPreselectedFrequency('Fortnightly');
    setPreselectedSize(plan.sizePreset);
    setPrefilledQuoteSummary(
      `Interested in ${plan.name} (${plan.price}) — ${plan.included}. Applying $20 off first visit launch offer (3-month plan).`
    );
    scrollToElement('contact');
  };

  const handleSelectSuburb = (suburb: string) => {
    setQuoteInput((prev) => ({ ...prev, suburb }));
  };

  const handleSendCalculatorToBooking = (summaryText: string) => {
    setPrefilledQuoteSummary(summaryText);
    scrollToElement('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#23262A]">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm no-print">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar onQuoteClick={() => scrollToElement('contact')} />

      <main className="flex-1">
        <HeroSection
          siteConfig={siteConfig}
          onOpenQuoteForm={() => scrollToElement('contact')}
        />
        <ServicesCarousel
          siteConfig={siteConfig}
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />
        <BeforeAfterGallery onSelectServiceForQuote={handleSelectServiceForQuote} />
        <MaintenancePlans onSelectPlan={handleSelectPlan} />
        <QuoteCalculator
          input={quoteInput}
          onChange={setQuoteInput}
          siteConfig={siteConfig}
          onAbnChange={(abn) => setSiteConfig((prev) => ({ ...prev, abn }))}
          onSendToBooking={handleSendCalculatorToBooking}
        />
        <AboutAndProcess siteConfig={siteConfig} />
        <ServiceAreaMap
          selectedSuburb={quoteInput.suburb}
          onSelectSuburb={handleSelectSuburb}
        />
        <FaqsReviewsPolicies siteConfig={siteConfig} />
        <BookingSection
          selectedSuburb={quoteInput.suburb}
          preselectedServiceName={preselectedServiceName}
          preselectedFrequency={preselectedFrequency}
          preselectedSize={preselectedSize}
          prefilledQuoteSummary={prefilledQuoteSummary}
          siteConfig={siteConfig}
        />
      </main>

      <Footer
        siteConfig={siteConfig}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <SiteSettingsModal
        isOpen={settingsOpen}
        config={siteConfig}
        onChange={setSiteConfig}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
