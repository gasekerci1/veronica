import { useEffect, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import {
  SERVICES_CATALOG,
  type ServiceCategory,
  type SiteConfig,
} from '../data/pricingData';
import { ResilientImage } from './ResilientImage';

interface ServicesCarouselProps {
  siteConfig: SiteConfig;
  onSelectServiceForQuote: (serviceName: string, category: ServiceCategory) => void;
}

interface CarouselSlide {
  id: string;
  indexLabel: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  title: string;
  metadata: string;
  priceBenchmark: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const SLIDES: CarouselSlide[] = [
  {
    id: 'lawn-mowing',
    indexLabel: '01',
    serviceName: 'Lawn mowing',
    serviceCategory: 'regular-fortnightly',
    title: '01. Regular Lawn Mowing & Edging',
    metadata: 'Fortnightly Growing Season · Monthly Winter · Chester Hill & Surrounds',
    priceBenchmark: 'From $75 / visit (< 100 m²)',
    description:
      'Regular mowing with edging, whipper-snipping and a full blow-down of paths and driveways. Fortnightly in the growing season, monthly in winter.',
    imageSrc: '/assets/aistudio/lawn-mowing-1x1_900763f8.jpg',
    imageAlt: 'Freshly mowed lawn beside clean concrete pathway with red lawn mower in Chester Hill',
  },
  {
    id: 'garden-maintenance',
    indexLabel: '02',
    serviceName: 'Garden maintenance',
    serviceCategory: 'regular-monthly',
    title: '02. Regular Garden Maintenance',
    metadata: 'Weeding · Pruning · Shaping · Soil & Mulch Top-Up',
    priceBenchmark: 'Plans from $125 (2-hr visit)',
    description:
      'Weeding, pruning, shaping, mulching and a general tidy so your garden stays looking its best between visits — with SMS reminders and before/after photos.',
    imageSrc: '/assets/aistudio/garden-maintenance-1x1_294687e1.jpg',
    imageAlt: 'Veronica Rolles hand-pruning native grevilleas in a mulched suburban garden bed',
  },
  {
    id: 'hedge-trimming',
    indexLabel: '03',
    serviceName: 'Hedge trimming',
    serviceCategory: 'softscaping',
    title: '03. Hedge Trimming & Shrub Shaping',
    metadata: 'Level Tops · Crisp Sides · All Clippings Removed',
    priceBenchmark: '$65 / hr + green waste',
    description:
      'Neat, even hedges and shrubs shaped cleanly to height, with all clippings raked, blown clear and removed.',
    imageSrc: '/assets/aistudio/hedge-trimming-1x1_5101f44f.jpg',
    imageAlt: 'Veronica Rolles trimming a suburban hedge to a crisp level line',
  },
  {
    id: 'garden-cleanups',
    indexLabel: '04',
    serviceName: 'Garden cleanup',
    serviceCategory: 'one-off-cleanup',
    title: '04. Overgrown Yard & Pre-Sale Cleanups',
    metadata: 'One-Off Reset · End-of-Lease · Pre-Sale Prep',
    priceBenchmark: 'From $260',
    description:
      "Overgrown yards, end-of-lease and pre-sale cleanups. We'll get it back under control in one visit and leave beds, lawns and paths clear.",
    imageSrc: '/assets/aistudio/garden-cleanup-1x1_6bc5f0d5.jpg',
    imageAlt: 'Veronica clearing overgrown weeds and branches into a wheelbarrow during a yard cleanup',
  },
  {
    id: 'pressure-cleaning',
    indexLabel: '05',
    serviceName: 'Pressure cleaning',
    serviceCategory: 'hardscaping',
    title: '05. Pressure Cleaning & Path Restoration',
    metadata: 'Driveways · Paths · Patios · Pavers · Fences',
    priceBenchmark: 'From $140 (2-hr min)',
    description:
      'Driveways, paths, patios, pavers and fences brought back to like-new. Uses our own pressure cleaner (just needs access to your outdoor tap); driveways quoted per job.',
    imageSrc: '/assets/aistudio/pressure-cleaning-1x1_436031d8.jpg',
    imageAlt: 'Veronica high-pressure cleaning grime off a suburban concrete driveway',
  },
  {
    id: 'green-waste-removal',
    indexLabel: '06',
    serviceName: 'Green waste removal',
    serviceCategory: 'one-off-cleanup',
    title: '06. Green Waste Haulage (No Skip Bins)',
    metadata: 'Council Bin Used First · Extra Loads Hauled Away',
    priceBenchmark: '$140–$200 per load',
    description:
      "We fill your council green bin first and haul away any extra branches, prunings and clippings directly — no unsightly skip bins left on your driveway.",
    imageSrc: '/assets/aistudio/green-waste-removal-1x1_188fbcb5.jpg',
    imageAlt: 'Green garden waste neatly bagged and loaded for haulage without needing a skip bin',
  },
  {
    id: 'small-tree-removal',
    indexLabel: '07',
    title: '07. Small Tree & Large Shrub Removal',
    serviceName: 'Small tree removal',
    serviceCategory: 'one-off-cleanup',
    metadata: 'Safe Ground-Level Felling · Council Approval Required',
    priceBenchmark: 'Quoted per job',
    description:
      'Safe ground-level removal of small trees and overgrown shrubs. Canterbury-Bankstown Council approval must be in place before work begins; larger trees referred to an arborist.',
    imageSrc: '/assets/aistudio/small-tree-removal-1x1_21cc1959.jpg',
    imageAlt: 'Safe ground-level removal and sectioning of small residential trees and shrubs',
  },
  {
    id: 'planting-mulching',
    indexLabel: '08',
    serviceName: 'Planting & mulching',
    serviceCategory: 'softscaping',
    title: '08. Planting, Turf Patches & Mulching',
    metadata: 'New Garden Beds · Seasonal Planting · Fresh Organic Mulch',
    priceBenchmark: '$65 / hr + materials',
    description:
      'New garden beds, seasonal native or ornamental planting, turf patch repairs and fresh mulch to refresh tired yards and protect soil moisture.',
    imageSrc: '/assets/aistudio/planting-and-mulching-1x1_059b3d24.jpg',
    imageAlt: 'Newly planted Australian native shrubs set in dark organic mulch along a timber edge',
  },
];

export function ServicesCarousel({
  siteConfig,
  onSelectServiceForQuote,
}: ServicesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPausedByHover, setIsPausedByHover] = useState(false);

  const currentSlide = SLIDES[activeIndex];

  const visibleServices = SERVICES_CATALOG.filter(
    (item) => !item.requiresEpaLicence || siteConfig.epaLicenceActive
  );

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isAutoPlaying || isPausedByHover || prefersReduced) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isPausedByHover]);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowLeft') {
      goPrev();
    } else if (e.key === 'ArrowRight') {
      goNext();
    }
  };

  return (
    <section
      id="services"
      onKeyDown={handleKeyDown}
      className="py-14 sm:py-20 border-b border-[#23262A]/10"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Carousel Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-sm font-medium text-[#4F6F4A] mb-2">Services &amp; Showcase</p>
            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#23262A]"
              style={{ textWrap: 'balance' }}
            >
              One call covers lawns, gardens, hedges, cleanups &amp; pressure cleaning
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={isAutoPlaying ? 'Pause carousel auto-advance' : 'Play carousel auto-advance'}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#23262A]/15 bg-white text-[#23262A] hover:bg-[#EEEBE3] transition-colors cursor-pointer"
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Play className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous service photo"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#23262A]/15 bg-white text-[#23262A] hover:bg-[#EEEBE3] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            <span className="px-2 text-xs font-mono tabular-nums text-[#4E534B] whitespace-nowrap">
              {activeIndex + 1} / {SLIDES.length}
            </span>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next service photo"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#23262A]/15 bg-white text-[#23262A] hover:bg-[#EEEBE3] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Main Carousel Frame */}
        <div
          onMouseEnter={() => setIsPausedByHover(true)}
          onMouseLeave={() => setIsPausedByHover(false)}
          className="bg-white rounded-xl border border-[#23262A]/10 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 relative aspect-square lg:aspect-[5/4] bg-[#EEEBE3]">
              <ResilientImage
                src={currentSlide.imageSrc}
                alt={currentSlide.imageAlt}
                fallbackLabel={currentSlide.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 flex items-end justify-between gap-4">
                <span className="text-xs font-mono text-white/90 tabular-nums">
                  {currentSlide.indexLabel} · Service Photo
                </span>
                <span className="text-xs font-mono text-white font-medium tabular-nums">
                  {currentSlide.priceBenchmark}
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs text-[#5C6158] mb-2">{currentSlide.metadata}</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#23262A] leading-tight mb-4">
                  {currentSlide.title}
                </h3>
                <p className="text-sm sm:text-base text-[#4E534B] leading-relaxed">
                  {currentSlide.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#23262A]/10">
                <div>
                  <span className="block text-xs text-[#5C6158]">Guide Rate</span>
                  <span className="text-base font-semibold font-mono tabular-nums text-[#23262A]">
                    {currentSlide.priceBenchmark}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForQuote(currentSlide.serviceName, currentSlide.serviceCategory)
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#4F6F4A] rounded-lg hover:bg-[#3E5A3A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request {currentSlide.serviceName} Quote
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Service Thumbnail Switcher Strip */}
        <div
          role="tablist"
          aria-label="Select service slide"
          className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5"
        >
          {SLIDES.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(idx)}
                className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#23262A] text-white border-[#23262A]'
                    : 'bg-white text-[#23262A] border-[#23262A]/10 hover:border-[#23262A]/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-[#EEEBE3]">
                    <ResilientImage
                      src={slide.imageSrc}
                      alt=""
                      fallbackLabel={slide.indexLabel}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`block text-[11px] font-mono tabular-nums ${
                        isActive ? 'text-[#C9D6BC]' : 'text-[#5C6158]'
                      }`}
                    >
                      {slide.indexLabel}
                    </span>
                    <span className="block text-xs font-medium truncate">
                      {slide.serviceName}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Full Service Directory Grid */}
        <div className="mt-12 pt-10 border-t border-[#23262A]/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#23262A]">
                All Services &amp; Transparent Rates
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6158] mt-1">
                Click any service to pre-select it in your quote request or estimator.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleServices.map((service, idx) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#23262A]/10 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square w-full bg-[#EEEBE3] border-b border-[#23262A]/10 overflow-hidden">
                    <ResilientImage
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fallbackLabel={service.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-mono text-[#4F6F4A] mb-1">
                      {String(idx + 1).padStart(2, '0')}.
                    </p>
                    <h4 className="text-base font-semibold text-[#23262A] mb-1.5">
                      {service.name}
                    </h4>
                    <p className="text-xs font-mono tabular-nums font-medium text-[#4F6F4A] mb-2.5">
                      {service.priceLabel}
                    </p>
                    <p className="text-xs text-[#4E534B] leading-relaxed">{service.description}</p>
                    {service.note && (
                      <p className="text-[11px] text-[#5C6158] mt-2 pt-2 border-t border-[#23262A]/10">
                        {service.note}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForQuote(
                        service.name === 'Garden cleanups' ? 'Garden cleanup' : service.name,
                        service.calculatorCategory
                      )
                    }
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#4F6F4A] hover:text-[#23262A] transition-colors self-start cursor-pointer"
                  >
                    Quote {service.name.toLowerCase()}
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
