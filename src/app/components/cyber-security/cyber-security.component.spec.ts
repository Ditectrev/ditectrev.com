import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CyberSecurityComponent } from './cyber-security.component';

describe('CyberSecurityComponent', () => {
  let component: CyberSecurityComponent;
  let fixture: ComponentFixture<CyberSecurityComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CyberSecurityComponent, BrowserAnimationsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create cyber security component', () => {
    expect(component).toBeTruthy();
  });

  it('should have cyber security items array', () => {
    expect(component.cyberSecurityItems).toBeDefined();
    expect(Array.isArray(component.cyberSecurityItems)).toBe(true);
    expect(component.cyberSecurityItems.length).toBeGreaterThan(0);
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
    expect(component.cyberSecurityItems.length).toBe(12);
  });
});
