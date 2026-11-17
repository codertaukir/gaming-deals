import { useState, type FormEvent } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { TrustPageShell } from '@/components/legal/TrustPageShell';
import { Button } from '@/components/ui';
import { SITE_CONFIG } from '@/config/site';
import { ROUTES } from '@/router/routes';

type ContactTopic =
  | 'Listing or Sample Price Correction'
  | 'Authorized Retailer Partnership'
  | 'Editorial & Review Feedback'
  | 'Privacy or Legal Inquiry';

const CONTACT_TOPICS: ContactTopic[] = [
  'Listing or Sample Price Correction',
  'Authorized Retailer Partnership',
  'Editorial & Review Feedback',
  'Privacy or Legal Inquiry',
];

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<ContactTopic>('Listing or Sample Price Correction');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [preparedSummary, setPreparedSummary] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  async function handleCopyAddress() {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.contactEmail);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  }

  async function handleCopyDraft() {
    if (!preparedSummary) return;
    try {
      await navigator.clipboard.writeText(preparedSummary);
      setCopiedDraft(true);
      window.setTimeout(() => setCopiedDraft(false), 2000);
    } catch {
      setCopiedDraft(false);
    }
  }

  function validateForm(): FormErrors {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid reply email address.';
    }
    if (message.trim().length < 15) {
      nextErrors.message = 'Please include at least 15 characters describing your inquiry.';
    }
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setPreparedMailto(null);
      setPreparedSummary(null);
      return;
    }

    const subject = `[Gaming Deals] ${topic} — ${name.trim()}`;
    const body = [
      `From: ${name.trim()} (${email.trim()})`,
      `Topic: ${topic}`,
      '',
      message.trim(),
    ].join('\n');

    const mailtoUrl = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPreparedMailto(mailtoUrl);
    setPreparedSummary(`To: ${SITE_CONFIG.contactEmail}\nSubject: ${subject}\n\n${body}`);
  }

  return (
    <TrustPageShell
      title="Contact Gaming Deals"
      description="Report expired offers, suggest authorized store additions, or reach our editorial desk directly."
      canonicalPath={ROUTES.contact}
      metadata={['Editorial Desk', 'Static Draft Composer', 'No Server Data Collection']}
      structuredDataType="ContactPage"
    >
      <section className="surface-card space-y-4 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">Direct Editorial Contact</h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          For listing updates, trademark or attribution notices, or authorized affiliate program
          inquiries, reach us directly by email.
        </p>

        <div className="flex flex-col gap-3 rounded-[10px] border border-[#94A3B8]/15 bg-[#171A26] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 shrink-0 text-[#22D3EE]" aria-hidden="true" />
            <div>
              <div className="text-xs text-[#94A3B8]">Editorial &amp; Corrections Inbox</div>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="font-mono text-sm font-medium text-[#F8FAFC] hover:text-[#22D3EE]"
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCopyAddress}
            leftIcon={
              copiedEmail ? (
                <Check className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )
            }
          >
            {copiedEmail ? 'Copied' : 'Copy Email'}
          </Button>
        </div>
      </section>

      <section className="surface-card space-y-5 p-6 sm:p-7">
        <div>
          <h2 className="text-xl font-semibold text-[#F8FAFC]">Prepare an Inquiry Draft</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[#94A3B8]">
            Because Gaming Deals is a 100% static website without a backend database, submitting
            this form validates your details locally and prepares a formatted email draft for your
            mail app—no data is transmitted or stored on our servers.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-[#F8FAFC]">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g., Aarav Sharma"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className="mt-1.5 min-h-[44px] w-full rounded-[10px] border border-[#94A3B8]/20 bg-[#08090D] px-3.5 text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:border-[#8B5CF6] focus:outline-none"
              />
              {errors.name && (
                <p id="contact-name-error" className="mt-1 text-xs text-[#F59E0B]">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-[#F8FAFC]">
                Reply Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className="mt-1.5 min-h-[44px] w-full rounded-[10px] border border-[#94A3B8]/20 bg-[#08090D] px-3.5 text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:border-[#8B5CF6] focus:outline-none"
              />
              {errors.email && (
                <p id="contact-email-error" className="mt-1 text-xs text-[#F59E0B]">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="contact-topic" className="block text-xs font-medium text-[#F8FAFC]">
              Inquiry Topic
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value as ContactTopic)}
              className="mt-1.5 min-h-[44px] w-full rounded-[10px] border border-[#94A3B8]/20 bg-[#08090D] px-3.5 text-sm text-[#F8FAFC] focus:border-[#8B5CF6] focus:outline-none"
            >
              {CONTACT_TOPICS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-medium text-[#F8FAFC]">
              Message Details
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Include the game or hardware title, region/storefront, and what you would like updated..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className="mt-1.5 w-full rounded-[10px] border border-[#94A3B8]/20 bg-[#08090D] p-3.5 text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:border-[#8B5CF6] focus:outline-none"
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1 text-xs text-[#F59E0B]">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              type="submit"
              variant="primary"
              leftIcon={<Send className="h-4 w-4" aria-hidden="true" />}
            >
              Prepare Email Draft
            </Button>
          </div>
        </form>

        {preparedMailto && preparedSummary && (
          <div
            role="status"
            aria-live="polite"
            className="space-y-3 rounded-[10px] border border-[#10B981]/35 bg-[#171A26] p-4"
          >
            <div className="text-sm font-semibold text-[#F8FAFC]">
              Email Draft Ready in Your Browser
            </div>
            <p className="text-xs leading-relaxed text-[#94A3B8]">
              Open the prepared draft in your default mail client or copy the text below to send it
              manually.
            </p>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-[8px] border border-[#94A3B8]/15 bg-[#08090D] p-3 font-mono text-xs text-[#94A3B8]">
              {preparedSummary}
            </pre>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={preparedMailto}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-[8px] bg-[#8B5CF6] px-4 text-xs font-medium text-[#F8FAFC] transition-colors hover:bg-[#7C3AED]"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Open in Email Client</span>
              </a>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleCopyDraft}
                leftIcon={
                  copiedDraft ? (
                    <Check className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )
                }
              >
                {copiedDraft ? 'Draft Copied' : 'Copy Draft Text'}
              </Button>
            </div>
          </div>
        )}
      </section>
    </TrustPageShell>
  );
}
