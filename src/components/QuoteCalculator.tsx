import { useState } from 'react';
import { Check, Copy, ExternalLink, Printer, Send } from 'lucide-react';
import {
  CORE_SERVICE_SUBURBS,
  SERVICE_LABELS,
  calculateNswQuote,
  validateAustralianABN,
  type AccessTerrain,
  type GrassType,
  type GrowthCondition,
  type QuoteAudienceMode,
  type QuoteInput,
  type QuoteResult,
  type ServiceCategory,
  type SiteConfig,
  type WasteDisposal,
} from '../data/pricingData';
import { LeafLogo } from './LeafLogo';
import { IS_OWNER_MODE } from '../data/ownerMode';

interface QuoteCalculatorProps {
  input: QuoteInput;
  onChange: (next: QuoteInput) => void;
  siteConfig: SiteConfig;
  onAbnChange: (next: string) => void;
  onSendToBooking: (summaryText: string) => void;
}

export function QuoteCalculator({
  input,
  onChange,
  siteConfig,
  onAbnChange,
  onSendToBooking,
}: QuoteCalculatorProps) {
  const [audienceMode, setAudienceMode] = useState<QuoteAudienceMode>('homeowner');
  const [copied, setCopied] = useState(false);

  const result: QuoteResult = calculateNswQuote(input);
  const abnStatus = validateAustralianABN(siteConfig.abn);

  const updateField = <K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) => {
    onChange({ ...input, [key]: value });
  };

  const isLawnService =
    input.service === 'regular-fortnightly' ||
    input.service === 'regular-monthly' ||
    input.service === 'one-off-cleanup';

  const buildSummaryText = () => {
    const abnLine = abnStatus.isValid
      ? `ABN: ${abnStatus.formatted}`
      : `ABN: ${siteConfig.abn}`;
    const items = result.lineItems
      .map((item) => `- ${item.label}: $${item.minAmount}–$${item.maxAmount}`)
      .join('\n');

    return [
      `THE AVID GARDENER — NSW QUOTE ESTIMATE`,
      `Owner/Operator: Veronica Rolles | ${abnLine}`,
      `Suburb: ${input.suburb}, NSW`,
      `Service: ${SERVICE_LABELS[input.service].title}`,
      `Property Area: ${result.areaSqm} m² (${input.lengthM} m × ${input.widthM} m)`,
      ``,
      `Estimated Price Range: $${result.minTotal} – $${result.maxTotal} AUD`,
      `Effective Area Rate: $${result.perSqmLow.toFixed(2)} – $${result.perSqmHigh.toFixed(2)} / m²`,
      `Est. On-Site Time: ${result.estMinutesMin} – ${result.estMinutesMax} mins`,
      ``,
      `Breakdown:`,
      items,
      ``,
      `Note: ${result.pricingNote}`,
    ].join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const abrViewUrl =
    abnStatus.cleaned.length === 11
      ? `https://abr.business.gov.au/ABN/View?abn=${abnStatus.cleaned}`
      : 'https://abr.business.gov.au/Search/Run';

  return (
    <section id="calculator" className="py-14 sm:py-20 border-b border-[#141D17]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 no-print">
          <div>
            <p className="text-sm font-medium text-[#1F5132] mb-2">Interactive NSW Estimator</p>
            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#141D17]"
              style={{ textWrap: 'balance' }}
            >
              Custom lawn size &amp; 400 m² NSW quote calculator
            </h2>
          </div>

          {IS_OWNER_MODE && (
          <div
            role="group"
            aria-label="Calculator Perspective"
            className="inline-flex items-center p-1 bg-[#ECEEE9] rounded-lg border border-[#141D17]/10 self-start lg:self-auto"
          >
            <button
              type="button"
              onClick={() => setAudienceMode('homeowner')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                audienceMode === 'homeowner'
                  ? 'bg-white text-[#141D17] shadow-xs'
                  : 'text-[#445248] hover:text-[#141D17]'
              }`}
            >
              Homeowner Check
            </button>
            <button
              type="button"
              onClick={() => setAudienceMode('contractor')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                audienceMode === 'contractor'
                  ? 'bg-white text-[#141D17] shadow-xs'
                  : 'text-[#445248] hover:text-[#141D17]'
              }`}
            >
              Contractor Quote Builder
            </button>
          </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs Column */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#141D17]/10 p-6 sm:p-8 space-y-8 no-print">
            {/* 1. Block Dimensions */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-semibold text-[#141D17]">
                    01. Lawn or Work Area Dimensions
                  </h3>
                  <p className="text-xs text-[#5B685E] mt-0.5">
                    Test Small (&lt;100 m²), Medium (100–250 m²), or 10 m × 40 m (400 m²) NSW blocks
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {[
                    { label: '90 m² (Small)', l: 9, w: 10 },
                    { label: '200 m² (Med)', l: 10, w: 20 },
                    { label: '400 m² (10×40)', l: 10, w: 40 },
                  ].map((preset) => {
                    const active = input.lengthM === preset.l && input.widthM === preset.w;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() =>
                          onChange({ ...input, lengthM: preset.l, widthM: preset.w })
                        }
                        className={`px-2.5 py-1.5 text-xs font-mono tabular-nums rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#1F5132] text-white border-[#1F5132]'
                            : 'bg-[#F6F7F4] text-[#445248] border-[#141D17]/10 hover:border-[#141D17]/30'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="block">
                  <span className="block text-xs font-medium text-[#445248] mb-1.5">
                    Width (metres)
                  </span>
                  <input
                    type="number"
                    min={3}
                    max={80}
                    step={1}
                    value={input.lengthM}
                    onChange={(e) =>
                      updateField('lengthM', Math.max(3, Math.min(80, Number(e.target.value) || 3)))
                    }
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-[#F6F7F4] border border-[#141D17]/15 rounded-lg text-[#141D17] focus:outline-2 focus:outline-[#1F5132]"
                  />
                </label>

                <label className="block">
                  <span className="block text-xs font-medium text-[#445248] mb-1.5">
                    Length (metres)
                  </span>
                  <input
                    type="number"
                    min={4}
                    max={100}
                    step={1}
                    value={input.widthM}
                    onChange={(e) =>
                      updateField('widthM', Math.max(4, Math.min(100, Number(e.target.value) || 4)))
                    }
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-[#F6F7F4] border border-[#141D17]/15 rounded-lg text-[#141D17] focus:outline-2 focus:outline-[#1F5132]"
                  />
                </label>

                <div className="flex flex-col justify-end">
                  <div className="px-3 py-2 bg-[#ECEEE9] border border-[#141D17]/10 rounded-lg">
                    <span className="block text-[11px] text-[#5B685E]">Total Area</span>
                    <span className="text-sm font-semibold font-mono tabular-nums text-[#141D17]">
                      {result.areaSqm} m²
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-[#141D17]/10" />

            {/* 2. Service Type & Suburb */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs font-medium text-[#445248] mb-1.5">
                  02. Service Category
                </span>
                <select
                  value={input.service}
                  onChange={(e) => updateField('service', e.target.value as ServiceCategory)}
                  className="w-full px-3 py-2.5 text-sm bg-[#F6F7F4] border border-[#141D17]/15 rounded-lg text-[#141D17] focus:outline-2 focus:outline-[#1F5132]"
                >
                  {(Object.keys(SERVICE_LABELS) as ServiceCategory[]).map((key) => (
                    <option key={key} value={key}>
                      {SERVICE_LABELS[key].title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-[#445248] mb-1.5">
                  Suburb (Chester Hill &amp; 10 km + Outside Areas)
                </span>
                <input
                  type="text"
                  list="calc-suburb-list"
                  value={input.suburb}
                  onChange={(e) => updateField('suburb', e.target.value)}
                  placeholder="Enter suburb..."
                  className="w-full px-3 py-2.5 text-sm bg-[#F6F7F4] border border-[#141D17]/15 rounded-lg text-[#141D17] focus:outline-2 focus:outline-[#1F5132]"
                />
                <datalist id="calc-suburb-list">
                  {CORE_SERVICE_SUBURBS.map((sub) => (
                    <option key={sub.name} value={sub.name}>
                      {sub.name} ({sub.postcode}) — Within 10 km
                    </option>
                  ))}
                </datalist>
              </label>
            </div>

            {input.service === 'softscaping' && (
              <div>
                <p className="text-xs font-medium text-[#445248] mb-2">Planting &amp; Mulching Scope</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'turf-lay', label: 'Turf Patches & Lawn' },
                    { id: 'mulch-beds', label: 'Fresh Mulch & Tidy' },
                    { id: 'full-bed-refresh', label: 'New Beds & Planting' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        updateField(
                          'softscapeScope',
                          opt.id as QuoteInput['softscapeScope']
                        )
                      }
                      className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        input.softscapeScope === opt.id
                          ? 'bg-[#1F5132] text-white border-[#1F5132]'
                          : 'bg-[#F6F7F4] text-[#141D17] border-[#141D17]/15 hover:border-[#141D17]/35'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {input.service === 'hardscaping' && (
              <div>
                <p className="text-xs font-medium text-[#445248] mb-2">Pressure Cleaning &amp; Path Scope</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'stepping-pavers', label: 'Paths, Patios & Pavers' },
                    { id: 'retaining-wall', label: 'Full Driveway Wash' },
                    { id: 'steel-edging', label: 'Garden Edging Reset' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        updateField(
                          'hardscapeScope',
                          opt.id as QuoteInput['hardscapeScope']
                        )
                      }
                      className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        input.hardscapeScope === opt.id
                          ? 'bg-[#1F5132] text-white border-[#1F5132]'
                          : 'bg-[#F6F7F4] text-[#141D17] border-[#141D17]/15 hover:border-[#141D17]/35'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLawnService && (
              <>
                <hr className="border-[#141D17]/10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-medium text-[#445248] mb-2">03. Grass Type</p>
                    <div className="space-y-2">
                      {[
                        { id: 'buffalo', label: 'Sir Walter Buffalo', note: 'Standard clipping volume' },
                        { id: 'kikuyu', label: 'Thick Kikuyu', note: 'Dense Sydney growth (+volume)' },
                        { id: 'couch-zoysia', label: 'Couch / Zoysia', note: 'Fine leaf, clean finish' },
                      ].map((grass) => (
                        <button
                          key={grass.id}
                          type="button"
                          onClick={() => updateField('grassType', grass.id as GrassType)}
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                            input.grassType === grass.id
                              ? 'bg-[#1F5132]/8 border-[#1F5132] text-[#141D17]'
                              : 'bg-[#F6F7F4] border-[#141D17]/10 text-[#445248] hover:border-[#141D17]/30'
                          }`}
                        >
                          <div className="text-xs font-semibold text-[#141D17]">{grass.label}</div>
                          <div className="text-[11px] text-[#5B685E]">{grass.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#445248] mb-2">
                      04. Current Grass Height
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: 'maintained', label: 'Maintained (1–2 Weeks)', note: 'Single pass, crisp edge' },
                        { id: 'moderate-growth', label: '3–4 Weeks Growth', note: 'Heavier cut & catcher empties' },
                        { id: 'overgrown', label: 'Overgrown (4+ Weeks)', note: 'Cleanup surcharge applies' },
                      ].map((cond) => (
                        <button
                          key={cond.id}
                          type="button"
                          onClick={() => updateField('growthCondition', cond.id as GrowthCondition)}
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                            input.growthCondition === cond.id
                              ? 'bg-[#1F5132]/8 border-[#1F5132] text-[#141D17]'
                              : 'bg-[#F6F7F4] border-[#141D17]/10 text-[#445248] hover:border-[#141D17]/30'
                          }`}
                        >
                          <div className="text-xs font-semibold text-[#141D17]">{cond.label}</div>
                          <div className="text-[11px] text-[#5B685E]">{cond.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            <hr className="border-[#141D17]/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-[#445248] mb-2">
                  Access &amp; Terrain Obstacles
                </p>
                <div className="space-y-2">
                  {[
                    { id: 'open-flat', label: 'Flat & Open Access', note: 'Wide gate, clear rectangular run' },
                    { id: 'standard-gates', label: 'Tight Side Gate / Garden Beds', note: 'Trees, clotheslines, narrow access' },
                    { id: 'obstacles-slope', label: 'Steep Slope / Trampoline', note: 'High obstacle & manual edging load' },
                  ].map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => updateField('accessTerrain', acc.id as AccessTerrain)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        input.accessTerrain === acc.id
                          ? 'bg-[#1F5132]/8 border-[#1F5132] text-[#141D17]'
                          : 'bg-[#F6F7F4] border-[#141D17]/10 text-[#445248] hover:border-[#141D17]/30'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#141D17]">{acc.label}</div>
                      <div className="text-[11px] text-[#5B685E]">{acc.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[#445248] mb-2">Green Waste Disposal</p>
                <div className="space-y-2">
                  {[
                    { id: 'council-bin', label: 'Use Client Council Green Bin', note: 'We use your green bin first ($0)' },
                    { id: 'mulch-onsite', label: 'Mulch / Side-Discharge On-Site', note: 'Fine mulch cut, zero haulage' },
                    { id: 'bag-and-tip', label: 'Extra Green Waste Removal', note: 'Taken away ($140–$200 per full load)' },
                  ].map((waste) => (
                    <button
                      key={waste.id}
                      type="button"
                      onClick={() => updateField('wasteDisposal', waste.id as WasteDisposal)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        input.wasteDisposal === waste.id
                          ? 'bg-[#1F5132]/8 border-[#1F5132] text-[#141D17]'
                          : 'bg-[#F6F7F4] border-[#141D17]/10 text-[#445248] hover:border-[#141D17]/30'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#141D17]">{waste.label}</div>
                      <div className="text-[11px] text-[#5B685E]">{waste.note}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isLawnService && (
              <>
                <hr className="border-[#141D17]/10" />
                <div>
                  <p className="text-xs font-medium text-[#445248] mb-2.5">
                    Optional Add-On Work (No chemical spraying listed unless EPA licensed)
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      {
                        key: 'includeHedgeTrim' as const,
                        label: 'Hedge Trimming ($65/hr)',
                      },
                      {
                        key: 'includeGardenWeeding' as const,
                        label: 'Hand-Weeding & Bed Tidy',
                      },
                      {
                        key: 'includePressureWash' as const,
                        label: 'Pressure Cleaning (From $140)',
                      },
                    ].map((addon) => {
                      const active = input[addon.key];
                      return (
                        <button
                          key={addon.key}
                          type="button"
                          onClick={() => updateField(addon.key, !active)}
                          className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            active
                              ? 'bg-[#1F5132] text-white border-[#1F5132]'
                              : 'bg-[#F6F7F4] text-[#445248] border-[#141D17]/15 hover:border-[#141D17]/35'
                          }`}
                        >
                          {active ? 'Added: ' : '+ '}
                          {addon.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Quote Output Column */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#141D17]/15 p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5132] mb-1">
                <LeafLogo className="w-4 h-4" />
                <span>The Avid Gardener</span>
              </div>
              <p className="text-xs text-[#5B685E]">
                {audienceMode === 'homeowner'
                  ? 'NSW Homeowner Market Estimate'
                  : 'Contractor Quote Summary'}
              </p>
              <h3 className="text-lg font-semibold text-[#141D17] mt-0.5">
                {SERVICE_LABELS[input.service].title}
              </h3>
              <p className="text-xs text-[#445248] mt-1">
                {input.suburb}, NSW · {result.areaSqm} m² ({input.lengthM} m × {input.widthM} m)
              </p>
            </div>

            <div className="py-5 border-y border-[#141D17]/10">
              <p className="text-xs text-[#5B685E] mb-1">Estimated Price Range (AUD)</p>
              <div className="text-3xl sm:text-4xl font-semibold text-[#141D17] font-mono tabular-nums tracking-tight">
                ${result.minTotal} – ${result.maxTotal}
              </div>
              <p className="text-xs text-[#445248] mt-2 leading-relaxed">{result.pricingNote}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block text-[#5B685E]">Per-m² Effective Rate</span>
                <span className="text-sm font-semibold font-mono tabular-nums text-[#141D17]">
                  ${result.perSqmLow.toFixed(2)} – ${result.perSqmHigh.toFixed(2)} / m²
                </span>
              </div>
              <div>
                <span className="block text-[#5B685E]">Est. On-Site Time</span>
                <span className="text-sm font-semibold font-mono tabular-nums text-[#141D17]">
                  {result.estMinutesMin} – {result.estMinutesMax} mins
                </span>
              </div>
              <div>
                <span className="block text-[#5B685E]">Hourly Guide Rate</span>
                <span className="text-sm font-semibold font-mono tabular-nums text-[#141D17]">
                  ${result.hourlyMin} – ${result.hourlyMax} / hr
                </span>
              </div>
              <div>
                <span className="block text-[#5B685E]">Distance Travel Fee</span>
                <span className="text-sm font-semibold font-mono tabular-nums text-[#141D17]">
                  {result.travelFee === 0 ? '$0 (Within 10 km)' : `$${result.travelFee} (10–20 km)`}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-medium text-[#445248] mb-3">Itemised Breakdown</p>
              <ul className="divide-y divide-[#141D17]/10 border-t border-b border-[#141D17]/10">
                {result.lineItems.map((item) => (
                  <li key={item.label} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#141D17]">{item.label}</p>
                      <p className="text-[11px] text-[#5B685E] mt-0.5">{item.detail}</p>
                    </div>
                    <span className="text-xs font-mono tabular-nums font-medium text-[#141D17] whitespace-nowrap shrink-0">
                      ${item.minAmount}–${item.maxAmount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-1 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#141D17]">
                  Business &amp; ABN (Veronica Rolles)
                </span>
                <a
                  href={abrViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1F5132] hover:underline whitespace-nowrap shrink-0"
                >
                  ABR Lookup
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="Australian Business Number (11 digits)"
                  value={siteConfig.abn}
                  onChange={(e) => onAbnChange(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono tabular-nums bg-[#F6F7F4] border border-[#141D17]/15 rounded-lg text-[#141D17] focus:outline-2 focus:outline-[#1F5132]"
                />
                <span
                  className={`text-[11px] font-medium whitespace-nowrap shrink-0 ${
                    abnStatus.isValid
                      ? 'text-[#1F5132]'
                      : abnStatus.isComplete
                        ? 'text-[#9A3412]'
                        : 'text-[#5B685E]'
                  }`}
                >
                  {abnStatus.isValid
                    ? 'ATO Checksum Valid'
                    : abnStatus.isComplete
                      ? 'Check ABN Digits'
                      : 'Enter 11 Digits'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 no-print">
              <button
                type="button"
                onClick={() => onSendToBooking(buildSummaryText())}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1F5132] rounded-lg hover:bg-[#173E26] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                Attach to Quote Form
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-[#141D17] bg-[#F6F7F4] border border-[#141D17]/15 rounded-lg hover:bg-[#ECEEE9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1F5132]" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-[#141D17] bg-[#F6F7F4] border border-[#141D17]/15 rounded-lg hover:bg-[#ECEEE9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
