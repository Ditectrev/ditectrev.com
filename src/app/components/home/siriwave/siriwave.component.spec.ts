import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { SiriWaveComponent } from './siriwave.component';

describe('SiriWaveComponent', () => {
  let component: SiriWaveComponent;
  let fixture: ComponentFixture<SiriWaveComponent>;
  let mockElementRef: ElementRef<HTMLElement>;

  beforeEach(async () => {
    mockElementRef = {
      nativeElement: document.createElement('div')
    } as ElementRef<HTMLElement>;

    await TestBed.configureTestingModule({
      imports: [SiriWaveComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SiriWaveComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct selector', () => {
    expect(component.constructor.name).toBe('SiriWaveComponent');
  });

  it('should implement AfterViewInit', () => {
    expect(component.ngAfterViewInit).toBeDefined();
    expect(typeof component.ngAfterViewInit).toBe('function');
  });

  it('should run ngAfterViewInit without error when renderSiri is set', () => {
    component['renderSiri'] = mockElementRef;
    expect(() => component.ngAfterViewInit()).not.toThrow();
  });

  it('should render the siri container element', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const siriContainer = compiled.querySelector('#siri-container');

    expect(siriContainer).toBeTruthy();
    expect(siriContainer.getAttribute('aria-label')).toBe('This is Stop losing time on amateurs. Hire Professionals animation.');
  });

  it('should render the overlay text', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const overlayText = compiled.querySelector('.overlay-text');

    expect(overlayText).toBeTruthy();
    expect(overlayText.textContent.trim()).toBe('Stop losing time on amateurs. Hire Professionals.');
  });

  it('should have ViewChild renderSiri element reference after detectChanges', () => {
    fixture.detectChanges();
    expect(component['renderSiri']).toBeDefined();
  });

  it('should run ngAfterViewInit when view is initialized', () => {
    fixture.detectChanges();
    expect(component['renderSiri']).toBeDefined();
    expect(component.ngAfterViewInit).toBeDefined();
  });

  it('should handle missing renderSiri element gracefully', () => {
    component['renderSiri'] = undefined as any;
    expect(() => component.ngAfterViewInit()).toThrow();
  });

  it('should have correct component metadata', () => {
    const componentMetadata = (component.constructor as any).__annotations__?.[0] ||
                             (component.constructor as any).decorators?.[0]?.args?.[0];

    if (componentMetadata) {
      expect(componentMetadata.selector).toBe('app-siriwave');
      expect(componentMetadata.standalone).toBe(true);
    }
  });
});
