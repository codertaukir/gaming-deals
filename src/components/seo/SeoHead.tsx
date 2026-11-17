import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '@/config/site';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  structuredData?: Record<string, unknown>;
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  structuredData,
}: SeoHeadProps) {
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} – ${SITE_CONFIG.name}`;

  const origin = (
    SITE_CONFIG.baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  ).replace(/\/$/, '');
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const routePath =
    canonicalPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const fullPath =
    canonicalPath && basePath && !routePath.startsWith(basePath)
      ? `${basePath}${routePath}`
      : routePath;
  const canonicalUrl = origin ? `${origin}${fullPath}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}
