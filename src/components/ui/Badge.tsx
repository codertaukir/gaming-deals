import type { ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Tag } from 'lucide-react';

export type BadgeTone = 'neutral' | 'purple' | 'cyan' | 'verified' | 'sample' | 'expired';

interface StatusBadgeProps {
  tone?: BadgeTone;
  label: string;
  icon?: ReactNode;
  className?: string;
}

const toneStyles: Record<BadgeTone, string> = {
  neutral: 'bg-[#171A26] text-[#94A3B8] border-[#94A3B8]/18',
  purple: 'bg-[#8B5CF6]/12 text-[#C4B5FD] border-[#8B5CF6]/30',
  cyan: 'bg-[#22D3EE]/10 text-[#67E8F9] border-[#22D3EE]/28',
  verified: 'bg-[#10B981]/10 text-[#6EE7B7] border-[#10B981]/28',
  sample: 'bg-[#F59E0B]/10 text-[#FCD34D] border-[#F59E0B]/28',
  expired: 'bg-[#EF4444]/10 text-[#FCA5A5] border-[#EF4444]/28',
};

const defaultIcons: Partial<Record<BadgeTone, ReactNode>> = {
  verified: <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
  sample: <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
  expired: <XCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
  cyan: <Tag className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />,
};

export function StatusBadge({ tone = 'neutral', label, icon, className = '' }: StatusBadgeProps) {
  const resolvedIcon = icon ?? defaultIcons[tone];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 ${toneStyles[tone]} ${className}`}
    >
      {resolvedIcon}
      <span>{label}</span>
    </span>
  );
}

interface MetadataRowProps {
  items: readonly (string | null | undefined)[];
  className?: string;
}

export function MetadataRow({ items, className = '' }: MetadataRowProps) {
  const visibleItems = items.filter((item): item is string => Boolean(item && item.trim()));

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#94A3B8] ${className}`}
    >
      {visibleItems.map((item, idx) => (
        <span key={`${item}-${idx}`} className="inline-flex items-center gap-2">
          {idx > 0 && (
            <span aria-hidden="true" className="text-[#64748B]">
              ·
            </span>
          )}
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}
