import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Globe, Layers, ShieldCheck } from 'lucide-react';
import { TrustPageShell } from '@/components/legal/TrustPageShell';
import { Button } from '@/components/ui';
import { ROUTES } from '@/router/routes';

const OPERATING_PILLARS = [
  {
    icon: Compass,
    title: 'Authorized Retailer Focus',
    body: 'Listings prioritize official platform storefronts and authorized distributors—such as Steam, PlayStation Store, Xbox Store, Nintendo eShop, and official hardware partners—avoiding unverified grey-market resellers.',
  },
  {
    icon: Layers,
    title: 'Structured Side-by-Side Research',
    body: 'Rather than burying buyers in aggressive popups or fabricated review scores, Gaming Deals organizes platform coverage, edition breakdowns, and specification tables cleanly.',
  },
  {
    icon: Globe,
    title: 'India (INR) & Global Context',
    body: 'Catalogues highlight Indian Rupee (INR) alongside international USD reference pricing where relevant, including region-locked wallet top-ups and local hardware retail considerations.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Sample Labelling',
    body: 'In this static release, all prices, historical snapshots, and promo codes are clearly tagged as demonstration data so visitors always know when to verify live pricing on the destination store.',
  },
] as const;

export function AboutPage() {
  return (
    <TrustPageShell
      title="About Gaming Deals"
      description="An independent gaming discovery and hardware comparison platform built to help players research offers cleanly before checking out on authorized partner stores."
      canonicalPath={ROUTES.about}
      metadata={['Editorial & Mission', 'Updated November 2026', 'Static Discovery Platform']}
      structuredDataType="AboutPage"
    >
      <section className="surface-card space-y-4 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">What Gaming Deals Does</h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Gaming Deals helps PC, console, and mobile players discover digital games, official gift
          cards, gaming displays, headsets, and accessories in one fast, distraction-free interface.
          We are <strong className="font-medium text-[#F8FAFC]">not</strong> an online checkout
          storefront—when you decide to purchase a game or peripheral, outbound links send you
          directly to the authorized external retailer to complete your transaction safely.
        </p>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Every listing pairs transparent metadata, system requirements or hardware specs, and
          editorial buying context so you can compare editions and verify region compatibility
          without digging through cluttered store pages.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">How We Curate &amp; Compare</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {OPERATING_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="surface-card space-y-2.5 p-5">
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-[#22D3EE]" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-[#F8FAFC]">{pillar.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[#94A3B8]">{pillar.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="surface-card space-y-4 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">Editorial Independence &amp; Data</h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Our reviews and buying guides rely on qualitative strengths, trade-offs, and practical
          compatibility checks—never invented numerical ratings, synthetic aggregate star counts, or
          guaranteed discount promises.
        </p>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Some outbound retailer links may carry affiliate attribution as detailed in our{' '}
          <Link to={ROUTES.affiliateDisclosure} className="font-medium text-[#22D3EE] underline">
            Affiliate Disclosure
          </Link>
          . Partner programs do not dictate which platforms, games, or hardware models appear in our
          comparison tables.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link to={ROUTES.deals}>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Browse Sample Deals
            </Button>
          </Link>
          <Link to={ROUTES.compare}>
            <Button variant="secondary" size="sm">
              Open Comparison Tool
            </Button>
          </Link>
        </div>
      </section>
    </TrustPageShell>
  );
}
