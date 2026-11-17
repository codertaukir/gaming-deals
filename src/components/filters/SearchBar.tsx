import { useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search games, hardware, or deals...',
  autoFocus = false,
  className = '',
  ariaLabel = 'Search Gaming Deals',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
      className={`relative flex w-full items-center ${className}`}
    >
      <Search
        className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#94A3B8]"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        className="min-h-[44px] w-full rounded-[10px] border border-[#94A3B8]/20 bg-[#10121A] pl-10 pr-10 text-sm text-[#F8FAFC] placeholder:text-[#64748B] transition-colors focus:border-[#8B5CF6]/60 focus:outline-none"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          aria-label="Clear search query"
          className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-[6px] text-[#94A3B8] transition-colors hover:bg-[#171A26] hover:text-[#F8FAFC]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
