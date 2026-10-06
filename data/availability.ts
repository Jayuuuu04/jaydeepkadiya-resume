// Everything shown in the "Work With Me" section. Edit here, not in the component.

export const availability = {
  // Shown in the status pill at the top of the card.
  status: 'Available for freelance & contract work',

  // Headline rate. `rate` is rendered large; `rateUnit` sits next to it.
  rate: '$2',
  rateUnit: '/hour',

  pitch:
    'I can work for you with mobile applications, websites, backend, or any type of full-stack solution — from idea to production.',

  // The four capability tiles. `icon` is a lucide-react icon name.
  services: [
    { icon: 'Smartphone', label: 'Mobile Apps' },
    { icon: 'Globe', label: 'Websites' },
    { icon: 'Database', label: 'Backend & APIs' },
    { icon: 'Layers', label: 'Full-Stack Solutions' },
  ] as const,

  // Footer line under the buttons.
  // NOTE: these are taken from the figures already used elsewhere on the site
  // (2+ years, 2 products). Update them to whatever is accurate for you.
  stats: ['2+ Years Experience', '2 Products Shipped', 'Available Worldwide (IST)'],
};
