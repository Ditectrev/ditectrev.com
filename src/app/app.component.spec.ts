import 'hammerjs';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Title } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ standalone: true, template: '' })
class BlankStubComponent {}

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
        RouterTestingModule.withRoutes([
          { path: '', component: BlankStubComponent },
          { path: 'about-us', component: BlankStubComponent },
        ]),
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

  it('should scroll the viewport to the top after navigation', async () => {
    const router = TestBed.inject(Router);
    const scrollToSpy = spyOn(window, 'scrollTo');
    document.documentElement.scrollTop = 800;
    document.body.scrollTop = 800;

    await fixture.ngZone!.run(() => router.navigateByUrl('/about-us'));
    await fixture.whenStable();

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    expect(document.documentElement.scrollTop).toBe(0);
    expect(document.body.scrollTop).toBe(0);
  });
});
