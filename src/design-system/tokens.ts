export const DESIGN_TOKENS = {
  colors: {
    background: '#08090D',
    surface: '#10121A',
    elevated: '#171A26',
    purple: '#8B5CF6',
    purpleHover: '#7C3AED',
    cyan: '#22D3EE',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    verified: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
  typography: {
    displayFont: 'Outfit',
    bodyFont: 'DM Sans',
    monoFont: 'JetBrains Mono',
    heroClamp: 'clamp(2.25rem, 4vw, 3.75rem)',
  },
  spacing: {
    containerMax: '1280px',
    sectionY: 'clamp(3.5rem, 6vw, 5.5rem)',
    cardPadding: '1.25rem',
    gridGap: '1.5rem',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px',
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1440,
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
