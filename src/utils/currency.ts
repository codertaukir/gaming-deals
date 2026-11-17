export type SupportedCurrency = 'INR' | 'USD';

export function formatCurrency(amount: number, currency: SupportedCurrency): string {
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'INR' ? 0 : 2,
  }).format(amount);
}
