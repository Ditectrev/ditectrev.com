import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterTestingModule } from '@angular/router/testing';
import { TestimonialsComponent } from './testimonials.component';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          TestimonialsComponent,
          BrowserAnimationsModule,
          CarouselModule,
          RouterTestingModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create testimonials component', () => {
    expect(component).toBeTruthy();
  });

  it('should expose carousel options with autoplay enabled', () => {
    expect(component.customOptions.autoplay).toBe(true);
    expect(component.customOptions.items).toBe(1);
    expect(component.customOptions.loop).toBe(true);
  });

  it('should have owl-carousel-o component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('owl-carousel-o')).not.toBeNull();
  });

  it('should render testimonials heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h2');

    expect(heading).not.toBeNull();
    expect(heading?.textContent).toContain('Success stories.');
  });

  it('should render all testimonial slides', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const renderedTestimonialNames = Array.from(
      compiled.querySelectorAll('.testimonial-name')
    ).map((element) => element.textContent?.trim());

    const expectedNames = component.slidesItems.map((item) => item.name);
    expect(renderedTestimonialNames).toEqual(expectedNames);
  });
});
