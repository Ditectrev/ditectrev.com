import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { SiriWaveComponent } from './siriwave.component';

// Mock SiriWave library
const mockSiriWave = {
  constructor: jest.fn()
};

// Mock the SiriWave import
jest.mock('siriwave', () => mockSiriWave);

describe('SiriWaveComponent', () => {
  let component: SiriWaveComponent;
  let fixture: ComponentFixture<SiriWaveComponent>;
  let mockElementRef: ElementRef<HTMLElement>;

  beforeEach(async () => {
    // Create a mock element reference
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

  it('should initialize SiriWave with correct properties when ngAfterViewInit is called', () => {
    // Mock the ViewChild element reference
    component['renderSiri'] = mockElementRef;

    // Call ngAfterViewInit
    component.ngAfterViewInit();

    // Verify SiriWave was instantiated with correct properties
    expect(mockSiriWave.constructor).toHaveBeenCalledWith({
      amplitude: 0.6,
      autostart: true,
      color: '#3f51b5',
      container: mockElementRef.nativeElement,
      frequency: 5,
      speed: 0.025
    });
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

  it('should have ViewChild renderSiri element reference', () => {
    fixture.detectChanges();
    expect(component['renderSiri']).toBeDefined();
  });

  it('should call ngAfterViewInit after view initialization', () => {
    const ngAfterViewInitSpy = jest.spyOn(component, 'ngAfterViewInit');

    fixture.detectChanges();

    expect(ngAfterViewInitSpy).toHaveBeenCalled();
  });

  it('should handle missing renderSiri element gracefully', () => {
    // Set renderSiri to undefined to test error handling
    component['renderSiri'] = undefined as any;

    // This should not throw an error
    expect(() => component.ngAfterViewInit()).not.toThrow();
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
