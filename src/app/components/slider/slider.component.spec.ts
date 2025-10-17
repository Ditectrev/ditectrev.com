import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SliderComponent } from './slider.component';

// Mock particlesJS
declare global {
  interface Window {
    particlesJS: any;
  }
}

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  let domSanitizer: DomSanitizer;

  beforeEach(async () => {
    // Mock particlesJS
    window.particlesJS = jasmine.createSpy('particlesJS');

    await TestBed.configureTestingModule({
      imports: [SliderComponent],
      providers: [DomSanitizer]
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    domSanitizer = TestBed.inject(DomSanitizer);
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create slider', () => {
      expect(component).toBeTruthy();
    });

    it('should have div with ID=particles-js', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('div#particles-js')).not.toBeNull();
    });

    it('should initialize with correct default values', () => {
      expect(component.subheaderLetters).toEqual([]);
      expect(component.showScrollButton).toBe(true);
      expect(component.isMobile).toBe(false);
    });

    it('should sanitize header HTML', () => {
      expect(component.headerSafeHtml).toBeDefined();
      expect(domSanitizer.bypassSecurityTrustHtml).toBeDefined();
    });
  });

  describe('Mobile Detection', () => {
    it('should detect mobile device when window width <= 600px', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      component.ngOnInit();

      expect(component.isMobile).toBe(true);
    });

    it('should detect desktop device when window width > 600px', () => {
      // Mock window.innerWidth for desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      component.ngOnInit();

      expect(component.isMobile).toBe(false);
    });

    it('should use mobile text on mobile devices', () => {
      // Mock mobile device
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      component.ngOnInit();

      expect(component.subheaderLetters).toContain('\n');
      expect(component.subheaderLetters.join('')).toContain('Online Education and Information');
    });

    it('should use full text on desktop devices', () => {
      // Mock desktop device
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      component.ngOnInit();

      expect(component.subheaderLetters.join('')).toBe('Online Education and Information Technology (IT) Consulting.');
    });
  });

  describe('Text Processing', () => {
    it('should split subheader text into individual letters', () => {
      component.ngOnInit();

      expect(component.subheaderLetters).toBeInstanceOf(Array);
      expect(component.subheaderLetters.length).toBeGreaterThan(0);
      expect(component.subheaderLetters.every(letter => typeof letter === 'string')).toBe(true);
    });

    it('should preserve spaces in text splitting', () => {
      component.ngOnInit();

      const hasSpaces = component.subheaderLetters.includes(' ');
      expect(hasSpaces).toBe(true);
    });
  });

  describe('Particles Integration', () => {
    it('should call invokeParticles method', () => {
      spyOn(component, 'invokeParticles').and.callThrough();
      component.invokeParticles();
      expect(component.invokeParticles).toHaveBeenCalled();
    });

    it('should call particlesJS on initialization', () => {
      component.ngOnInit();
      expect(window.particlesJS).toHaveBeenCalled();
    });

    it('should pass correct parameters to particlesJS', () => {
      component.invokeParticles();
      expect(window.particlesJS).toHaveBeenCalledWith('particles-js', jasmine.any(Object), jasmine.any(Function));
    });
  });

  describe('Scroll Functionality', () => {
    it('should have scrollToNextSection method', () => {
      expect(typeof component.scrollToNextSection).toBe('function');
    });

    it('should call scrollIntoView when gallery element exists', () => {
      // Mock DOM element
      const mockGalleryElement = {
        scrollIntoView: jasmine.createSpy('scrollIntoView')
      };

      spyOn(document, 'querySelector').and.returnValue(mockGalleryElement as any);

      component.scrollToNextSection();

      expect(document.querySelector).toHaveBeenCalledWith('app-gallery');
      expect(mockGalleryElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    it('should not call scrollIntoView when gallery element does not exist', () => {
      spyOn(document, 'querySelector').and.returnValue(null);

      expect(() => component.scrollToNextSection()).not.toThrow();
    });
  });

  describe('Lifecycle Hooks', () => {
    it('should call invokeParticles on ngOnInit', () => {
      spyOn(component, 'invokeParticles');
      component.ngOnInit();
      expect(component.invokeParticles).toHaveBeenCalled();
    });

    it('should set showScrollButton to true after delay in ngAfterViewInit', fakeAsync(() => {
      component.showScrollButton = false;
      component.ngAfterViewInit();

      expect(component.showScrollButton).toBe(false);

      tick(3000);

      expect(component.showScrollButton).toBe(true);
    }));
  });

  describe('Template Integration', () => {
    it('should render h1 with innerHTML binding', () => {
      const compiled = fixture.debugElement.nativeElement;
      const h1Element = compiled.querySelector('h1');
      expect(h1Element).not.toBeNull();
    });

    it('should render h2 with letter spans', () => {
      component.ngOnInit();
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const letterSpans = compiled.querySelectorAll('h2 .letter');
      expect(letterSpans.length).toBeGreaterThan(0);
    });

    it('should render contact button', () => {
      const compiled = fixture.debugElement.nativeElement;
      const contactBtn = compiled.querySelector('.contact-btn');
      expect(contactBtn).not.toBeNull();
      expect(contactBtn.getAttribute('href')).toBe('/contact');
    });

    it('should render scroll down wrapper', () => {
      const compiled = fixture.debugElement.nativeElement;
      const scrollWrapper = compiled.querySelector('.scroll-down-wrapper');
      expect(scrollWrapper).not.toBeNull();
    });

    it('should have line-break class for newline characters on mobile', () => {
      // Mock mobile device
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      component.ngOnInit();
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const lineBreakElements = compiled.querySelectorAll('.letter.line-break');
      expect(lineBreakElements.length).toBeGreaterThan(0);
    });
  });
});
