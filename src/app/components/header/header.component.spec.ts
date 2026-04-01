import 'hammerjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { MenuItem } from '../../interfaces';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HeaderComponent,
          BrowserAnimationsModule,
          RouterTestingModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  describe('menuItems', () => {
    it('should have menu items defined', () => {
      expect(component.menuItems).toBeDefined();
      expect(Array.isArray(component.menuItems)).toBe(true);
      expect(component.menuItems.length).toBeGreaterThan(0);
    });

    it('should have Home as the first menu item', () => {
      const homeItem = component.menuItems[0];
      expect(homeItem.name).toBe('Home');
      expect(homeItem.icon).toBe('home');
      expect(homeItem.path).toBe('/');
      expect(homeItem.external).toBeUndefined();
    });

    it('should have Services menu item', () => {
      const servicesItem = component.menuItems.find(
        (item) => item.name === 'Services'
      );
      expect(servicesItem).toBeDefined();
      expect(servicesItem?.path).toBe('/services');
      expect(servicesItem?.external).toBeUndefined();
    });

    it('should have external links marked correctly', () => {
      const blogItem = component.menuItems.find(
        (item) => item.name === 'Blog'
      );
      const educationItem = component.menuItems.find(
        (item) => item.name === 'Education'
      );
      const shopItem = component.menuItems.find((item) => item.name === 'Shop');

      expect(blogItem?.external).toBe(true);
      expect(blogItem?.path).toBe('https://blog.ditectrev.com');

      expect(educationItem?.external).toBe(true);
      expect(educationItem?.path).toBe('https://education.ditectrev.com');

      expect(shopItem?.external).toBe(true);
      expect(shopItem?.path).toBe('https://shop.ditectrev.com');
    });

    it('should have all menu items with required properties', () => {
      component.menuItems.forEach((item: MenuItem) => {
        expect(item.name).toBeDefined();
        expect(item.icon).toBeDefined();
        expect(item.path).toBeDefined();
        expect(typeof item.name).toBe('string');
        expect(typeof item.icon).toBe('string');
        expect(typeof item.path).toBe('string');
      });
    });

    it('should have Close as the last menu item', () => {
      const lastItem = component.menuItems[component.menuItems.length - 1];
      expect(lastItem.name).toBe('Close');
      expect(lastItem.icon).toBe('close');
    });
  });

  describe('servicesItems', () => {
    it('should have services items defined', () => {
      expect(component.servicesItems).toBeDefined();
      expect(Array.isArray(component.servicesItems)).toBe(true);
      expect(component.servicesItems.length).toBeGreaterThan(0);
    });

    it('should have Cyber Security service item', () => {
      const cyberSecurityItem = component.servicesItems.find(
        (item) => item.name === 'Cyber Security'
      );
      expect(cyberSecurityItem).toBeDefined();
      expect(cyberSecurityItem?.path).toBe('/services/cyber-security');
      expect(cyberSecurityItem?.icon).toBe('security');
    });

    it('should have Digital Strategy service item', () => {
      const digitalStrategyItem = component.servicesItems.find(
        (item) => item.name === 'Digital Strategy'
      );
      expect(digitalStrategyItem).toBeDefined();
      expect(digitalStrategyItem?.path).toBe('/services/digital-strategy');
      expect(digitalStrategyItem?.icon).toBe('star');
    });

    it('should have Software Development service item', () => {
      const softwareDevItem = component.servicesItems.find(
        (item) => item.name === 'Software Development'
      );
      expect(softwareDevItem).toBeDefined();
      expect(softwareDevItem?.path).toBe('/services/software-development');
      expect(softwareDevItem?.icon).toBe('code');
    });

    it('should have all service items with required properties', () => {
      component.servicesItems.forEach((item: MenuItem) => {
        expect(item.name).toBeDefined();
        expect(item.icon).toBeDefined();
        expect(item.path).toBeDefined();
        expect(typeof item.name).toBe('string');
        expect(typeof item.icon).toBe('string');
        expect(typeof item.path).toBe('string');
        expect(item.path).toContain('/services/');
      });
    });
  });

  describe('onServicesClick', () => {
    it('should prevent default behavior when called', () => {
      const mockEvent = {
        preventDefault: jasmine.createSpy('preventDefault'),
        stopPropagation: jasmine.createSpy('stopPropagation'),
      } as unknown as Event;

      component.onServicesClick(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should handle click events correctly', () => {
      const mockEvent = {
        preventDefault: jasmine.createSpy('preventDefault'),
        stopPropagation: jasmine.createSpy('stopPropagation'),
      } as unknown as Event;

      expect(() => component.onServicesClick(mockEvent)).not.toThrow();
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe('template rendering', () => {
    it('should render the header element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('header');
      expect(header).toBeTruthy();
    });

    it('should render mat-toolbar', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toolbar = compiled.querySelector('mat-toolbar');
      expect(toolbar).toBeTruthy();
    });

    it('should render mat-sidenav-container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const sidenavContainer = compiled.querySelector('mat-sidenav-container');
      expect(sidenavContainer).toBeTruthy();
    });

    it('should render navigation list', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navList = compiled.querySelector('mat-nav-list');
      expect(navList).toBeTruthy();
    });
  });
});
