import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyAndSecurityComponent } from './privacy-and-security.component';
import * as AOS from 'aos';

// Mock AOS library
jest.mock('aos', () => ({
  init: jest.fn(),
}));

describe('PrivacyAndSecurityComponent', () => {
  let component: PrivacyAndSecurityComponent;
  let fixture: ComponentFixture<PrivacyAndSecurityComponent>;
  let mockAOS: jest.Mocked<typeof AOS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyAndSecurityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyAndSecurityComponent);
    component = fixture.componentInstance;
    mockAOS = AOS as jest.Mocked<typeof AOS>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Creation', () => {
    it('should create privacy and security component', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct component selector', () => {
      expect(component.constructor.name).toBe('PrivacyAndSecurityComponent');
    });

    it('should have sections array with correct structure', () => {
      expect(component.sections).toBeDefined();
      expect(Array.isArray(component.sections)).toBe(true);
      expect(component.sections.length).toBe(10);
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
      expect(titles).toContain('Information Scope');
      expect(titles).toContain('Data Collection');
      expect(titles).toContain('Cookies');
      expect(titles).toContain('Third Party Software and Services');
      expect(titles).toContain('Legal Rights');
      expect(titles).toContain('Children');
      expect(titles).toContain('Anonymization');
      expect(titles).toContain('Data Protection Officer');
      expect(titles).toContain('Data Breaches');
      expect(titles).toContain('Opposition to Marketing Campaigns');
    });

    it('should have correct delay values', () => {
      expect(component.sections[0].delay).toBe(0);
      expect(component.sections[1].delay).toBe(300);
      expect(component.sections[2].delay).toBe(600);
      expect(component.sections[3].delay).toBe(900);
      expect(component.sections[4].delay).toBe(1200);
      expect(component.sections[5].delay).toBe(1500);
      expect(component.sections[6].delay).toBe(1800);
      expect(component.sections[7].delay).toBe(2100);
      expect(component.sections[8].delay).toBe(2400);
      expect(component.sections[9].delay).toBe(2700);
    });

    it('should have correct sections with links', () => {
      expect(component.sections[0].hasLinks).toBe(true); // Information Scope
      expect(component.sections[1].hasLinks).toBe(true); // Data Collection
      expect(component.sections[2].hasLinks).toBe(true); // Cookies
      expect(component.sections[3].hasLinks).toBe(false); // Third Party Software
      expect(component.sections[4].hasLinks).toBe(false); // Legal Rights
      expect(component.sections[5].hasLinks).toBe(false); // Children
      expect(component.sections[6].hasLinks).toBe(false); // Anonymization
      expect(component.sections[7].hasLinks).toBe(true); // Data Protection Officer
      expect(component.sections[8].hasLinks).toBe(false); // Data Breaches
      expect(component.sections[9].hasLinks).toBe(false); // Opposition to Marketing
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
    it('should render privacy and security content', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('mat-card-title')).toBeTruthy();
      expect(compiled.querySelector('mat-card-title').textContent).toContain('Privacy & Security');
    });

    it('should have proper ARIA labels', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const section = compiled.querySelector('section');
      expect(section.getAttribute('aria-label')).toBe('This is a privacy and security page to inform you about our privacy practices and data protection measures.');
    });

    it('should contain all required sections', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const headings = compiled.querySelectorAll('h3');
      expect(headings.length).toBe(10);
    });

    it('should have proper data-aos attributes', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const elementsWithAOS = compiled.querySelectorAll('[data-aos]');
      expect(elementsWithAOS.length).toBeGreaterThan(0);

      elementsWithAOS.forEach((element: any) => {
        expect(element.getAttribute('data-aos')).toBeDefined();
        expect(element.getAttribute('data-aos-duration')).toBeDefined();
      });
    });

    it('should render sections using ngFor', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const sections = compiled.querySelectorAll('div[role="complementary"] > div');
      expect(sections.length).toBe(10);
    });

    it('should have working router links', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const routerLinks = compiled.querySelectorAll('a[routerLink]');
      expect(routerLinks.length).toBeGreaterThan(0);

      routerLinks.forEach((link: any) => {
        expect(link.getAttribute('routerLink')).toBeDefined();
      });
    });

    it('should have working email and phone links', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const emailLinks = compiled.querySelectorAll('a[href^="mailto:"]');
      const phoneLinks = compiled.querySelectorAll('a[href^="tel:"]');

      expect(emailLinks.length).toBeGreaterThan(0);
      expect(phoneLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Component Lifecycle', () => {
    it('should handle component destruction gracefully', () => {
      fixture.destroy();
      expect(fixture.componentInstance).toBeFalsy();
    });
  });

  describe('Error Handling', () => {
    it('should handle AOS initialization failure gracefully', () => {
      mockAOS.init.mockImplementation(() => {
        throw new Error('AOS initialization failed');
      });

      expect(() => component.ngOnInit()).toThrow('AOS initialization failed');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const headings = compiled.querySelectorAll('h1, h2, h3');
      expect(headings.length).toBeGreaterThan(0);

      headings.forEach((heading: any) => {
        expect(heading.getAttribute('role')).toBe('heading');
      });
    });

    it('should have proper role attributes', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const section = compiled.querySelector('section');
      const card = compiled.querySelector('mat-card');
      const content = compiled.querySelector('[role="complementary"]');

      expect(section.getAttribute('role')).toBeDefined();
      expect(card.getAttribute('role')).toBe('region');
      expect(content.getAttribute('role')).toBe('complementary');
    });

    it('should have proper semantic structure', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('section')).toBeTruthy();
      expect(compiled.querySelector('mat-card')).toBeTruthy();
      expect(compiled.querySelector('mat-card-title')).toBeTruthy();
      expect(compiled.querySelector('mat-card-content')).toBeTruthy();
    });
  });

  describe('Content Validation', () => {
    it('should contain essential legal terms', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      const content = compiled.textContent;
      expect(content).toContain('Privacy');
      expect(content).toContain('Security');
      expect(content).toContain('Data');
      expect(content).toContain('Rights');
    });

    it('should have proper conditional rendering for sections with links', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      // Check that sections with hasLinks: true have conditional content
      const sectionsWithLinks = component.sections.filter(s => s.hasLinks);
      expect(sectionsWithLinks.length).toBe(3);

      // Check that sections with hasLinks: false show regular content
      const sectionsWithoutLinks = component.sections.filter(s => !s.hasLinks);
      expect(sectionsWithoutLinks.length).toBe(2);
    });
  });
});
