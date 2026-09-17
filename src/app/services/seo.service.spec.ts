import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService, stripHtml } from './seo.service';
import {
  DEFAULT_OG_IMAGE,
  NOT_FOUND_SEO,
  SITE_ORIGIN,
  canonicalizePath,
  getPageSeo,
  isIndexablePath,
} from '../data/seo.data';

describe('SeoService', () => {
  let service: SeoService;
  let title: Title;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoService, Title, Meta],
    });
    service = TestBed.inject(SeoService);
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should set unique title, description, canonical, and robots for a known page', () => {
    service.updateForUrl('/about-us?utm=test');

    expect(title.getTitle()).toBe('About Us | Ditectrev');
    expect(meta.getTag('name="description"')?.content).toContain(
      'digital transformation'
    );
    expect(meta.getTag('name="robots"')?.content).toBe(
      'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
    );
    expect(meta.getTag('property="og:url"')?.content).toBe(
      `${SITE_ORIGIN}/about-us`
    );
    expect(meta.getTag('property="og:image"')?.content).toBe(DEFAULT_OG_IMAGE);
    expect(meta.getTag('name="twitter:card"')?.content).toBe('summary');

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe(`${SITE_ORIGIN}/about-us`);
  });

  it('should noindex unknown routes and keep a self-referencing canonical', () => {
    service.updateForUrl('/this-page-does-not-exist');

    expect(title.getTitle()).toBe(NOT_FOUND_SEO.title);
    expect(meta.getTag('name="robots"')?.content).toBe('noindex, follow');
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe(`${SITE_ORIGIN}/this-page-does-not-exist`);
  });

  it('should inject Organization, WebSite, and BreadcrumbList JSON-LD', () => {
    service.updateForUrl('/');

    const script = document.getElementById('ditectrev-jsonld');
    expect(script).toBeTruthy();
    const parsed = JSON.parse(script?.textContent ?? '{}');
    const types = parsed['@graph'].map((node: { '@type': unknown }) => node['@type']);
    expect(types).toContain('WebSite');
    expect(JSON.stringify(types)).toContain('Organization');
    expect(types).toContain('BreadcrumbList');
    const org = parsed['@graph'].find(
      (node: { '@id'?: string }) => node['@id'] === `${SITE_ORIGIN}/#organization`
    );
    expect(org?.knowsAbout).toContain('Cyber Security');
    expect(org?.hasOfferCatalog?.itemListElement?.length).toBe(3);
    const homePage = parsed['@graph'].find(
      (node: { '@type': string; mainEntity?: unknown }) =>
        node['@type'] === 'WebPage' && Array.isArray(node.mainEntity)
    );
    expect(homePage.mainEntity.length).toBeGreaterThan(0);
    expect(org?.taxID).toBe('PL9121899240');
    expect(
      document.querySelector('link[rel="describedby"]')?.getAttribute('href')
    ).toBe(`${SITE_ORIGIN}/llms.txt`);
    expect(
      document
        .querySelector('link[rel="alternate"][type="text/markdown"]')
        ?.getAttribute('href')
    ).toBe(`${SITE_ORIGIN}/llms.txt`);
  });

  it('should inject FAQPage JSON-LD with question and answer pairs from existing FAQ copy', () => {
    service.updateForUrl('/faq');

    const script = document.getElementById('ditectrev-jsonld');
    const parsed = JSON.parse(script?.textContent ?? '{}');
    const faq = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'FAQPage'
    );
    expect(faq).toBeDefined();
    expect(faq.mainEntity.length).toBeGreaterThan(5);
    expect(faq.mainEntity[0]['@type']).toBe('Question');
    expect(faq.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
    expect(faq.mainEntity[0].acceptedAnswer.text).not.toContain('<a ');
  });

  it('should inject Service JSON-LD for service detail pages', () => {
    service.updateForUrl('/services/cyber-security');

    const script = document.getElementById('ditectrev-jsonld');
    const parsed = JSON.parse(script?.textContent ?? '{}');
    const serviceNode = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'Service'
    );
    expect(serviceNode?.name).toBe('Cyber Security');
    expect(serviceNode?.url).toBe(`${SITE_ORIGIN}/services/cyber-security`);
    expect(serviceNode?.hasOfferCatalog?.itemListElement?.length).toBe(12);
  });

  it('should inject HowTo JSON-LD for the methodology page', () => {
    service.updateForUrl('/methodology');

    const script = document.getElementById('ditectrev-jsonld');
    const parsed = JSON.parse(script?.textContent ?? '{}');
    const howTo = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'HowTo'
    );
    expect(howTo?.name).toBe('Ditectrev project methodology');
    expect(howTo?.step?.length).toBe(5);
    expect(howTo?.step[0].name).toBe('Business Analysis');
  });

  it('should inject DefinedTermSet JSON-LD for the glossary page', () => {
    service.updateForUrl('/glossary');

    const script = document.getElementById('ditectrev-jsonld');
    const parsed = JSON.parse(script?.textContent ?? '{}');
    const termSet = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'DefinedTermSet'
    );
    expect(termSet?.hasDefinedTerm?.length).toBeGreaterThan(20);
    expect(termSet.hasDefinedTerm[0]['@type']).toBe('DefinedTerm');
    expect(termSet.hasDefinedTerm[0].name).toBeTruthy();
  });

  it('should inject ItemList JSON-LD for the services overview', () => {
    service.updateForUrl('/services');

    const script = document.getElementById('ditectrev-jsonld');
    const parsed = JSON.parse(script?.textContent ?? '{}');
    const list = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'ItemList'
    );
    expect(list?.itemListElement?.length).toBe(3);
    expect(list.itemListElement[0].name).toBe('Cyber Security');
  });
});

describe('stripHtml', () => {
  it('should keep link text and remove tags from FAQ-style markup', () => {
    expect(
      stripHtml(
        'Please check our <a href="/privacy-and-security">Privacy & Security policy</a>.'
      )
    ).toBe('Please check our Privacy & Security policy.');
  });

  it('should not leave nested or unclosed script tags', () => {
    expect(stripHtml('<<script>script>alert(1)</script>')).not.toMatch(/<script/i);
    expect(stripHtml('<scr<script>ipt>alert(1)</script>')).not.toMatch(/<script/i);
    expect(stripHtml('<script')).not.toMatch(/<script/i);
    expect(stripHtml('<script')).toBe('script');
  });
});

describe('seo data helpers', () => {
  it('should canonicalize trailing slashes and query strings', () => {
    expect(canonicalizePath('/about-us/?x=1')).toBe('/about-us');
    expect(canonicalizePath('/')).toBe('/');
  });

  it('should treat listed routes as indexable and others as not', () => {
    expect(isIndexablePath('/services')).toBe(true);
    expect(isIndexablePath('/missing')).toBe(false);
    expect(getPageSeo('/missing').robots).toContain('noindex');
  });
});
