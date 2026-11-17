import { RotateCcw } from 'lucide-react';
import { Dropdown, type DropdownOption } from '@/components/ui';
import { SearchBar } from '@/components/filters/SearchBar';

export interface FilterTabOption {
  value: string;
  label: string;
}

interface CatalogueToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  searchPlaceholder?: string;
  genres: readonly string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  sortOptions: readonly DropdownOption[];
  sortValue: string;
  onSortChange: (value: string) => void;
  dealsOnly: boolean;
  onToggleDealsOnly: () => void;
  platformTabs?: readonly FilterTabOption[];
  selectedPlatformTab?: string;
  onPlatformTabChange?: (value: string) => void;
  totalResults: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function CatalogueToolbar({
  query,
  onQueryChange,
  searchPlaceholder = 'Search titles, genres, or publishers...',
  genres,
  selectedGenre,
  onGenreChange,
  sortOptions,
  sortValue,
  onSortChange,
  dealsOnly,
  onToggleDealsOnly,
  platformTabs,
  selectedPlatformTab,
  onPlatformTabChange,
  totalResults,
  hasActiveFilters,
  onResetFilters,
}: CatalogueToolbarProps) {
  return (
    <div className="surface-card space-y-4 p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          value={query}
          onChange={onQueryChange}
          placeholder={searchPlaceholder}
          className="lg:max-w-md"
        />

        <div className="flex flex-wrap items-center gap-3">
          {platformTabs && platformTabs.length > 0 && onPlatformTabChange && (
            <div
              role="tablist"
              aria-label="Platform filter"
              className="inline-flex rounded-[10px] border border-[#94A3B8]/15 bg-[#08090D] p-1"
            >
              {platformTabs.map((tab) => {
                const isActive = selectedPlatformTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onPlatformTabChange(tab.value)}
                    className={`min-h-[36px] rounded-[7px] px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-[#171A26] text-[#F8FAFC]'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          <button
            type="button"
            aria-pressed={dealsOnly}
            onClick={onToggleDealsOnly}
            className={`min-h-[42px] rounded-[10px] border px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
              dealsOnly
                ? 'border-[#22D3EE]/50 bg-[#22D3EE]/12 text-[#67E8F9]'
                : 'border-[#94A3B8]/20 bg-[#08090D] text-[#94A3B8] hover:border-[#94A3B8]/38 hover:text-[#F8FAFC]'
            }`}
          >
            Discounted only
          </button>

          <Dropdown
            options={sortOptions}
            value={sortValue}
            onChange={onSortChange}
            ariaLabel="Sort results"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 border-t border-[#94A3B8]/12 pt-3.5 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onGenreChange('all')}
            className={`min-h-[34px] rounded-[8px] px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
              selectedGenre === 'all'
                ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                : 'bg-[#171A26]/70 text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            All genres
          </button>
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <button
                key={genre}
                type="button"
                onClick={() => onGenreChange(genre)}
                className={`min-h-[34px] rounded-[8px] px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                    : 'bg-[#171A26]/70 text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-xs tabular-nums text-[#94A3B8]">
            {totalResults} {totalResults === 1 ? 'title' : 'titles'}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-xs font-medium text-[#22D3EE] transition-colors hover:bg-[#171A26]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
