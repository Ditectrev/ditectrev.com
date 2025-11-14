import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ServicesComponent,
          BrowserAnimationsModule,
          RouterTestingModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create services component', () => {
    expect(component).toBeTruthy();
  });

  it('should render three service sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = compiled.querySelectorAll('.service-section');

    expect(sections.length).toBe(3);
  });

  it('should render three service cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('mat-card');

    expect(cards.length).toBe(3);
  });

  it('should render service titles correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = Array.from(
      compiled.querySelectorAll('mat-card-title'),
    ).map((title) => title.textContent?.trim());

    expect(titles).toEqual([
      'Cyber Security',
      'Digital Strategy',
      'Software Development',
    ]);
  });

  it('should render call-to-action buttons for each service', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button')).map(
      (btn) => btn.textContent?.trim(),
    );

    expect(buttons).toEqual(['Read more', 'Read more', 'Read more']);
  });

  it('should have correct router links on buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button[routerLink]');

    expect(buttons.length).toBe(3);
    expect(buttons[0].getAttribute('routerLink')).toBe('/cyber-security');
    expect(buttons[1].getAttribute('routerLink')).toBe('/digital-strategy');
    expect(buttons[2].getAttribute('routerLink')).toBe('/software-development');
  });

  it('should render torus knot animation element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const torusKnot = compiled.querySelector(
      'span[role="img"][aria-label*="Cyber Security"]',
    );

    expect(torusKnot).toBeTruthy();
  });

  it('should render geo projection canvas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const geoProjection = compiled.querySelector('#renderGeoProjection');

    expect(geoProjection).toBeTruthy();
    expect(geoProjection?.tagName.toLowerCase()).toBe('canvas');
  });

  it('should render digital strategy chart canvas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const chartCanvas = compiled.querySelector('canvas[baseChart]');

    expect(chartCanvas).toBeTruthy();
    expect(chartCanvas?.getAttribute('aria-label')).toContain('Digital Strategy');
  });

  it('should have chart wrapper for digital strategy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const chartWrapper = compiled.querySelector('.service-chart-wrapper');

    expect(chartWrapper).toBeTruthy();
  });

  it('should have reverse class on middle section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = compiled.querySelectorAll('.service-section');
    const middleSection = sections[1];

    expect(middleSection.classList.contains('service-section--reverse')).toBe(
      true,
    );
  });

  it('should configure line chart data correctly', () => {
    expect(component.lineChartData).toBeDefined();
    expect(component.lineChartData.labels).toEqual([
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
    ]);
    expect(component.lineChartData.datasets).toHaveLength(1);
    expect(component.lineChartData.datasets[0].data).toEqual([
      0, 33, 34, 66, 67, 100,
    ]);
  });

  it('should configure line chart options correctly', () => {
    expect(component.lineChartOptions).toBeDefined();
    expect(component.lineChartOptions?.responsive).toBe(true);
    expect(component.lineChartOptions?.maintainAspectRatio).toBe(false);
    expect(component.lineChartOptions?.scales?.['x']?.display).toBe(false);
    expect(component.lineChartOptions?.scales?.['y']?.display).toBe(false);
    expect(component.lineChartOptions?.plugins?.legend?.display).toBe(false);
    expect(component.lineChartOptions?.plugins?.tooltip?.enabled).toBe(false);
  });

  it('should set line chart type to line', () => {
    expect(component.lineChartType).toBe('line');
  });

  it('should render services wrapper', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const wrapper = compiled.querySelector('.services-wrapper');

    expect(wrapper).toBeTruthy();
  });

  it('should have proper aria labels on service sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = compiled.querySelectorAll('section[aria-label]');

    expect(sections.length).toBe(3);
    sections.forEach((section) => {
      expect(
        section.getAttribute('aria-label'),
      ).toContain('services page to inform');
    });
  });
});
