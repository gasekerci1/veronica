import { useState } from 'react';
import { ArrowLeftRight, ArrowUpRight, Columns2 } from 'lucide-react';
import {
  BEFORE_AFTER_GALLERY,
  type ServiceCategory,
} from '../data/pricingData';
import { ResilientImage } from './ResilientImage';

interface BeforeAfterGalleryProps {
  onSelectServiceForQuote: (serviceName: string, category: ServiceCategory) => void;
}

export function BeforeAfterGallery({ onSelectServiceForQuote }: BeforeAfterGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [splitPercent, setSplitPercent] = useState(52);

  const currentJob = BEFORE_AFTER_GALLERY[selectedIdx];

  return (
    <section id="results" className="py-14 sm:py-20 border-b border-[#23262A]/10 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-sm font-medium text-[#4F6F4A] mb-2">
              Real Yard Transformations · Before &amp; After
            </p>
            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#23262A]"
              style={{ textWrap: 'balance' }}
            >
              Before &amp; after photos sent on every job
            </h2>
            <p className="text-sm text-[#4E534B] mt-2 max-w-2xl">
              Compare six typical Chester Hill &amp; Canterbury-Bankstown transformations — drag the
              slider to compare or switch to side-by-side view.
            </p>
          </div>

          <div
            role="group"
            aria-label="Before and after comparison view mode"
            className="inline-flex rounded-lg border border-[#23262A]/15 bg-[#F7F5F0] p-1 self-start lg:self-auto"
          >
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'slider'
                  ? 'bg-[#23262A] text-white'
                  : 'text-[#4E534B] hover:text-[#23262A]'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
              Interactive Slider
            </button>
            <button
              type="button"
              onClick={() => setViewMode('side-by-side')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'side-by-side'
                  ? 'bg-[#23262A] text-white'
                  : 'text-[#4E534B] hover:text-[#23262A]'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" aria-hidden="true" />
              Side-by-Side
            </button>
          </div>
        </div>

        {/* Comparison Stage */}
        <div className="rounded-xl border border-[#23262A]/10 bg-[#F7F5F0] overflow-hidden">
          {viewMode === 'slider' ? (
            <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[560px] w-full bg-[#EEEBE3] select-none overflow-hidden">
              {/* After layer (full width base) */}
              <ResilientImage
                src={currentJob.afterSrc}
                alt={currentJob.afterAlt}
                fallbackLabel={`${currentJob.title} — After`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before layer (clipped from left to splitPercent) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
              >
                <ResilientImage
                  src={currentJob.beforeSrc}
                  alt={currentJob.beforeAlt}
                  fallbackLabel={`${currentJob.title} — Before`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Divider Line & Handle */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.45)] pointer-events-none"
                style={{ left: `${splitPercent}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#23262A] text-white border-2 border-white flex items-center justify-center shadow-md">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Corner labels */}
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#23262A]/90 text-white text-xs font-mono pointer-events-none">
                Before
              </div>
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#4F6F4A]/95 text-white text-xs font-mono pointer-events-none">
                After
              </div>

              {/* Accessible Range Input Overlay */}
              <input
                type="range"
                min={5}
                max={95}
                value={splitPercent}
                onChange={(e) => setSplitPercent(Number(e.target.value))}
                aria-label={`Compare before and after for ${currentJob.title}`}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#23262A]/10">
              <div className="relative aspect-[4/3] bg-[#EEEBE3]">
                <ResilientImage
                  src={currentJob.beforeSrc}
                  alt={currentJob.beforeAlt}
                  fallbackLabel={`${currentJob.title} — Before`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#23262A]/90 text-white text-xs font-mono">
                  Before
                </div>
              </div>
              <div className="relative aspect-[4/3] bg-[#EEEBE3]">
                <ResilientImage
                  src={currentJob.afterSrc}
                  alt={currentJob.afterAlt}
                  fallbackLabel={`${currentJob.title} — After`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#4F6F4A]/95 text-white text-xs font-mono">
                  After
                </div>
              </div>
            </div>
          )}

          {/* Selected Job Details Bar */}
          <div className="p-5 sm:p-6 bg-white border-t border-[#23262A]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <p className="text-xs font-mono text-[#4F6F4A]">{currentJob.categoryLabel}</p>
              <h3 className="text-lg sm:text-xl font-semibold text-[#23262A]">
                {currentJob.indexLabel}. {currentJob.title}
              </h3>
              <p className="text-sm text-[#4E534B]">{currentJob.summary}</p>
            </div>

            <button
              type="button"
              onClick={() =>
                onSelectServiceForQuote(currentJob.serviceName, currentJob.calculatorCategory)
              }
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#4F6F4A] rounded-lg hover:bg-[#3E5A3A] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-center"
            >
              Quote a similar job
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 6-Job Selector Strip */}
        <div
          role="tablist"
          aria-label="Select before and after transformation"
          className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5"
        >
          {BEFORE_AFTER_GALLERY.map((job, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={job.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedIdx(idx)}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#23262A] text-white border-[#23262A]'
                    : 'bg-[#F7F5F0] text-[#23262A] border-[#23262A]/10 hover:border-[#23262A]/30'
                }`}
              >
                <div className="aspect-[4/3] w-full rounded overflow-hidden bg-[#EEEBE3] mb-2">
                  <ResilientImage
                    src={job.afterSrc}
                    alt=""
                    fallbackLabel={job.indexLabel}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`block text-[11px] font-mono tabular-nums ${
                    isSelected ? 'text-[#C9D6BC]' : 'text-[#5C6158]'
                  }`}
                >
                  {job.indexLabel}.
                </span>
                <span className="block text-xs font-medium leading-snug line-clamp-2">
                  {job.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
