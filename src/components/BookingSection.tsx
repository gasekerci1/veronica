import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { Check, Copy, ImagePlus, Phone, X } from 'lucide-react';
import { CORE_SERVICE_SUBURBS, type SiteConfig } from '../data/pricingData';
import { QUOTE_CC, QUOTE_SMS_NUMBER, QUOTE_TO } from '../data/ownerMode';

interface BookingSectionProps {
  selectedSuburb: string;
  preselectedServiceName: string;
  preselectedFrequency: 'One-off' | 'Fortnightly' | 'Monthly' | 'Not sure';
  preselectedSize: 'Small (under 100 m²)' | 'Medium (100–250 m²)' | 'Large (250 m²+)' | 'Not sure';
  prefilledQuoteSummary: string;
  siteConfig: SiteConfig;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  suburb?: string;
  services?: string;
}

interface UploadedPhoto {
  name: string;
  previewUrl: string;
}

const BASE_SERVICE_CHECKBOXES = [
  'Lawn mowing',
  'Garden maintenance',
  'Hedge trimming',
  'Garden cleanup',
  'Pressure cleaning',
  'Green waste removal',
  'Small tree removal',
  'Planting & mulching',
  'Other',
];

export function BookingSection({
  selectedSuburb,
  preselectedServiceName,
  preselectedFrequency,
  preselectedSize,
  prefilledQuoteSummary,
  siteConfig,
}: BookingSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [suburbChoice, setSuburbChoice] = useState(selectedSuburb);
  const [customSuburb, setCustomSuburb] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Lawn mowing']);
  const [frequency, setFrequency] = useState(preselectedFrequency);
  const [lawnSize, setLawnSize] = useState(preselectedSize);
  const [message, setMessage] = useState(prefilledQuoteSummary);
  const [preferredContact, setPreferredContact] = useState<'Call' | 'Text' | 'Email'>('Text');
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedDigest, setCopiedDigest] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const serviceOptions = siteConfig.epaLicenceActive
    ? [...BASE_SERVICE_CHECKBOXES.slice(0, 8), 'Targeted weed spraying', 'Other']
    : BASE_SERVICE_CHECKBOXES;

  useEffect(() => {
    const isCore = CORE_SERVICE_SUBURBS.some(
      (s) => s.name.toLowerCase() === selectedSuburb.trim().toLowerCase()
    );
    if (isCore) {
      setSuburbChoice(selectedSuburb);
      setCustomSuburb('');
    } else if (selectedSuburb) {
      setSuburbChoice('Other');
      setCustomSuburb(selectedSuburb);
    }
  }, [selectedSuburb]);

  useEffect(() => {
    if (preselectedServiceName) {
      setSelectedServices((prev) =>
        prev.includes(preselectedServiceName) ? prev : [...prev, preselectedServiceName]
      );
      setSubmitted(false);
    }
  }, [preselectedServiceName]);

  useEffect(() => {
    setFrequency(preselectedFrequency);
  }, [preselectedFrequency]);

  useEffect(() => {
    setLawnSize(preselectedSize);
  }, [preselectedSize]);

  useEffect(() => {
    if (prefilledQuoteSummary) {
      setMessage(prefilledQuoteSummary);
      setSubmitted(false);
    }
  }, [prefilledQuoteSummary]);

  const toggleService = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remainingSlots = Math.max(0, 5 - photos.length);
    const nextFiles = Array.from(files).slice(0, remainingSlots);
    const added = nextFiles.map((file) => ({
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...added]);
    e.target.value = '';
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const target = prev[index];
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const resolvedSuburb = suburbChoice === 'Other' ? customSuburb.trim() : suburbChoice;

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Name is required.';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 8 || phoneDigits.length > 12) {
      nextErrors.phone = 'Enter a valid Australian mobile or landline number.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!resolvedSuburb || resolvedSuburb.length < 2) {
      nextErrors.suburb = 'Select or enter your suburb.';
    }

    if (selectedServices.length === 0) {
      nextErrors.services = 'Select at least one service needed.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || sending) {
      return;
    }
    setSending(true);
    setSendError(false);
    try {
      const payload: Record<string, string> = {
        _subject: `New quote request — ${fullName.trim()} (${resolvedSuburb})`,
        _template: 'table',
        _captcha: 'false',
        Name: fullName.trim(),
        Phone: phone.trim(),
        Email: email.trim() || '(not given)',
        Suburb: `${resolvedSuburb}, NSW`,
        Services: selectedServices.join(', '),
        'How often': frequency,
        'Lawn size': lawnSize,
        'Preferred contact': preferredContact,
        Photos: photos.length > 0 ? `${photos.length} photo(s) chosen — ask the customer to text them` : 'None',
        Message: message.trim() || '(none)',
      };
      if (email.trim()) payload._replyto = email.trim();
      if (QUOTE_CC) payload._cc = QUOTE_CC;
      const res = await fetch(`https://formsubmit.co/ajax/${QUOTE_TO}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const quoteRequestDigest = [
    `Quote Request — Lawn & Order (ABN ${siteConfig.abn})`,
    `Name: ${fullName.trim()}`,
    `Phone: ${phone.trim()}`,
    `Email: ${email.trim()}`,
    `Suburb: ${resolvedSuburb}, NSW`,
    `Services: ${selectedServices.join(', ')}`,
    `How often: ${frequency}`,
    `Approx. lawn size: ${lawnSize}`,
    `Preferred contact: ${preferredContact}`,
    photos.length > 0 ? `Attached photos: ${photos.map((p) => p.name).join(', ')}` : '',
    message.trim() ? `\nMessage / Job Details:\n${message.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const handleCopyDigest = async () => {
    try {
      await navigator.clipboard.writeText(quoteRequestDigest);
      setCopiedDigest(true);
      window.setTimeout(() => setCopiedDigest(false), 2200);
    } catch {
      setCopiedDigest(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Business Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-medium text-[#4F6F4A] mb-2">Free Quotes Within 24 Hours</p>
              <h2
                className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#23262A] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Get a free quote
              </h2>
              <p className="text-sm sm:text-base text-[#4E534B] leading-relaxed">
                Fill in the details below or send a quick text with photos of your garden. Same-day
                or next-day quotes from Veronica, with a quick site visit arranged for larger jobs.
              </p>
            </div>

            <div className="pt-6 border-t border-[#23262A]/10 space-y-3 text-sm text-[#4E534B]">
              <p>
                <span className="font-medium text-[#23262A]">Owner / Operator:</span> Veronica Rolles
              </p>
              <p>
                <span className="font-medium text-[#23262A]">Base:</span> Chester Hill, NSW 2162
              </p>
              <p>
                <span className="font-medium text-[#23262A]">ABN:</span>{' '}
                <span className="font-mono tabular-nums">{siteConfig.abn}</span>
              </p>
              <p>
                <span className="font-medium text-[#23262A]">Hours:</span> {siteConfig.hours}
              </p>
              {siteConfig.phone && (
                <p>
                  <span className="font-medium text-[#23262A]">Phone:</span>{' '}
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
                    className="inline-flex items-center gap-1 text-[#4F6F4A] hover:underline font-medium"
                  >
                    <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                    {siteConfig.phone}
                  </a>
                </p>
              )}
              {siteConfig.email && (
                <p>
                  <span className="font-medium text-[#23262A]">Email:</span>{' '}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[#4F6F4A] hover:underline font-medium"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#23262A]/10 p-6 sm:p-8">
            {submitted ? (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-medium text-[#4F6F4A] mb-1">Quote Request Ready</p>
                  <h3 className="text-xl font-semibold text-[#23262A]">
                    Thanks! Veronica will be in touch within 24 hours (usually sooner) with your
                    quote.
                  </h3>
                  <p className="text-sm text-[#4E534B] mt-2">
                    Your request has been sent. Got photos of the garden? Text them to{' '}
                    <a href={`sms:${QUOTE_SMS_NUMBER}`} className="text-[#4F6F4A] font-medium underline">
                      0423 715 078
                    </a>{' '}
                    for a faster, more accurate quote.
                  </p>
                </div>

                <pre className="p-4 bg-[#F7F5F0] border border-[#23262A]/10 rounded-lg text-xs font-mono text-[#23262A] whitespace-pre-wrap overflow-x-auto">
                  {quoteRequestDigest}
                </pre>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyDigest}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#4F6F4A] rounded-lg hover:bg-[#3E5A3A] transition-colors cursor-pointer"
                  >
                    {copiedDigest ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        Summary Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        Copy Quote Summary
                      </>
                    )}
                  </button>

                  <a
                    href={`sms:${QUOTE_SMS_NUMBER}?&body=${encodeURIComponent(quoteRequestDigest)}`}
                    className="px-4 py-2.5 text-sm font-medium text-[#23262A] bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg hover:bg-[#EEEBE3] transition-colors"
                  >
                    Text it to Veronica too
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 text-sm font-medium text-[#4E534B] hover:text-[#23262A] cursor-pointer"
                  >
                    Edit Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name, Phone, Email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="block">
                    <span className="block text-xs font-medium text-[#4E534B] mb-1.5">
                      Name <span className="text-[#A84D27]">*</span>
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg text-[#23262A] focus:outline-2 focus:outline-[#4F6F4A]"
                    />
                    {errors.fullName && (
                      <span className="block text-xs text-[#A84D27] mt-1">{errors.fullName}</span>
                    )}
                  </label>

                  <label className="block">
                    <span className="block text-xs font-medium text-[#4E534B] mb-1.5">
                      Phone <span className="text-[#A84D27]">*</span>
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="04XX XXX XXX"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg text-[#23262A] focus:outline-2 focus:outline-[#4F6F4A]"
                    />
                    {errors.phone && (
                      <span className="block text-xs text-[#A84D27] mt-1">{errors.phone}</span>
                    )}
                  </label>

                  <label className="block">
                    <span className="block text-xs font-medium text-[#4E534B] mb-1.5">
                      Email <span className="text-[#A84D27]">*</span>
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg text-[#23262A] focus:outline-2 focus:outline-[#4F6F4A]"
                    />
                    {errors.email && (
                      <span className="block text-xs text-[#A84D27] mt-1">{errors.email}</span>
                    )}
                  </label>
                </div>

                {/* Suburb Dropdown + Other */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-xs font-medium text-[#4E534B] mb-1.5">
                      Suburb <span className="text-[#A84D27]">*</span>
                    </span>
                    <select
                      value={suburbChoice}
                      onChange={(e) => setSuburbChoice(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg text-[#23262A] focus:outline-2 focus:outline-[#4F6F4A]"
                    >
                      {CORE_SERVICE_SUBURBS.map((sub) => (
                        <option key={sub.name} value={sub.name}>
                          {sub.name} ({sub.postcode})
                        </option>
                      ))}
                      <option value="Other">Other (10–20 km+ travel fee may apply)</option>
                    </select>
                    {errors.suburb && (
                      <span className="block text-xs text-[#A84D27] mt-1">{errors.suburb}</span>
                    )}
                  </label>

                  {suburbChoice === 'Other' && (
                    <label className="block">
                      <span className="block text-xs font-medium text-[#4E534B] mb-1.5">
                        Enter Suburb Name
                      </span>
                      <input
                        type="text"
                        value={customSuburb}
                        onChange={(e) => setCustomSuburb(e.target.value)}
                        placeholder="e.g. Strathfield or Merrylands"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg text-[#23262A] focus:outline-2 focus:outline-[#4F6F4A]"
                      />
                    </label>
                  )}
                </div>

                {/* Service Needed Checkboxes */}
                <div>
                  <span className="block text-xs font-medium text-[#4E534B] mb-2">
                    Service needed <span className="text-[#A84D27]">*</span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {serviceOptions.map((item) => {
                      const checked = selectedServices.includes(item);
                      return (
                        <label
                          key={item}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                            checked
                              ? 'bg-[#4F6F4A]/8 border-[#4F6F4A] text-[#23262A] font-medium'
                              : 'bg-[#F7F5F0] border-[#23262A]/10 text-[#4E534B]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleService(item)}
                            className="accent-[#4F6F4A]"
                          />
                          <span>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.services && (
                    <span className="block text-xs text-[#A84D27] mt-1">{errors.services}</span>
                  )}
                </div>

                {/* Frequency & Approx Lawn Size Radios */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="block text-xs font-medium text-[#4E534B] mb-2">
                      How often?
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['One-off', 'Fortnightly', 'Monthly', 'Not sure'] as const).map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs cursor-pointer ${
                            frequency === opt
                              ? 'bg-[#4F6F4A]/8 border-[#4F6F4A] text-[#23262A] font-medium'
                              : 'bg-[#F7F5F0] border-[#23262A]/10 text-[#4E534B]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="frequency"
                            checked={frequency === opt}
                            onChange={() => setFrequency(opt)}
                            className="accent-[#4F6F4A]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-[#4E534B] mb-2">
                      Approx. lawn size
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {(
                        [
                          'Small (under 100 m²)',
                          'Medium (100–250 m²)',
                          'Large (250 m²+)',
                          'Not sure',
                        ] as const
                      ).map((size) => (
                        <label
                          key={size}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                            lawnSize === size
                              ? 'bg-[#4F6F4A]/8 border-[#4F6F4A] text-[#23262A] font-medium'
                              : 'bg-[#F7F5F0] border-[#23262A]/10 text-[#4E534B]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="lawnSize"
                            checked={lawnSize === size}
                            onChange={() => setLawnSize(size)}
                            className="accent-[#4F6F4A]"
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message / Job Details */}
                <label className="block">
                  <span className="block text-xs font-medium text-[#4E534B] mb-1.5">
                    Message / job details
                  </span>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your lawn, hedges, side-gate access, or anything else..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg text-[#23262A] focus:outline-2 focus:outline-[#4F6F4A]"
                  />
                </label>

                {/* Upload Photos (Optional, up to 5) & Preferred Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  <div>
                    <span className="block text-xs font-medium text-[#4E534B] mb-2">
                      Upload photos (optional, up to 5)
                    </span>
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#23262A] bg-[#F7F5F0] border border-[#23262A]/15 rounded-lg hover:bg-[#EEEBE3] transition-colors cursor-pointer">
                      <ImagePlus className="w-4 h-4 text-[#4F6F4A]" aria-hidden="true" />
                      <span>Choose photos ({photos.length}/5)</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={photos.length >= 5}
                        onChange={handlePhotoUpload}
                        className="sr-only"
                      />
                    </label>
                    {photos.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {photos.map((photo, idx) => (
                          <div
                            key={`${photo.name}-${idx}`}
                            className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#23262A]/15"
                          >
                            <img
                              src={photo.previewUrl}
                              alt={photo.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(idx)}
                              aria-label={`Remove ${photo.name}`}
                              className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-[#4E534B] mb-2">
                      Preferred contact
                    </span>
                    <div className="flex items-center gap-2">
                      {(['Call', 'Text', 'Email'] as const).map((method) => (
                        <label
                          key={method}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-xs cursor-pointer ${
                            preferredContact === method
                              ? 'bg-[#4F6F4A]/8 border-[#4F6F4A] text-[#23262A] font-medium'
                              : 'bg-[#F7F5F0] border-[#23262A]/10 text-[#4E534B]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredContact"
                            checked={preferredContact === method}
                            onChange={() => setPreferredContact(method)}
                            className="accent-[#4F6F4A]"
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {sendError && (
                  <div role="alert" className="p-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-900">
                    Sorry, that didn't send. Please{' '}
                    <a
                      href={`sms:${QUOTE_SMS_NUMBER}?&body=${encodeURIComponent(quoteRequestDigest)}`}
                      className="font-semibold underline"
                    >
                      text your request to Veronica
                    </a>{' '}
                    or call{' '}
                    <a href={`tel:${QUOTE_SMS_NUMBER}`} className="font-semibold underline">
                      0423 715 078
                    </a>
                    .
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-[#4F6F4A] rounded-lg hover:bg-[#3E5A3A] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                >
                  {sending ? 'Sending…' : 'Send my quote request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
