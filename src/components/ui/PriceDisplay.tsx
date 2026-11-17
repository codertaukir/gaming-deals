import { formatCurrency, type SupportedCurrency } from '@/utils/currency';

interface PriceDisplayProps {
  amount: number | null;
  originalAmount?: number | null;
  currency?: SupportedCurrency;
  isSample?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceDisplay({
  amount,
  originalAmount,
  currency = 'INR',
  isSample = true,
  size = 'md',
  className = '',
}: PriceDisplayProps) {
  if (amount === null) {
    return (
      <span className={`text-xs font-medium text-[#94A3B8] ${className}`}>
        Check retailer for live price
      </span>
    );
  }

  const hasDiscount =
    typeof originalAmount === 'number' && originalAmount > amount && originalAmount > 0;
  const discountPercent = hasDiscount
    ? Math.round(((originalAmount - amount) / originalAmount) * 100)
    : null;

  const sizeClass =
    size === 'lg'
      ? 'text-2xl font-semibold'
      : size === 'sm'
        ? 'text-sm font-semibold'
        : 'text-base font-semibold';

  return (
    <div className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-1 ${className}`}>
      <span className={`font-mono tabular-nums text-[#F8FAFC] ${sizeClass}`}>
        {formatCurrency(amount, currency)}
      </span>

      {hasDiscount && (
        <span className="font-mono tabular-nums text-xs text-[#64748B] line-through">
          {formatCurrency(originalAmount, currency)}
        </span>
      )}

      {discountPercent !== null && discountPercent > 0 && (
        <span className="font-mono tabular-nums text-xs font-medium text-[#22D3EE]">
          -{discountPercent}%
        </span>
      )}

      {isSample && <span className="text-[11px] font-medium text-[#94A3B8]">Sample price</span>}
    </div>
  );
}
