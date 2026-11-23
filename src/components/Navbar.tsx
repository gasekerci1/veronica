import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LeafLogo, Wordmark } from './LeafLogo';

interface NavbarProps {
  onQuoteClick: () => void;
}

export function Navbar({ onQuoteClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#plans', label: 'Plans & Pricing' },
    { href: '#about', label: 'Meet Veronica' },
    { href: '#service-area', label: 'Service Area' },
    { href: '#faqs', label: 'FAQs' },
  ];

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-sm border-b border-[#23262A]/10 no-print">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Official Leaf Icon + Single-line Brand Wordmark */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 text-[#23262A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F6F4A]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <LeafLogo className="w-7 h-7 shrink-0" />
          <Wordmark className="text-[22px] leading-none" />
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4E534B]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#23262A] hover:underline underline-offset-4 decoration-[#4F6F4A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F6F4A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onQuoteClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#4F6F4A] rounded-lg hover:bg-[#3E5A3A] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F6F4A]"
          >
            Get a free quote
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#23262A]/15 text-[#23262A] hover:bg-[#EEEBE3] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#23262A]/10 bg-[#F7F5F0] px-4 py-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2.5 text-sm font-medium text-[#23262A] rounded-lg hover:bg-[#EEEBE3] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onQuoteClick();
              }}
              className="mt-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-[#4F6F4A] rounded-lg hover:bg-[#3E5A3A] transition-colors cursor-pointer"
            >
              Get a free quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
