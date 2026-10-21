import 'hammerjs';
import { AppComponent } from './app.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Title } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

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
      ],
      providers: [Title, Meta]
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

describe('AppComponent scroll on route change', () => {
  const routerEvents = new Subject<NavigationEnd>();
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule,
        HomeModule,
        HttpClientTestingModule,
      ],
      providers: [
        Title,
        Meta,
        { provide: Router, useValue: { events: routerEvents } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should scroll the viewport to the top after navigation', () => {
    const scrollToSpy = spyOn(window, 'scrollTo');
    document.documentElement.scrollTop = 800;
    document.body.scrollTop = 800;

    routerEvents.next(new NavigationEnd(1, '/about-us', '/about-us'));

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    expect(document.documentElement.scrollTop).toBe(0);
    expect(document.body.scrollTop).toBe(0);
  });
});
