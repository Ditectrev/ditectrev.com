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

  it('should render service detail component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const serviceDetail = compiled.querySelector('app-service-detail');

    expect(serviceDetail).toBeTruthy();
  });

  it('should pass correct data to service detail component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const serviceDetail = compiled.querySelector('app-service-detail');

    expect(serviceDetail).toBeTruthy();
    expect(component.digitalStrategyItems.length).toBe(12);
  });
});
