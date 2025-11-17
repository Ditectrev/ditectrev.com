import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DigitalStrategyComponent } from './digital-strategy.component';

describe('DigitalStrategyComponent', () => {
  let component: DigitalStrategyComponent;
  let fixture: ComponentFixture<DigitalStrategyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DigitalStrategyComponent, BrowserAnimationsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create digital strategy component', () => {
    expect(component).toBeTruthy();
  });

  it('should have digital strategy items array', () => {
    expect(component.digitalStrategyItems).toBeDefined();
    expect(Array.isArray(component.digitalStrategyItems)).toBe(true);
    expect(component.digitalStrategyItems.length).toBeGreaterThan(0);
  });

  it('should render page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h1');

    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Digital Strategy');
  });

  it('should render services grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const grid = compiled.querySelector('.services-grid');

    expect(grid).toBeTruthy();
  });

  it('should render all digital strategy service cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('mat-card');

    expect(cards.length).toBe(component.digitalStrategyItems.length);
  });

  it('should render service titles correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = Array.from(
      compiled.querySelectorAll('mat-card-title'),
    ).map((title) => title.textContent?.trim());

    const expectedTitles = component.digitalStrategyItems.map(
      (item) => item.name,
    );
    expect(titles).toEqual(expectedTitles);
  });

  it('should render service images with correct attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    expect(images.length).toBe(component.digitalStrategyItems.length);

    images.forEach((img, index) => {
      const item = component.digitalStrategyItems[index];
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

    const expectedDescriptions = component.digitalStrategyItems.map(
      (item) => item.description,
    );
    expect(descriptions).toEqual(expectedDescriptions);
  });

  it('should have proper aria labels on section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section[aria-label]');

    expect(section).toBeTruthy();
    expect(section?.getAttribute('aria-label')).toContain(
      'Digital Strategy page to inform',
    );
  });

  it('should have proper aria labels on cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('mat-card[aria-label]');

    expect(cards.length).toBe(component.digitalStrategyItems.length);

    cards.forEach((card, index) => {
      const item = component.digitalStrategyItems[index];
      expect(card.getAttribute('aria-label')).toContain(item.name);
    });
  });

  it('should have service-card class on all cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.service-card');

    expect(cards.length).toBe(component.digitalStrategyItems.length);
  });

  it('should have mat-elevation-z24 class on all cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.mat-elevation-z24');

    expect(cards.length).toBe(component.digitalStrategyItems.length);
  });
});
