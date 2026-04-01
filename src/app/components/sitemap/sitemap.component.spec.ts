import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SitemapComponent } from './sitemap.component';

describe('SitemapComponent', () => {
  let component: SitemapComponent;
  let fixture: ComponentFixture<SitemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SitemapComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create sitemap component', () => {
    expect(component).toBeTruthy();
  });

  describe('Company Items', () => {
    it('should have correct company items', () => {
      expect(component.companyItems).toBeDefined();
      expect(component.companyItems.length).toBe(4);

      const expectedItems = [
        { name: 'Home', path: '/' },
        { name: 'Methodology', path: '/methodology' },
        { name: 'About us', path: '/about-us' },
        { name: 'Contact', path: '/contact' }
      ];

      expect(component.companyItems).toEqual(expectedItems);
    });

    it('should have valid paths for company items', () => {
      component.companyItems.forEach(item => {
        expect(item.path).toMatch(/^\/[\w-]*$/);
        expect(item.name).toBeTruthy();
        expect(item.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Services Items', () => {
    it('should have correct services items', () => {
      expect(component.servicesItems).toBeDefined();
      expect(component.servicesItems.length).toBe(3);

      const expectedItems = [
        { name: 'Cyber Security', path: '/services/cyber-security' },
        { name: 'Digital Strategy', path: '/services/digital-strategy' },
        { name: 'Software Development', path: '/services/software-development' }
      ];

      expect(component.servicesItems).toEqual(expectedItems);
    });

    it('should have valid paths for services items', () => {
      component.servicesItems.forEach(item => {
        expect(item.path).toMatch(/^\/[\w-]+(?:\/[\w-]+)+$/);
        expect(item.name).toBeTruthy();
        expect(item.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Information Items', () => {
    it('should have correct information items', () => {
      expect(component.informationItems).toBeDefined();
      expect(component.informationItems.length).toBe(3);

      const expectedItems = [
        { name: 'FAQ', path: '/faq' },
        { name: 'Glossary', path: '/glossary' },
        { name: 'Partnerships', path: '/partnerships' }
      ];

      expect(component.informationItems).toEqual(expectedItems);
    });

    it('should have valid paths for information items', () => {
      component.informationItems.forEach(item => {
        expect(item.path).toMatch(/^\/[\w-]*$/);
        expect(item.name).toBeTruthy();
        expect(item.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Resources Items', () => {
    it('should have correct resources items', () => {
      expect(component.resourcesItems).toBeDefined();
      expect(component.resourcesItems.length).toBe(4);

      const expectedItems = [
        { name: 'Copyrights', path: '/copyrights' },
        { name: 'Privacy & Security', path: '/privacy-and-security' },
        { name: 'Sitemap', path: '/sitemap' },
        { name: 'Terms of Use', path: '/terms-of-use' }
      ];

      expect(component.resourcesItems).toEqual(expectedItems);
    });

    it('should have valid paths for resources items', () => {
      component.resourcesItems.forEach(item => {
        expect(item.path).toMatch(/^\/[\w-]*$/);
        expect(item.name).toBeTruthy();
        expect(item.name.length).toBeGreaterThan(0);
      });
    });

    it('should handle ampersand in Privacy & Security correctly', () => {
      const privacyItem = component.resourcesItems.find(item => item.name.includes('Privacy'));
      expect(privacyItem).toBeDefined();
      expect(privacyItem!.name).toBe('Privacy & Security');
    });
  });

  describe('Component Structure', () => {
    it('should have all required data arrays', () => {
      expect(component.companyItems).toBeDefined();
      expect(component.servicesItems).toBeDefined();
      expect(component.informationItems).toBeDefined();
      expect(component.resourcesItems).toBeDefined();
    });

    it('should have total of 14 navigation items', () => {
      const totalItems = component.companyItems.length +
                        component.servicesItems.length +
                        component.informationItems.length +
                        component.resourcesItems.length;
      expect(totalItems).toBe(14);
    });
  });

  describe('Data Integrity', () => {
    it('should not have duplicate paths', () => {
      const allPaths = [
        ...component.companyItems.map(item => item.path),
        ...component.servicesItems.map(item => item.path),
        ...component.informationItems.map(item => item.path),
        ...component.resourcesItems.map(item => item.path)
      ];

      const uniquePaths = new Set(allPaths);
      expect(uniquePaths.size).toBe(allPaths.length);
    });

    it('should not have duplicate names', () => {
      const allNames = [
        ...component.companyItems.map(item => item.name),
        ...component.servicesItems.map(item => item.name),
        ...component.informationItems.map(item => item.name),
        ...component.resourcesItems.map(item => item.name)
      ];

      const uniqueNames = new Set(allNames);
      expect(uniqueNames.size).toBe(allNames.length);
    });
  });
});
