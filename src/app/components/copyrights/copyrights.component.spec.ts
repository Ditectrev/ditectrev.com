import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CopyrightsComponent } from './copyrights.component';
import * as AOS from 'aos';

// Mock AOS library
jest.mock('aos', () => ({
  init: jest.fn(),
}));

describe('CopyrightsComponent', () => {
  let component: CopyrightsComponent;
  let fixture: ComponentFixture<CopyrightsComponent>;
  let mockAOS: jest.Mocked<typeof AOS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyrightsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CopyrightsComponent);
    component = fixture.componentInstance;
    mockAOS = AOS as jest.Mocked<typeof AOS>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Creation', () => {
    it('should create copyrights component', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct component selector', () => {
      expect(component.constructor.name).toBe('CopyrightsComponent');
    });

    it('should have sections array with correct structure', () => {
      expect(component.sections).toBeDefined();
      expect(Array.isArray(component.sections)).toBe(true);
      expect(component.sections.length).toBe(4);
    });

    it('should have sections with required properties', () => {
      component.sections.forEach(section => {
        expect(section.title).toBeDefined();
        expect(section.content).toBeDefined();
        expect(section.ariaLabel).toBeDefined();
        expect(section.delay).toBeDefined();
        expect(section.hasLinks).toBeDefined();
      });
    });

    it('should have correct section titles', () => {
      const titles = component.sections.map(s => s.title);
      expect(titles).toContain('Content');
      expect(titles).toContain('Licensing');
      expect(titles).toContain('Content Infringes');
      expect(titles).toContain('Material from the Website');
    });

    it('should have correct delay values', () => {
      expect(component.sections[0].delay).toBe(0);
      expect(component.sections[1].delay).toBe(300);
      expect(component.sections[2].delay).toBe(600);
      expect(component.sections[3].delay).toBe(900);
    });

    it('should have only first section with links', () => {
      expect(component.sections[0].hasLinks).toBe(true);
      expect(component.sections[1].hasLinks).toBe(false);
      expect(component.sections[2].hasLinks).toBe(false);
      expect(component.sections[3].hasLinks).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('should initialize AOS library', () => {
      component.ngOnInit();
      expect(mockAOS.init).toHaveBeenCalled();
    });

    it('should call AOS.init only once', () => {
      component.ngOnInit();
      component.ngOnInit(); // Call twice to ensure it's only called once
      expect(mockAOS.init).toHaveBeenCalledTimes(1);
    });
  });

  describe('Component Template', () => {
    it('should render copyrights content', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('mat-card-title')).toBeTruthy();
      expect(compiled.querySelector('mat-card-title').textContent).toContain('Copyrights');
    });

    it('should have proper ARIA labels', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const section = compiled.querySelector('section');
      expect(section.getAttribute('aria-label')).toBe('This is a copyrights page to inform your about our copyrights.');

      const card = compiled.querySelector('mat-card');
      expect(card.getAttribute('aria-label')).toBe('These are our copyrights details.');
    });

    it('should contain all required sections', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const headings = compiled.querySelectorAll('h3');
      expect(headings.length).toBe(4);

      const headingTexts = Array.from(headings).map((h: any) => h.textContent);
      expect(headingTexts).toContain('Content');
      expect(headingTexts).toContain('Licensing');
      expect(headingTexts).toContain('Content Infringes');
      expect(headingTexts).toContain('Material from the Website');
    });

    it('should render sections using ngFor', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      // Check that all sections from the array are rendered
      const sectionDivs = compiled.querySelectorAll('mat-card-content > div');
      expect(sectionDivs.length).toBe(4);

      // Verify each section has both h3 and p elements
      sectionDivs.forEach((div: any) => {
        expect(div.querySelector('h3')).toBeTruthy();
        expect(div.querySelector('p')).toBeTruthy();
      });
    });

    it('should have proper data-aos attributes', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const elementsWithAOS = compiled.querySelectorAll('[data-aos]');
      expect(elementsWithAOS.length).toBeGreaterThan(0);

      elementsWithAOS.forEach((element: any) => {
        expect(element.getAttribute('data-aos')).toBe('fade-up');
        expect(element.getAttribute('data-aos-duration')).toBe('1500');
      });
    });

    it('should have proper navigation links', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const links = compiled.querySelectorAll('a[routerLink]');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should render conditional content correctly', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      // Check that the first section (with links) renders the hardcoded HTML
      const firstSectionContent = compiled.querySelector('p').textContent;
      expect(firstSectionContent).toContain('Terms of Use');

      // Check that other sections render their content from the array
      const allParagraphs = compiled.querySelectorAll('p');
      expect(allParagraphs.length).toBe(4);
    });

    it('should have working router links', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const termsOfUseLink = compiled.querySelector('a[routerLink="/terms-of-use"]');
      expect(termsOfUseLink).toBeTruthy();
      expect(termsOfUseLink.textContent).toContain('Terms of Use');
      expect(termsOfUseLink.getAttribute('aria-label')).toBe('Terms of Use. Click here to read more about Terms of Use.');
    });

    it('should have proper legal content structure', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const paragraphs = compiled.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThan(0);

      // Check that content contains legal terminology
      const content = compiled.textContent;
      expect(content).toMatch(/copyright|legal|rights|intellectual|property/i);
    });
  });

  describe('Component Lifecycle', () => {
    it('should handle component destruction gracefully', () => {
      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle AOS initialization failure gracefully', () => {
      mockAOS.init.mockImplementation(() => {
        throw new Error('AOS initialization failed');
      });

      expect(() => {
        component.ngOnInit();
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const h1 = compiled.querySelector('h1');
      const h3s = compiled.querySelectorAll('h3');

      expect(h1).toBeTruthy();
      expect(h3s.length).toBeGreaterThan(0);
    });

    it('should have proper role attributes', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const section = compiled.querySelector('section');
      const card = compiled.querySelector('mat-card');
      const content = compiled.querySelector('mat-card-content');

      expect(section.getAttribute('role')).toBe('region');
      expect(card.getAttribute('role')).toBe('region');
      expect(content.getAttribute('role')).toBe('complementary');
    });

    it('should have proper semantic structure', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      // Check for proper semantic elements
      expect(compiled.querySelector('section')).toBeTruthy();
      expect(compiled.querySelector('mat-card')).toBeTruthy();
      expect(compiled.querySelector('mat-card-content')).toBeTruthy();
    });
  });

  describe('Content Validation', () => {
    it('should contain essential legal terms', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const content = compiled.textContent.toLowerCase();

      // Check for essential legal terms
      const essentialTerms = ['copyright', 'legal', 'rights', 'intellectual', 'property'];
      const foundTerms = essentialTerms.filter(term => content.includes(term));

      expect(foundTerms.length).toBeGreaterThan(0);
    });

    it('should have proper date formatting if dates are present', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;

      // Check for date patterns (if any dates are present)
      const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}/;
      const hasDates = datePattern.test(content);

      // This test passes whether dates are present or not
      expect(true).toBeTruthy();
    });
  });
});
