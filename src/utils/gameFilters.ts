import type { Game, PlatformId } from '@/types/marketplace';

export type GameSortOption = 'featured' | 'discount-desc' | 'price-asc' | 'price-desc' | 'newest';

export interface GameFilterCriteria {
  query: string;
  platformScope: PlatformId[];
  genre: string;
  dealsOnly: boolean;
  sortBy: GameSortOption;
}

export function getLowestGamePrice(game: Game): number | null {
  let lowest: number | null = null;
  for (const offer of game.retailers) {
    if (offer.price === null) continue;
    if (lowest === null || offer.price < lowest) {
      lowest = offer.price;
    }
  }
  return lowest;
}

export function getMaxGameDiscountPercent(game: Game): number {
  let maxDiscount = 0;
  for (const offer of game.retailers) {
    if (
      offer.price !== null &&
      typeof offer.originalPrice === 'number' &&
      offer.originalPrice > offer.price &&
      offer.originalPrice > 0
    ) {
      const pct = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
      if (pct > maxDiscount) {
        maxDiscount = pct;
      }
    }
  }
  return maxDiscount;
}

export function getUniqueGenres(games: readonly Game[]): string[] {
  const genreSet = new Set<string>();
  for (const game of games) {
    for (const genre of game.genres) {
      genreSet.add(genre);
    }
  }
  return Array.from(genreSet).sort((a, b) => a.localeCompare(b));
}

export function filterAndSortGames(games: readonly Game[], criteria: GameFilterCriteria): Game[] {
  const normalizedQuery = criteria.query.trim().toLowerCase();

  const filtered = games.filter((game) => {
    const matchesPlatform =
      criteria.platformScope.length === 0 ||
      game.platforms.some((platform) => criteria.platformScope.includes(platform));

    if (!matchesPlatform) return false;

    if (criteria.genre !== 'all' && !game.genres.includes(criteria.genre)) {
      return false;
    }

    if (criteria.dealsOnly && getMaxGameDiscountPercent(game) === 0) {
      return false;
    }

    if (normalizedQuery) {
      const haystack =
        `${game.title} ${game.publisher} ${game.genres.join(' ')} ${game.description}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (criteria.sortBy) {
      case 'discount-desc':
        return getMaxGameDiscountPercent(b) - getMaxGameDiscountPercent(a);
      case 'price-asc': {
        const priceA = getLowestGamePrice(a) ?? Number.MAX_SAFE_INTEGER;
        const priceB = getLowestGamePrice(b) ?? Number.MAX_SAFE_INTEGER;
        return priceA - priceB;
      }
      case 'price-desc': {
        const priceA = getLowestGamePrice(a) ?? -1;
        const priceB = getLowestGamePrice(b) ?? -1;
        return priceB - priceA;
      }
      case 'newest':
        return b.releaseDate.localeCompare(a.releaseDate);
      case 'featured':
      default: {
        const scoreA = (a.featured ? 2 : 0) + (a.trending ? 1 : 0);
        const scoreB = (b.featured ? 2 : 0) + (b.trending ? 1 : 0);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return b.releaseDate.localeCompare(a.releaseDate);
      }
    }
  });
}
