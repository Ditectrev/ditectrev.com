import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiriWaveComponent } from './siriwave.component';

describe('SiriWaveComponent', () => {
  let component: SiriWaveComponent;
  let fixture: ComponentFixture<SiriWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiriWaveComponent],
      imports: [BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiriWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create breaking section component', () => {
    expect(component).toBeTruthy();
  });

  it('should have owl-carousel-o component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('owl-carousel-o')).not.toBeNull();
  });
});
