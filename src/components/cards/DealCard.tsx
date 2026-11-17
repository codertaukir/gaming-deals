import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { MetadataRow, StatusBadge } from '@/components/ui';
import type { Deal } from '@/types/marketplace';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyCode() {
    if (!deal.couponCode || deal.isExpired) return;
    try {
      await navigator.clipboard.writeText(deal.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article
      className={`surface-card flex h-full flex-col justify-between gap-4 p-5 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        deal.isExpired
          ? 'opacity-75'
          : 'hover:-translate-y-0.5 hover:border-[#94A3B8]/32 motion-reduce:hover:translate-y-0'
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <MetadataRow items={[deal.retailer, deal.isSampleData ? 'Sample offer' : 'Verified']} />
          <span
            className={`font-mono text-xs font-semibold tabular-nums whitespace-nowrap shrink-0 ${
              deal.isExpired ? 'text-[#94A3B8]' : 'text-[#22D3EE]'
            }`}
          >
            {deal.discountLabel}
          </span>
        </div>

        <h3 className="text-base font-semibold leading-snug text-[#F8FAFC]">{deal.title}</h3>
        <p className="text-sm leading-relaxed text-[#94A3B8]">{deal.description}</p>
      </div>

      <div className="space-y-3 border-t border-[#94A3B8]/10 pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>Checked {deal.verifiedAt}</span>
          {deal.isExpired ? (
            <StatusBadge tone="expired" label={`Expired ${deal.expiryDate}`} />
          ) : (
            <span>Valid until {deal.expiryDate}</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {deal.couponCode && (
            <button
              type="button"
              disabled={deal.isExpired}
              onClick={handleCopyCode}
              aria-label={copied ? 'Coupon code copied' : `Copy coupon code ${deal.couponCode}`}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-[8px] border border-dashed border-[#94A3B8]/35 bg-[#171A26] px-3 py-1.5 font-mono text-xs font-medium text-[#F8FAFC] transition-colors duration-150 hover:border-[#8B5CF6]/60 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{copied ? 'Copied' : deal.couponCode}</span>
              {!deal.isExpired &&
                (copied ? (
                  <Check className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-[#94A3B8]" aria-hidden="true" />
                ))}
            </button>
          )}

          {deal.isExpired ? (
            <span className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-[8px] border border-[#94A3B8]/15 bg-[#10121A] px-3.5 py-2 text-xs font-medium text-[#64748B]">
              Offer ended
            </span>
          ) : (
            <a
              href={deal.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-[8px] bg-[#171A26] px-3.5 py-2 text-xs font-medium text-[#F8FAFC] whitespace-nowrap transition-colors hover:bg-[#8B5CF6]"
            >
              <span>Visit retailer</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
