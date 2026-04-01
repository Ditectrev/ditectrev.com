import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SoftwareDevelopmentComponent } from './software-development.component';

describe('SoftwareDevelopmentComponent', () => {
  let component: SoftwareDevelopmentComponent;
  let fixture: ComponentFixture<SoftwareDevelopmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SoftwareDevelopmentComponent, BrowserAnimationsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create software development component', () => {
    expect(component).toBeTruthy();
  });

  it('should have software development items array', () => {
    expect(component.softwareDevelopmentItems).toBeDefined();
    expect(Array.isArray(component.softwareDevelopmentItems)).toBe(true);
    expect(component.softwareDevelopmentItems.length).toBeGreaterThan(0);
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
    expect(component.softwareDevelopmentItems.length).toBe(12);
  });
});
