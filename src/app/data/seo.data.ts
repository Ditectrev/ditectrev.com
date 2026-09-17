export const SITE_ORIGIN = 'https://ditectrev.com';
export const SITE_NAME = 'Ditectrev';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/icons/icon-512x512.png`;
export const DEFAULT_OG_IMAGE_ALT = "Ditectrev's logo";

export const INDEXABLE_PATHS: readonly string[] = [
  '/',
  '/about-us',
  '/contact',
  '/methodology',
  '/services',
  '/faq',
  '/glossary',
  '/sitemap',
  '/copyrights',
  '/terms-of-use',
  '/privacy-and-security',
  '/partnerships',
  '/services/cyber-security',
  '/services/digital-strategy',
  '/services/software-development',
];

export type PageJsonLdType =
  | 'WebSite'
  | 'AboutPage'
  | 'ContactPage'
  | 'FAQPage'
  | 'Service'
  | 'WebPage';

export interface SeoBreadcrumb {
  name: string;
  path: string;
}

export interface PageSeo {
  title: string;
  description: string;
  robots?: string;
  jsonLdType: PageJsonLdType;
  breadcrumbs: SeoBreadcrumb[];
  serviceName?: string;
}

const homeCrumb: SeoBreadcrumb = { name: 'Home', path: '/' };
const servicesCrumb: SeoBreadcrumb = { name: 'Services', path: '/services' };

export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'Ditectrev – Online Education and IT Consulting',
    description:
      'Information Technology (IT) services company focused on consulting and online education in cyber security, digital strategy, and software development.',
    jsonLdType: 'WebSite',
    breadcrumbs: [homeCrumb],
  },
  '/about-us': {
    title: 'About Us | Ditectrev',
    description:
      'Your digital transformation and innovation partner. Creativity and a privacy-preserving approach in cyber security, digital strategy, and software development.',
    jsonLdType: 'AboutPage',
    breadcrumbs: [homeCrumb, { name: 'About us', path: '/about-us' }],
  },
  '/contact': {
    title: 'Contact | Ditectrev',
    description:
      'We are partners, not contractors. Contact Ditectrev about online education and IT consulting.',
    jsonLdType: 'ContactPage',
    breadcrumbs: [homeCrumb, { name: 'Contact', path: '/contact' }],
  },
  '/methodology': {
    title: 'Methodology | Ditectrev',
    description:
      'Modern delivery approach. Ditectrev works with Scrum, delivering small parts often and involving you at every project stage.',
    jsonLdType: 'WebPage',
    breadcrumbs: [homeCrumb, { name: 'Methodology', path: '/methodology' }],
  },
  '/services': {
    title: 'Services | Ditectrev',
    description:
      'Ditectrev services in cyber security, digital strategy, and software development, from data-driven software to end-to-end solutions.',
    jsonLdType: 'WebPage',
    breadcrumbs: [homeCrumb, servicesCrumb],
  },
  '/faq': {
    title: 'FAQ | Ditectrev',
    description:
      "Answers to common questions about Ditectrev's company, cooperation, education, and IT services.",
    jsonLdType: 'FAQPage',
    breadcrumbs: [homeCrumb, { name: 'FAQ', path: '/faq' }],
  },
  '/glossary': {
    title: 'Glossary | Ditectrev',
    description:
      "Tables of terms used in Ditectrev's cyber security, digital strategy, and software development services.",
    jsonLdType: 'WebPage',
    breadcrumbs: [homeCrumb, { name: 'Glossary', path: '/glossary' }],
  },
  '/sitemap': {
    title: 'Sitemap | Ditectrev',
    description:
      'A directory of pages on ditectrev.com, including company, services, information, and resources.',
    jsonLdType: 'WebPage',
    breadcrumbs: [homeCrumb, { name: 'Sitemap', path: '/sitemap' }],
  },
  '/copyrights': {
    title: 'Copyrights | Ditectrev',
    description:
      'Copyright information for Ditectrev content, including what you may and may not copy from our website and assets.',
    jsonLdType: 'WebPage',
    breadcrumbs: [homeCrumb, { name: 'Copyrights', path: '/copyrights' }],
  },
  '/terms-of-use': {
    title: 'Terms of Use | Ditectrev',
    description:
      "Essential terms that apply to using Ditectrev's website and assets.",
    jsonLdType: 'WebPage',
    breadcrumbs: [homeCrumb, { name: 'Terms of Use', path: '/terms-of-use' }],
  },
  '/privacy-and-security': {
    title: 'Privacy & Security | Ditectrev',
    description:
      'How Ditectrev protects your privacy and uses personal data when you use our website.',
    jsonLdType: 'WebPage',
    breadcrumbs: [
      homeCrumb,
      { name: 'Privacy & Security', path: '/privacy-and-security' },
    ],
  },
  '/partnerships': {
    title: 'Partnerships | Ditectrev',
    description:
      'Partner with Ditectrev as a creative agency, freelancer, or software house.',
    jsonLdType: 'WebPage',
    breadcrumbs: [homeCrumb, { name: 'Partnerships', path: '/partnerships' }],
  },
  '/services/cyber-security': {
    title: 'Cyber Security Services | Ditectrev',
    description:
      'Data-driven and future-proof software together with cyber security: compliance audits, ethical hacking, secure programming, and more.',
    jsonLdType: 'Service',
    serviceName: 'Cyber Security',
    breadcrumbs: [
      homeCrumb,
      servicesCrumb,
      { name: 'Cyber Security', path: '/services/cyber-security' },
    ],
  },
  '/services/digital-strategy': {
    title: 'Digital Strategy Services | Ditectrev',
    description:
      'Best-in-class development with frictionless digital experience: business development, digital marketing, product design, and more.',
    jsonLdType: 'Service',
    serviceName: 'Digital Strategy',
    breadcrumbs: [
      homeCrumb,
      servicesCrumb,
      { name: 'Digital Strategy', path: '/services/digital-strategy' },
    ],
  },
  '/services/software-development': {
    title: 'Software Development Services | Ditectrev',
    description:
      'End-to-end solutions with scaled architecture and smooth development: web, mobile, cloud, eCommerce, and more.',
    jsonLdType: 'Service',
    serviceName: 'Software Development',
    breadcrumbs: [
      homeCrumb,
      servicesCrumb,
      { name: 'Software Development', path: '/services/software-development' },
    ],
  },
};

export const NOT_FOUND_SEO: PageSeo = {
  title: 'Page Not Found | Ditectrev',
  description:
    'The page you requested was not found. Return to the Ditectrev homepage to continue.',
  robots: 'noindex, follow',
  jsonLdType: 'WebPage',
  breadcrumbs: [homeCrumb, { name: 'Page not found', path: '' }],
};

export const ORGANIZATION_SAME_AS: readonly string[] = [
  'https://discord.com/invite/RFjtXKfJy3',
  'https://www.facebook.com/ditectrev',
  'https://github.com/ditectrev',
  'https://www.instagram.com/ditectrev',
  'https://www.linkedin.com/company/ditectrev',
  'https://medium.com/@ditectrev',
  'https://x.com/ditectrev',
  'https://www.youtube.com/@Ditectrev',
];

export function canonicalizePath(rawPath: string): string {
  const withoutQuery = rawPath.split('?')[0].split('#')[0];
  if (!withoutQuery || withoutQuery === '/') {
    return '/';
  }
  return withoutQuery.length > 1 && withoutQuery.endsWith('/')
    ? withoutQuery.slice(0, -1)
    : withoutQuery;
}

export function absoluteUrl(path: string): string {
  if (!path || path === '/') {
    return `${SITE_ORIGIN}/`;
  }
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

export function isIndexablePath(rawPath: string): boolean {
  return INDEXABLE_PATHS.includes(canonicalizePath(rawPath));
}

export function getPageSeo(rawPath: string): PageSeo {
  return PAGE_SEO[canonicalizePath(rawPath)] ?? NOT_FOUND_SEO;
}
