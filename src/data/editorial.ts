import { MEDIA_ASSETS } from '@/config/assets';
import type { EditorialArticle } from '@/types/marketplace';

export const EDITORIAL_ARTICLES: readonly EditorialArticle[] = [
  {
    id: 'guide-oled-monitors-india',
    slug: 'how-to-choose-240hz-oled-gaming-monitor',
    type: 'guide',
    title: 'How to Choose a 240Hz OLED Gaming Monitor in 2026',
    summary:
      'What to check across panel coatings, HDMI 2.1 console bandwidth, burn-in warranties, and room lighting before buying.',
    category: 'Buying Guide',
    publishedAt: '2026-11-10',
    readTime: '6 min read',
    coverImage: MEDIA_ASSETS.hardwareOledDesk,
    highlights: [
      'Compare WOLED matte vs QD-OLED semi-glossy coatings for bright rooms.',
      'Confirm full-bandwidth HDMI 2.1 ports if connecting a PS5 or Xbox Series X.',
      'Verify regional 3-year burn-in warranty coverage in India and your territory.',
    ],
    sections: [
      {
        heading: 'Panel Coating and Ambient Room Lighting',
        body: 'Matte WOLED displays diffuse harsh overhead lamps and window glare effectively, keeping black levels consistent in sunlit setups. Semi-glossy QD-OLED panels preserve maximum vibrancy in light-controlled rooms, though direct reflections appear purple-tinted under strong daylight.',
      },
      {
        heading: 'HDMI 2.1 Bandwidth and Text Clarity',
        body: 'If you pair a desktop monitor with a PlayStation 5 or Xbox Series X, confirm that HDMI 2.1 supports 4K/120Hz downscaling and VRR. For productivity work alongside gaming, newer subpixel layouts on 27-inch 1440p and 32-inch 4K panels noticeably reduce color fringing on small fonts.',
      },
      {
        heading: 'Care Features and Warranty Terms',
        body: 'Look for automatic pixel-cleaning cycles during standby and an explicit multi-year burn-in warranty backed by an authorized distributor in your region.',
      },
    ],
  },
  {
    id: 'guide-authorized-key-retailers',
    slug: 'verifying-authorized-digital-game-retailers',
    type: 'guide',
    title: 'Authorized Digital Stores vs Grey-Market Key Resellers',
    summary:
      'How Gaming Deals vets publisher-approved digital storefronts so your game library, DLC, and wallet balances remain protected.',
    category: 'Gaming Guide',
    publishedAt: '2026-11-04',
    readTime: '4 min read',
    coverImage: MEDIA_ASSETS.heroGamingSetup,
    highlights: [
      'Authorized stores source keys directly from publishers and official distributors.',
      'Grey-market keys carry chargeback revocation and region-lock risks.',
      'First-party wallet top-ups protect console and mobile accounts.',
    ],
    sections: [
      {
        heading: 'Why Publisher Authorization Matters',
        body: 'Authorized digital storefronts receive activation keys directly from game publishers or regional licensing partners. When a key comes through an official channel, standard refund policies, pre-order bonuses, and regional pricing rules remain intact.',
      },
      {
        heading: 'Spotting Risky Marketplace Listings',
        body: 'Peer-to-peer key auction sites often bundle keys bought with stolen payment methods or region-shifted accounts. If a publisher invalidates fraudulent batches, the key can be removed from your account with zero recourse.',
      },
    ],
  },
  {
    id: 'guide-hall-effect-controllers',
    slug: 'hall-effect-controllers-vs-potentiometer-pads',
    type: 'guide',
    title: 'Buying Guide: Hall-Effect Controllers vs Traditional Analog Sticks',
    summary:
      'Understanding magnetic sensor longevity, polling rates, and wireless compatibility across PC, console, and mobile devices.',
    category: 'Buying Guide',
    publishedAt: '2026-10-24',
    readTime: '5 min read',
    coverImage: MEDIA_ASSETS.hardwareOledDesk,
    highlights: [
      'Magnetic Hall-effect sensors avoid physical carbon-track wear that causes stick drift.',
      'Check whether 2.4GHz USB-C dongles or Bluetooth polling suits your platform.',
      'Look for mechanical microswitch face buttons if you prefer crisp actuation.',
    ],
    sections: [
      {
        heading: 'Eliminating Stick Drift Over Time',
        body: 'Traditional potentiometer thumbsticks rely on physical wiper contacts that wear down after hundreds of hours of play. Hall-effect sticks measure magnetic field changes without physical contact, drastically reducing drift across long-term use.',
      },
      {
        heading: 'Wireless Latency Across Devices',
        body: 'For competitive PC play, prioritize controllers offering a dedicated 2.4GHz low-latency dongle with 500Hz–1000Hz polling. Bluetooth remains convenient for mobile gaming on Android and iOS.',
      },
    ],
  },
  {
    id: 'guide-ps5-nvme-expansion',
    slug: 'ps5-pcie-gen4-ssd-expansion-guide',
    type: 'guide',
    title: 'Gaming Guide: Upgrading PS5 & PC Storage with PCIe Gen4 NVMe SSDs',
    summary:
      'Required sequential read speeds, M.2 2280 dimensions, and why slim heatsinks prevent thermal throttling.',
    category: 'Gaming Guide',
    publishedAt: '2026-10-18',
    readTime: '4 min read',
    coverImage: MEDIA_ASSETS.heroGamingSetup,
    highlights: [
      'Choose PCIe 4.0 x4 M.2 2280 drives rated at 5,500 MB/s or higher for PS5.',
      'Verify heatsink thickness clears the PS5 bay cover.',
      'TLC NAND offers stronger sustained write consistency than QLC alternatives.',
    ],
    sections: [
      {
        heading: 'Thermal Headroom and Bay Clearance',
        body: 'Both PlayStation 5 expansion bays and compact PC builds benefit from low-profile aluminum heatsinks. Avoid oversized aftermarket coolers that prevent the PS5 slot cover from closing flush.',
      },
    ],
  },
  {
    id: 'review-wireless-planar-headset',
    slug: 'pro-wireless-planar-gaming-headset-hands-on',
    type: 'review',
    title: 'Hands-On: Wireless Low-Latency Planar Gaming Headsets',
    summary:
      'Qualitative evaluation covering multi-hour comfort, microphone clarity, and simultaneous 2.4GHz + Bluetooth mixing.',
    category: 'Hardware Review',
    publishedAt: '2026-10-28',
    readTime: '5 min read',
    coverImage: MEDIA_ASSETS.hardwareProHeadset,
    highlights: [
      'Even weight distribution lowers clamp fatigue during 4-hour sessions.',
      'USB-C 2.4GHz dongles simplify switching between PC, PS5, and handhelds.',
      'Planar drivers keep footsteps crisp without bloated bass masking dialogue.',
    ],
    sections: [
      {
        heading: 'Acoustic Separation & Everyday Comfort',
        body: 'Planar magnetic drivers deliver fast transient response, helping competitive players track directional audio cues cleanly while preserving rich mid-range detail in story-driven titles. Memory-foam earpads with breathable fabric reduce heat buildup in warmer climates.',
      },
      {
        heading: 'Trade-offs to Keep in Mind',
        body: 'Closed-back planar headsets weigh slightly more than ultralight plastic esports sets, and passive isolation means you will want sidetone enabled during voice chat.',
      },
    ],
  },
  {
    id: 'review-handheld-oled-portable',
    slug: 'handheld-oled-portable-gaming-impressions',
    type: 'review',
    title: 'Impressions: OLED Portable Gaming Systems for Library Play',
    summary:
      'Evaluating battery efficiency at 15W, 90Hz HDR contrast, and ergonomic grip balance for backlog clearing.',
    category: 'Hardware Review',
    publishedAt: '2026-10-12',
    readTime: '6 min read',
    coverImage: MEDIA_ASSETS.hardwareOledDesk,
    highlights: [
      '90Hz OLED panels make indie and older AAA titles feel remarkably fluid at 45fps.',
      'Dual-fan thermal curves stay quieter than first-generation handhelds.',
      'Battery runtime scales predictably when capping TDP between 10W and 15W.',
    ],
    sections: [
      {
        heading: 'Display Quality & Ergonomics',
        body: 'True black pixels remove backlight bleed during late-night play, while HDR highlights give sci-fi and dark-fantasy games depth that standard IPS handheld screens cannot match.',
      },
      {
        heading: 'Who Should Consider a Portable Rig',
        body: 'If your existing PC library leans toward single-player RPGs, indie action titles, and older AAA releases, a 1TB OLED handheld delivers strong value without buying console-locked copies.',
      },
    ],
  },
  {
    id: 'review-gta-v-enhanced-impressions',
    slug: 'gta-v-enhanced-cross-platform-impressions',
    type: 'review',
    title: 'Editorial Overview: GTA V Enhanced Edition Across PC, PS5 & Xbox',
    summary:
      'Comparing ray-traced lighting modes, SSD load times, and edition value before picking your platform.',
    category: 'Game Impressions',
    publishedAt: '2026-10-05',
    readTime: '5 min read',
    coverImage: MEDIA_ASSETS.gameCoastalCrime,
    highlights: [
      'Performance RT modes strike the cleanest balance between 60fps fluidity and reflections.',
      'PC remains strongest for high-refresh monitors and customizable graphics.',
      'Bundle discounts frequently match base edition pricing during seasonal sales.',
    ],
    sections: [
      {
        heading: 'Cross-Platform Value Today',
        body: 'Fast SSD loading transforms character switching and GTA Online lobby transitions compared to legacy console releases. Buyers deciding between PC and current-gen consoles should match the platform where their regular co-op squad already plays.',
      },
    ],
  },
];
