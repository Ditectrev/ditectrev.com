import 'hammerjs';
import { AppComponent } from './app.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule,
        HomeModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    }).compileComponents();
  }));

  // JSDOM/Karma: matchMedia may not be supported; stub it for tests.
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jasmine.createSpy('matchMedia').and.returnValue({
        matches: true,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
      writable: true,
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create app', () => {
    expect(app).toBeTruthy();
  });

  it('should have header component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
  });

  it('should have footer component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });
});
