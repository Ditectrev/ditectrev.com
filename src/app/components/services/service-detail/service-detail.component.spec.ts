import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceDetailComponent } from './service-detail.component';
import { ServiceItem } from '@interfaces';

describe('ServiceDetailComponent', () => {
  let component: ServiceDetailComponent;
  let fixture: ComponentFixture<ServiceDetailComponent>;

  const mockServiceItems: ServiceItem[] = [
    {
      name: 'Test Service 1',
      description: 'Test description 1',
      src: 'assets/test1.png',
    },
    {
      name: 'Test Service 2',
      description: 'Test description 2',
      src: 'assets/test2.png',
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ServiceDetailComponent, BrowserAnimationsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailComponent);
    component = fixture.componentInstance;
    component.title = 'Test Service';
    component.serviceName = 'Test Service';
    component.serviceItems = mockServiceItems;
    fixture.detectChanges();
  });

  it('should create service detail component', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h1');

    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Test Service');
  });

  it('should render services grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const grid = compiled.querySelector('.services-grid');

    expect(grid).toBeTruthy();
  });

  it('should render all service cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('mat-card');

    expect(cards.length).toBe(mockServiceItems.length);
  });

  it('should render service titles correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = Array.from(
      compiled.querySelectorAll('mat-card-title'),
    ).map((title) => title.textContent?.trim());

    const expectedTitles = mockServiceItems.map((item) => item.name);
    expect(titles).toEqual(expectedTitles);
  });

  it('should render service images with correct attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    expect(images.length).toBe(mockServiceItems.length);

    images.forEach((img, index) => {
      const item = mockServiceItems[index];
      expect(img.getAttribute('alt')).toBe(item.name);
      expect(img.getAttribute('src')).toBe(item.src);
      expect(img.getAttribute('title')).toBe(item.name);
    });
  });

  it('should render service descriptions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const descriptions = Array.from(
      compiled.querySelectorAll('mat-card-subtitle'),
    ).map((subtitle) => subtitle.textContent?.trim());

    const expectedDescriptions = mockServiceItems.map(
      (item) => item.description,
    );
    expect(descriptions).toEqual(expectedDescriptions);
  });

  it('should have proper aria labels on section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section[aria-label]');

    expect(section).toBeTruthy();
    expect(section?.getAttribute('aria-label')).toContain(
      'Test Service page to inform',
    );
  });

  it('should have proper aria labels on cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('mat-card[aria-label]');

    expect(cards.length).toBe(mockServiceItems.length);

    cards.forEach((card, index) => {
      const item = mockServiceItems[index];
      expect(card.getAttribute('aria-label')).toContain(item.name);
    });
  });

  it('should have service-card class on all cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.service-card');

    expect(cards.length).toBe(mockServiceItems.length);
  });

  it('should have mat-elevation-z24 class on all cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.mat-elevation-z24');

    expect(cards.length).toBe(mockServiceItems.length);
  });
});

