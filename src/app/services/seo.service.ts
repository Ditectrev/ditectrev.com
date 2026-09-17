import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FaqQuestions } from '@interfaces';
import { FAQ_QUESTIONS } from '../components/faq/faq.component';
import { GLOSSARY_DATA } from '../data/glossary.data';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  ENTITY_FAQS,
  INDEX_ROBOTS,
  LLMS_TXT_URL,
  METHODOLOGY_STEPS,
  ORGANIZATION_SAME_AS,
  SERVICE_OFFERINGS,
  SITE_NAME,
  SITE_ORIGIN,
  absoluteUrl,
  canonicalizePath,
  getPageSeo,
  type PageSeo,
} from '../data/seo.data';

const JSON_LD_SCRIPT_ID = 'ditectrev-jsonld';
const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  public updateForUrl(rawUrl: string): void {
    const path = canonicalizePath(rawUrl);
    const page = getPageSeo(path);
    const canonical = absoluteUrl(path === '/' ? '/' : path);

    this.title.setTitle(page.title);
    this.updateNamedTag('description', page.description);
    this.updateNamedTag('robots', page.robots ?? INDEX_ROBOTS);
    this.updateNamedTag('author', 'Ditectrev, contact@ditectrev.com');

    this.updatePropertyTag('og:type', 'website');
    this.updatePropertyTag('og:site_name', SITE_NAME);
    this.updatePropertyTag('og:locale', 'en_US');
    this.updatePropertyTag('og:title', page.title);
    this.updatePropertyTag('og:description', page.description);
    this.updatePropertyTag('og:url', canonical);
    this.updatePropertyTag('og:image', DEFAULT_OG_IMAGE);
    this.updatePropertyTag('og:image:alt', DEFAULT_OG_IMAGE_ALT);
    this.updatePropertyTag('og:image:type', 'image/png');
    this.updatePropertyTag('og:image:width', '512');
    this.updatePropertyTag('og:image:height', '512');

    this.updateNamedTag('twitter:card', 'summary');
    this.updateNamedTag('twitter:site', '@ditectrev');
    this.updateNamedTag('twitter:creator', '@ddanielecki');
    this.updateNamedTag('twitter:title', page.title);
    this.updateNamedTag('twitter:description', page.description);
    this.updateNamedTag('twitter:image', DEFAULT_OG_IMAGE);
    this.updateNamedTag('twitter:image:alt', DEFAULT_OG_IMAGE_ALT);

    this.setCanonical(canonical);
    this.setLlmDiscoveryLinks();
    this.setJsonLd(this.buildJsonLd(path, page, canonical));
  }

  private updateNamedTag(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private updatePropertyTag(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(href: string): void {
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setLlmDiscoveryLinks(): void {
    this.upsertHeadLink(
      'link[rel="describedby"]',
      { rel: 'describedby', href: LLMS_TXT_URL, type: 'text/markdown' }
    );
    this.upsertHeadLink(
      'link[rel="alternate"][type="text/markdown"]',
      {
        rel: 'alternate',
        href: LLMS_TXT_URL,
        type: 'text/markdown',
        title: 'LLM-friendly site summary',
      }
    );
  }

  private upsertHeadLink(
    selector: string,
    attributes: Record<string, string>
  ): void {
    let link = this.document.querySelector(selector) as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      this.document.head.appendChild(link);
    }
    for (const [name, value] of Object.entries(attributes)) {
      link.setAttribute(name, value);
    }
  }

  private setJsonLd(graph: Record<string, unknown>[]): void {
    const payload = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
    let script = this.document.getElementById(JSON_LD_SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_SCRIPT_ID;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = payload;
  }

  private buildJsonLd(
    path: string,
    page: PageSeo,
    canonical: string
  ): Record<string, unknown>[] {
    const graph: Record<string, unknown>[] = [
      this.organizationNode(),
      this.websiteNode(),
      this.breadcrumbNode(page, canonical),
    ];

    if (page.jsonLdType === 'WebSite') {
      graph.push(this.homeWebPageNode(canonical));
    } else if (page.jsonLdType === 'FAQPage') {
      graph.push(this.faqPageNode(canonical));
    } else if (page.jsonLdType === 'Service') {
      graph.push(this.serviceNode(path, page, canonical));
    } else if (path === '/methodology') {
      graph.push(this.methodologyHowToNode(canonical));
      graph.push(this.webPageNode(page, canonical));
    } else if (path === '/glossary') {
      graph.push(this.glossaryTermSetNode(canonical));
      graph.push(this.webPageNode(page, canonical));
    } else if (path === '/services') {
      graph.push(this.servicesItemListNode(canonical));
      graph.push(this.webPageNode(page, canonical));
    } else {
      graph.push(this.webPageNode(page, canonical));
    }

    return graph;
  }

  private organizationNode(): Record<string, unknown> {
    return {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      legalName: 'IBStructure Daniel Danielecki',
      url: `${SITE_ORIGIN}/`,
      email: 'contact@ditectrev.com',
      telephone: '+48 732 280 741',
      foundingDate: '2017',
      taxID: 'PL9121899240',
      founder: {
        '@type': 'Person',
        name: 'Daniel Danielecki',
      },
      logo: `${SITE_ORIGIN}/assets/logo.svg`,
      image: DEFAULT_OG_IMAGE,
      description:
        'Information Technology (IT) services company focused on consulting and online education.',
      knowsAbout: [
        'Cyber Security',
        'Digital Strategy',
        'Software Development',
        'Online Education',
        'IT Consulting',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Irysowa 18',
        addressLocality: 'Jelcz-Laskowice',
        postalCode: '55-220',
        addressCountry: 'PL',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contact@ditectrev.com',
        telephone: '+48 732 280 741',
        contactType: 'customer service',
        availableLanguage: 'English',
        url: `${SITE_ORIGIN}/contact`,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Ditectrev services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cyber Security',
              url: `${SITE_ORIGIN}/services/cyber-security`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Digital Strategy',
              url: `${SITE_ORIGIN}/services/digital-strategy`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Software Development',
              url: `${SITE_ORIGIN}/services/software-development`,
            },
          },
        ],
      },
      sameAs: [...ORGANIZATION_SAME_AS],
    };
  }

  private websiteNode(): Record<string, unknown> {
    return {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_ORIGIN}/`,
      name: SITE_NAME,
      inLanguage: 'en',
      publisher: { '@id': ORGANIZATION_ID },
    };
  }

  private breadcrumbNode(page: PageSeo, canonical: string): Record<string, unknown> {
    const itemListElement = page.breadcrumbs
      .filter((crumb) => crumb.path !== '')
      .map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      }));

    return {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement,
    };
  }

  private webPageNode(page: PageSeo, canonical: string): Record<string, unknown> {
    return {
      '@type': page.jsonLdType,
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORGANIZATION_ID },
      inLanguage: 'en',
    };
  }

  private homeWebPageNode(canonical: string): Record<string, unknown> {
    return {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: 'Ditectrev – Online Education and IT Consulting',
      description:
        'Information Technology (IT) services company focused on consulting and online education in cyber security, digital strategy, and software development.',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORGANIZATION_ID },
      inLanguage: 'en',
      mainEntity: ENTITY_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }

  private glossaryTermSetNode(canonical: string): Record<string, unknown> {
    return {
      '@type': 'DefinedTermSet',
      '@id': `${canonical}#glossary`,
      name: 'Ditectrev glossary',
      description:
        "Tables of terms used in Ditectrev's cyber security, digital strategy, and software development services.",
      url: canonical,
      inLanguage: 'en',
      hasDefinedTerm: GLOSSARY_DATA.map((term) => ({
        '@type': 'DefinedTerm',
        name: term.name,
        description: term.description,
        inDefinedTermSet: `${canonical}#glossary`,
      })),
    };
  }

  private servicesItemListNode(canonical: string): Record<string, unknown> {
    const services = [
      { name: 'Cyber Security', path: '/services/cyber-security' },
      { name: 'Digital Strategy', path: '/services/digital-strategy' },
      { name: 'Software Development', path: '/services/software-development' },
    ];
    return {
      '@type': 'ItemList',
      '@id': `${canonical}#services`,
      name: 'Ditectrev services',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.name,
        url: absoluteUrl(service.path),
      })),
    };
  }

  private methodologyHowToNode(canonical: string): Record<string, unknown> {
    return {
      '@type': 'HowTo',
      '@id': `${canonical}#howto`,
      name: 'Ditectrev project methodology',
      description:
        'Modern delivery approach. Ditectrev works with Scrum, delivering small parts often and involving you at every project stage.',
      url: canonical,
      inLanguage: 'en',
      step: METHODOLOGY_STEPS.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    };
  }

  private faqPageNode(canonical: string): Record<string, unknown> {
    return {
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      url: canonical,
      name: 'FAQ',
      isPartOf: { '@id': WEBSITE_ID },
      inLanguage: 'en',
      mainEntity: this.flattenFaq(FAQ_QUESTIONS).map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }

  private serviceNode(
    path: string,
    page: PageSeo,
    canonical: string
  ): Record<string, unknown> {
    const offerings = SERVICE_OFFERINGS[path] ?? [];
    const node: Record<string, unknown> = {
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: page.serviceName ?? page.title,
      description: page.description,
      url: canonical,
      provider: { '@id': ORGANIZATION_ID },
      serviceType: page.serviceName,
    };
    if (offerings.length > 0) {
      node['hasOfferCatalog'] = {
        '@type': 'OfferCatalog',
        name: page.serviceName,
        itemListElement: offerings.map((name, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name,
          },
        })),
      };
    }
    return node;
  }

  private flattenFaq(
    nodes: FaqQuestions[],
    prefix = ''
  ): { question: string; answer: string }[] {
    const items: { question: string; answer: string }[] = [];
    for (const node of nodes) {
      if (node.question && node.answer) {
        items.push({
          question: prefix ? `${prefix}: ${node.question}` : node.question,
          answer: stripHtml(node.answer),
        });
      }
      if (node.questions?.length) {
        const nextPrefix = node.category ?? prefix;
        items.push(...this.flattenFaq(node.questions, nextPrefix));
      }
    }
    return items;
  }
}

/**
 * Convert HTML to plain text for JSON-LD.
 * Repeats tag stripping until the string is stable so nested markup such as
 * `<<script>script>` cannot survive a single pass, then removes any leftover
 * angle brackets so an unclosed `<script` cannot remain.
 */
export function stripHtml(value: string): string {
  let sanitized = value;
  let previous = '';
  while (sanitized !== previous) {
    previous = sanitized;
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }
  sanitized = sanitized.replace(/[<>]/g, '');
  return sanitized.replace(/\s+/g, ' ').trim();
}
