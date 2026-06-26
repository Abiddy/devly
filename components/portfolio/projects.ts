export type Project = {
  id: string;
  title: string;
  anchorX: number;
  anchorY: number;
  thumbnail: string;
  description?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    id: 'rizq',
    title: 'Rizq Marketplace',
    anchorX: 42.75,
    anchorY: 48.5,
    thumbnail: '/rizq.png',
    url: 'https://www.rizqfreelance.com/',
    description:
      'The first community-based online marketplace for all digital services — connecting talent with opportunity.',
  },
  {
    id: 'paradise',
    title: 'Paradise Worldwide',
    anchorX: 26,
    anchorY: 29.5,
    thumbnail: '/paradise.png',
    url: 'https://www.paradisebikes.co/',
    description:
      'Coastal e-bike rentals in Los Angeles — high-quality electric bikes built for the coast and made for the curious.',
  },
  {
    id: 'freeland',
    title: 'Freeland Family Farms',
    anchorX: 23.33,
    anchorY: 60.88,
    thumbnail: '/freeland.png',
    url: 'https://freelandfarms.vercel.app/',
    description:
      'Farm-fresh dairy and sourdoughs rooted in California, raised on Portuguese tradition — crafted in Woodcrest.',
  },
  {
    id: 'helpdesk',
    title: 'HelpDesk',
    anchorX: 68,
    anchorY: 62.13,
    thumbnail: '/helpdesk.png',
    url: 'https://hd-ochre.vercel.app/',
    description:
      'Building platforms and businesses that empower communities across agriculture, e-commerce, retail, and healthcare.',
  },
  {
    id: 'platter',
    title: 'Platter',
    anchorX: 66.08,
    anchorY: 19.63,
    thumbnail: '/platter.png',
    url: 'https://www.platter.digital/',
    description:
      'AI agents that sell food better than humans — showing customers what your menu is really about.',
  },
  {
    id: 'corridor-flow',
    title: 'Corridor Flow',
    anchorX: 73.92,
    anchorY: 40.75,
    thumbnail: '/corridor-flow.png',
    url: 'https://cafe-production-9588.up.railway.app/',
    description:
      'A family-owned coffee shop and co-working space — bonds over coffee, conversation, and deep work.',
  },
];
