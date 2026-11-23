import { useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { ArrowUpRight, MapPin } from 'lucide-react';
import {
  CHESTER_HILL_CENTER,
  CORE_SERVICE_SUBURBS,
  type SuburbLocation,
} from '../data/pricingData';

interface ServiceAreaMapProps {
  selectedSuburb: string;
  onSelectSuburb: (suburb: string) => void;
}

const RAW_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
// Only use the interactive map with a real Maps JavaScript API key (they start with "AIza").
// Anything else falls back to the free Google Maps embed so a bad key can't crash the page.
const MAPS_API_KEY =
  RAW_MAPS_API_KEY && RAW_MAPS_API_KEY.trim().startsWith('AIza') ? RAW_MAPS_API_KEY.trim() : undefined;

function ChesterHillMapCanvas({
  activeLocation,
  onSelectLocation,
}: {
  activeLocation: SuburbLocation;
  onSelectLocation: (loc: SuburbLocation) => void;
}) {
  const [infoOpen, setInfoOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <GoogleMap
      mapId="DEMO_MAP_ID"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      defaultCenter={CHESTER_HILL_CENTER}
      center={{ lat: activeLocation.lat, lng: activeLocation.lng }}
      defaultZoom={12}
      gestureHandling="cooperative"
      className="w-full h-full"
    >
      {CORE_SERVICE_SUBURBS.map((loc) => {
        const isSelected = loc.name === activeLocation.name;
        const isBase = loc.name === 'Chester Hill';
        if (isSelected) {
          return (
            <AdvancedMarker
              key={loc.name}
              ref={markerRef}
              position={{ lat: loc.lat, lng: loc.lng }}
              title={`${loc.name} NSW ${loc.postcode}`}
              onClick={() => setInfoOpen(true)}
            >
              <Pin
                background="#1F5132"
                borderColor="#142119"
                glyphColor="#FFFFFF"
                scale={1.15}
              />
            </AdvancedMarker>
          );
        }
        return (
          <AdvancedMarker
            key={loc.name}
            position={{ lat: loc.lat, lng: loc.lng }}
            title={`${loc.name} NSW ${loc.postcode}`}
            onClick={() => {
              onSelectLocation(loc);
              setInfoOpen(true);
            }}
          >
            <Pin
              background={isBase ? '#142119' : '#FFFFFF'}
              borderColor="#1F5132"
              glyphColor={isBase ? '#FFFFFF' : '#1F5132'}
              scale={0.85}
            />
          </AdvancedMarker>
        );
      })}

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={240}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="text-xs text-[#141D17] space-y-1 p-0.5">
            <p className="font-semibold">
              {activeLocation.name}, NSW {activeLocation.postcode}
            </p>
            <p className="text-[#445248]">
              {activeLocation.distanceKm === 0
                ? 'Base Hub · The Avid Gardener'
                : `${activeLocation.distanceKm.toFixed(1)} km from Chester Hill · No travel fee`}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export function ServiceAreaMap({
  selectedSuburb,
  onSelectSuburb,
}: ServiceAreaMapProps) {
  const activeLocation: SuburbLocation =
    CORE_SERVICE_SUBURBS.find(
      (s) => s.name.toLowerCase() === selectedSuburb.trim().toLowerCase()
    ) ?? CORE_SERVICE_SUBURBS[0];

  const isCustomOutsideCore = !CORE_SERVICE_SUBURBS.some(
    (s) => s.name.toLowerCase() === selectedSuburb.trim().toLowerCase()
  );

  return (
    <section
      id="service-area"
      className="py-14 sm:py-20 border-b border-[#141D17]/10 bg-[#ECEEE9]/50"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-[#1F5132] mb-2">Service Area</p>
          <h2
            className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#141D17] mb-3"
            style={{ textWrap: 'balance' }}
          >
            Based in Chester Hill &amp; servicing suburbs within 10 km
          </h2>
          <p className="text-sm sm:text-base text-[#445248] leading-relaxed">
            The Avid Gardener is based in Chester Hill (2162) and services surrounding suburbs with
            zero travel surcharge. Outside these areas? A small travel fee applies ($25 per visit
            for 10–20 km; further distances quoted). Get in touch and ask.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Suburb List & Travel Fee Info */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CORE_SERVICE_SUBURBS.map((suburb) => {
                const isActive =
                  suburb.name.toLowerCase() === selectedSuburb.trim().toLowerCase();
                return (
                  <button
                    key={suburb.name}
                    type="button"
                    onClick={() => onSelectSuburb(suburb.name)}
                    className={`px-3 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#1F5132] text-white border-[#1F5132]'
                        : 'bg-white text-[#141D17] border-[#141D17]/10 hover:border-[#141D17]/30'
                    }`}
                  >
                    <span className="block text-xs font-medium truncate">{suburb.name}</span>
                    <span
                      className={`block text-[10px] font-mono tabular-nums mt-0.5 ${
                        isActive ? 'text-white/80' : 'text-[#5B685E]'
                      }`}
                    >
                      {suburb.postcode} · {suburb.distanceKm.toFixed(1)} km
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-xl border border-[#141D17]/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1F5132] shrink-0" aria-hidden="true" />
                  <span className="text-sm font-semibold text-[#141D17]">
                    {isCustomOutsideCore
                      ? `${selectedSuburb} (Outside 10 km core)`
                      : `${activeLocation.name}, NSW ${activeLocation.postcode}`}
                  </span>
                </div>
                <p className="text-xs text-[#445248] mt-1">
                  {isCustomOutsideCore
                    ? '$25 travel fee for 10–20 km from Chester Hill; further distances quoted.'
                    : activeLocation.distanceKm === 0
                      ? 'Home base · $0 travel fee'
                      : `${activeLocation.distanceKm.toFixed(1)} km from Chester Hill · Within 10 km ($0 travel fee)`}
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#1F5132] hover:underline whitespace-nowrap shrink-0"
              >
                Quote for {isCustomOutsideCore ? selectedSuburb : activeLocation.name}
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Embedded Google Map Centred on Chester Hill */}
          <div className="lg:col-span-6">
            <div className="h-[400px] w-full rounded-xl overflow-hidden border border-[#141D17]/15 bg-white">
              {MAPS_API_KEY ? (
                <APIProvider
                  apiKey={MAPS_API_KEY}
                  libraries={['marker']}
                  language="en-AU"
                  region="AU"
                >
                  <ChesterHillMapCanvas
                    activeLocation={activeLocation}
                    onSelectLocation={(loc) => onSelectSuburb(loc.name)}
                  />
                </APIProvider>
              ) : (
                <iframe
                  title={`Map of ${activeLocation.name}, NSW ${activeLocation.postcode}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    `${activeLocation.name} NSW ${activeLocation.postcode}`
                  )}&z=13&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
