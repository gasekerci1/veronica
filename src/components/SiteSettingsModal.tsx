import { X } from 'lucide-react';
import type { SiteConfig } from '../data/pricingData';

interface SiteSettingsModalProps {
  isOpen: boolean;
  config: SiteConfig;
  onChange: (next: SiteConfig) => void;
  onClose: () => void;
}

export function SiteSettingsModal({
  isOpen,
  config,
  onChange,
  onClose,
}: SiteSettingsModalProps) {
  if (!isOpen) return null;

  const update = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="bg-white rounded-xl border border-[#23262A]/15 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="site-settings-title" className="text-lg font-semibold text-[#23262A]">
              Business Details &amp; Compliance Toggles
            </h2>
            <p className="text-xs text-[#5C6158] mt-0.5">
              Update contact details, socials, and licence/insurance flags before going live.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4E534B] hover:bg-[#EEEBE3] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-xs font-medium text-[#4E534B] mb-1">Phone</span>
              <input
                type="tel"
                value={config.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="04XX XXX XXX"
                className="w-full px-3 py-2 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-medium text-[#4E534B] mb-1">Email</span>
              <input
                type="email"
                value={config.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="veronicarolles@gmail.com"
                className="w-full px-3 py-2 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-xs font-medium text-[#4E534B] mb-1">ABN</span>
              <input
                type="text"
                value={config.abn}
                onChange={(e) => update('abn', e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-medium text-[#4E534B] mb-1">Hours</span>
              <input
                type="text"
                value={config.hours}
                onChange={(e) => update('hours', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg"
              />
            </label>
          </div>

          <label className="block">
            <span className="block text-xs font-medium text-[#4E534B] mb-1">
              Google Business Profile URL
            </span>
            <input
              type="url"
              value={config.gbpUrl}
              onChange={(e) => update('gbpUrl', e.target.value)}
              placeholder="https://g.page/..."
              className="w-full px-3 py-2 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-xs font-medium text-[#4E534B] mb-1">Facebook URL</span>
              <input
                type="url"
                value={config.facebookUrl}
                onChange={(e) => update('facebookUrl', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-medium text-[#4E534B] mb-1">Instagram URL</span>
              <input
                type="url"
                value={config.instagramUrl}
                onChange={(e) => update('instagramUrl', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg"
              />
            </label>
          </div>

          <div className="pt-2 border-t border-[#23262A]/10 space-y-2.5">
            <label className="flex items-start gap-2.5 text-xs text-[#23262A] cursor-pointer">
              <input
                type="checkbox"
                checked={config.insuranceActive}
                onChange={(e) => update('insuranceActive', e.target.checked)}
                className="mt-0.5 accent-[#4F6F4A]"
              />
              <span>
                <strong>$20M Public Liability Insurance Active</strong> — only enable once policy
                is active.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-[#23262A] cursor-pointer">
              <input
                type="checkbox"
                checked={config.epaLicenceActive}
                onChange={(e) => update('epaLicenceActive', e.target.checked)}
                className="mt-0.5 accent-[#4F6F4A]"
              />
              <span>
                <strong>NSW EPA Ground Applicator Licence Granted</strong> — enables listing
                targeted weed spraying on the site.
              </span>
            </label>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-white bg-[#4F6F4A] rounded-lg hover:bg-[#3E5A3A] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
