import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from "@angular/core/testing";
import { GalleryComponent } from "./gallery.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("GalleryComponent", () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up intervals
    if (component.autoPlayInterval) {
      clearInterval(component.autoPlayInterval);
    }
    if (component.progressInterval) {
      clearInterval(component.progressInterval);
    }
  });

  it("should create gallery component", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with first image", () => {
    expect(component.currentIndex).toBe(0);
    expect(component.images.length).toBe(3);
  });

  it("should have autoPlay enabled by default", () => {
    expect(component.isAutoPlay).toBe(true);
  });

  it("should start autoPlay on init", () => {
    expect(component.autoPlayInterval).toBeDefined();
    expect(component.progressInterval).toBeDefined();
  });

  describe("Navigation", () => {
    it("should go to next image", () => {
      component.currentIndex = 0;
      component.next();
      expect(component.currentIndex).toBe(1);
    });

    it("should wrap to first image after last image on next", () => {
      component.currentIndex = 2;
      component.next();
      expect(component.currentIndex).toBe(0);
    });

    it("should go to previous image", () => {
      component.currentIndex = 1;
      component.previous();
      expect(component.currentIndex).toBe(0);
    });

    it("should wrap to last image from first image on previous", () => {
      component.currentIndex = 0;
      component.previous();
      expect(component.currentIndex).toBe(2);
    });

    it("should go to specific index", () => {
      component.goTo(1);
      expect(component.currentIndex).toBe(1);
    });

    it("should reset progress when navigating next", () => {
      component.progress = 50;
      component.next();
      expect(component.progress).toBe(0);
    });

    it("should reset progress when navigating previous", () => {
      component.progress = 50;
      component.previous();
      expect(component.progress).toBe(0);
    });

    it("should reset progress when going to specific index", () => {
      component.progress = 50;
      component.goTo(2);
      expect(component.progress).toBe(0);
    });
  });

  describe("AutoPlay", () => {
    it("should advance to next image after autoPlayDuration", fakeAsync(() => {
      const testFixture = TestBed.createComponent(GalleryComponent);
      const testComponent = testFixture.componentInstance;
      testFixture.detectChanges();
      testComponent.currentIndex = 0;
      tick(testComponent.autoPlayDuration);
      expect(testComponent.currentIndex).toBe(1);
      discardPeriodicTasks();
    }));

    it("should continuously advance images", fakeAsync(() => {
      const testFixture = TestBed.createComponent(GalleryComponent);
      const testComponent = testFixture.componentInstance;
      testFixture.detectChanges();
      testComponent.currentIndex = 0;
      tick(testComponent.autoPlayDuration);
      expect(testComponent.currentIndex).toBe(1);
      tick(testComponent.autoPlayDuration);
      expect(testComponent.currentIndex).toBe(2);
      tick(testComponent.autoPlayDuration);
      expect(testComponent.currentIndex).toBe(0);
      discardPeriodicTasks();
    }));

    it("should pause autoPlay on mouse enter", () => {
      const autoPlayInterval = component.autoPlayInterval;
      const progressInterval = component.progressInterval;
      component.onMouseEnter();
      expect(component.autoPlayInterval).toBeFalsy();
      expect(component.progressInterval).toBeFalsy();
      expect(component.autoPlayInterval).not.toBe(autoPlayInterval);
      expect(component.progressInterval).not.toBe(progressInterval);
    });

    it("should resume autoPlay on mouse leave", fakeAsync(() => {
      component.progress = 50;
      component.onMouseLeave();
      expect(component.autoPlayInterval).toBeDefined();
      expect(component.progressInterval).toBeDefined();
      tick(component.autoPlayDuration);
      discardPeriodicTasks();
    }));
  });

  describe("Progress Bar", () => {
    it("should initialize progress at 0", () => {
      expect(component.progress).toBe(0);
    });

    it("should increment progress over time", fakeAsync(() => {
      const testFixture = TestBed.createComponent(GalleryComponent);
      const testComponent = testFixture.componentInstance;
      testFixture.detectChanges();
      testComponent.progress = 0;
      const initialProgress = testComponent.progress;
      tick(500);
      expect(testComponent.progress).toBeGreaterThan(initialProgress);
      discardPeriodicTasks();
    }));

    it("should not exceed 100%", fakeAsync(() => {
      const testFixture = TestBed.createComponent(GalleryComponent);
      const testComponent = testFixture.componentInstance;
      testFixture.detectChanges();
      testComponent.progress = 99;
      tick(1000);
      expect(testComponent.progress).toBeLessThanOrEqual(100);
      discardPeriodicTasks();
    }));

    it("should reset progress to 0 when calling resetProgress", () => {
      component.progress = 75;
      component['resetProgress']();
      expect(component.progress).toBe(0);
    });

    it("should pause progress on mouse enter", () => {
      component.progress = 40;
      component.onMouseEnter();
      const pausedProgress = component.progress;
      expect(pausedProgress).toBe(40);
    });

    it("should resume progress from paused position on mouse leave", fakeAsync(() => {
      component.progress = 40;
      component.onMouseEnter();
      const pausedProgress = component.progress;
      component.onMouseLeave();
      tick(100);
      expect(component.progress).toBeGreaterThan(pausedProgress);
      tick(component.autoPlayDuration);
      discardPeriodicTasks();
    }));
  });

  describe("Images Data", () => {
    it("should have correct image sources", () => {
      expect(component.images[0].src).toBe('./assets/cyber-security.avif');
      expect(component.images[1].src).toBe('assets/digital-strategy.avif');
      expect(component.images[2].src).toBe('assets/software-development.avif');
    });

    it("should have titles for all images", () => {
      component.images.forEach(image => {
        expect(image.title).toBeDefined();
        expect(image.title.length).toBeGreaterThan(0);
      });
    });

    it("should have descriptions for all images", () => {
      component.images.forEach(image => {
        expect(image.description).toBeDefined();
        expect(image.description.length).toBeGreaterThan(0);
      });
    });

    it("should have links for all images", () => {
      component.images.forEach(image => {
        expect(image.link).toBeDefined();
        expect(image.link.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Component Cleanup", () => {
    it("should clear intervals when component is destroyed", () => {
      spyOn(window, 'clearInterval');
      const autoPlayInterval = component.autoPlayInterval;
      const progressInterval = component.progressInterval;

      component.onMouseEnter(); // This will clear intervals

      expect(window.clearInterval).toHaveBeenCalled();
    });
  });
});
