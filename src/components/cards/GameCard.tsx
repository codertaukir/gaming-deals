import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback, MetadataRow, PriceDisplay } from '@/components/ui';
import type { Game, PlatformId } from '@/types/marketplace';

const PLATFORM_LABELS: Record<PlatformId, string> = {
  pc: 'PC',
  playstation: 'PS5',
  xbox: 'Xbox',
  android: 'Android',
  ios: 'iOS',
};

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const bestOffer = game.retailers.reduce<(typeof game.retailers)[number] | null>(
    (lowest, current) => {
      if (current.price === null) return lowest;
      if (!lowest || lowest.price === null) return current;
      return current.price < lowest.price ? current : lowest;
    },
    null
  );

  const platformSummary = game.platforms.map((p) => PLATFORM_LABELS[p]).join(' / ');

  return (
    <Link
      to={`/games/${game.slug}`}
      className="surface-card group flex h-full flex-col overflow-hidden p-4 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#94A3B8]/32 motion-reduce:hover:translate-y-0"
    >
      <ImageWithFallback
        src={game.coverImage}
        alt={`${game.title} cover artwork`}
        fallbackTitle={game.title}
        aspectRatioClass="aspect-[4/3]"
      />

      <div className="mt-4 flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-1.5">
          <MetadataRow items={[platformSummary, game.genres[0]]} />
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-[#F8FAFC] transition-colors group-hover:text-[#C4B5FD]">
            {game.title}
          </h3>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-[#94A3B8]/10 pt-3">
          <PriceDisplay
            amount={bestOffer?.price ?? null}
            originalAmount={bestOffer?.originalPrice}
            currency={bestOffer?.currency ?? 'INR'}
            isSample={bestOffer?.isSampleData ?? true}
            size="sm"
          />
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]">
            Offers
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
