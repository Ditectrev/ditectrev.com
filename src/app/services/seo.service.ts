import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FaqQuestions } from '@interfaces';
import { FAQ_QUESTIONS } from '../components/faq/faq.component';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  ORGANIZATION_SAME_AS,
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
    this.updateNamedTag('robots', page.robots ?? 'index,follow');
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
    this.setJsonLd(this.buildJsonLd(page, canonical));
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
    page: PageSeo,
    canonical: string
  ): Record<string, unknown>[] {
    const graph: Record<string, unknown>[] = [
      this.organizationNode(),
      this.websiteNode(),
      this.breadcrumbNode(page, canonical),
    ];

    if (page.jsonLdType === 'FAQPage') {
      graph.push(this.faqPageNode(canonical));
    } else if (page.jsonLdType === 'Service') {
      graph.push(this.serviceNode(page, canonical));
    } else if (page.jsonLdType !== 'WebSite') {
      graph.push({
        '@type': page.jsonLdType,
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
        inLanguage: 'en',
      });
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
      logo: `${SITE_ORIGIN}/assets/logo.svg`,
      image: DEFAULT_OG_IMAGE,
      description:
        'Information Technology (IT) services company focused on consulting and online education.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Irysowa 18',
        addressLocality: 'Jelcz-Laskowice',
        postalCode: '55-220',
        addressCountry: 'PL',
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

  private serviceNode(page: PageSeo, canonical: string): Record<string, unknown> {
    return {
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: page.serviceName ?? page.title,
      description: page.description,
      url: canonical,
      provider: { '@id': ORGANIZATION_ID },
      serviceType: page.serviceName,
    };
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
          answer: this.stripHtml(node.answer),
        });
      }
      if (node.questions?.length) {
        const nextPrefix = node.category ?? prefix;
        items.push(...this.flattenFaq(node.questions, nextPrefix));
      }
    }
    return items;
  }

  private stripHtml(value: string): string {
    return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  }
}
