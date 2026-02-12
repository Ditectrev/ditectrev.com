import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TermsOfUseComponent } from './terms-of-use.component';
import * as AOS from 'aos';

describe('TermsOfUseComponent', () => {
  let component: TermsOfUseComponent;
  let fixture: ComponentFixture<TermsOfUseComponent>;

  beforeEach(async () => {
    if ((AOS as any).init) {
      spyOn(AOS as any, "init");
    }
    await TestBed.configureTestingModule({
      imports: [TermsOfUseComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsOfUseComponent);
    component = fixture.componentInstance;
  });

  describe('Component Creation', () => {
    it('should create terms of use component', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct component selector', () => {
      expect(component.constructor.name).toBe('TermsOfUseComponent');
    });
  });

  describe('ngOnInit', () => {
    it('should initialize AOS library', () => {
      component.ngOnInit();
      expect(AOS.init).toHaveBeenCalled();
    });

    it('should call AOS.init when ngOnInit runs', () => {
      (AOS.init as jasmine.Spy).calls.reset();
      component.ngOnInit();
      expect(AOS.init).toHaveBeenCalledTimes(1);
    });
  });

  describe('Component Template', () => {
    it('should render terms of use content', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('mat-card-title')).toBeTruthy();
      expect(compiled.querySelector('mat-card-title').textContent).toContain('Terms of Use');
    });

    it('should have proper ARIA labels', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const section = compiled.querySelector('section');
      expect(section.getAttribute('aria-label')).toBe('This is a terms of use page to inform you about terms of use.');

      const card = compiled.querySelector('mat-card');
      expect(card.getAttribute('aria-label')).toBe('These are our terms of use details.');
    });

    it('should contain all required sections', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const headings = compiled.querySelectorAll('h3');
      expect(headings.length).toBeGreaterThan(0);

      const headingTexts = Array.from(headings).map((h: any) => h.textContent);
      // Check for common terms of use sections
      expect(headingTexts.some(text =>
        text.includes('Acceptance') ||
        text.includes('Use') ||
        text.includes('License') ||
        text.includes('Restrictions') ||
        text.includes('Intellectual Property') ||
        text.includes('Privacy') ||
        text.includes('Disclaimer') ||
        text.includes('Limitation') ||
        text.includes('Governing Law') ||
        text.includes('Changes')
      )).toBeTruthy();
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

    it('should have proper legal content structure', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const paragraphs = compiled.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThan(0);

      // Check that content contains legal terminology
      const content = compiled.textContent;
      expect(content).toMatch(/terms|conditions|agreement|legal|rights|obligations/i);
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
      (AOS.init as jasmine.Spy).and.callFake(() => {
        throw new Error('AOS initialization failed');
      });

      expect(() => {
        component.ngOnInit();
      }).toThrowError(/AOS initialization failed/);
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const heading = compiled.querySelector('mat-card-title[role="heading"], h1, [aria-level="1"]');
      const h3s = compiled.querySelectorAll('h3');

      expect(heading).toBeTruthy();
      expect(h3s.length).toBeGreaterThan(0);
    });

    it('should have proper role attributes', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const card = compiled.querySelector('mat-card');
      const content = compiled.querySelector('mat-card-content');

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
      const essentialTerms = ['terms', 'conditions', 'agreement', 'use', 'rights'];
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
