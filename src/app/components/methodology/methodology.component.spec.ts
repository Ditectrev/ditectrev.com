import 'hammerjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MethodologyComponent } from './methodology.component';

describe('MethodologyComponent', () => {
  let component: MethodologyComponent;
  let fixture: ComponentFixture<MethodologyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MethodologyComponent, BrowserAnimationsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create methodology component', () => {
    expect(component).toBeTruthy();
  });

  describe('stageItems', () => {
    it('should have stage items defined', () => {
      expect(component.stageItems).toBeDefined();
      expect(Array.isArray(component.stageItems)).toBe(true);
      expect(component.stageItems.length).toBeGreaterThan(0);
    });

    it('should have 5 stages', () => {
      expect(component.stageItems.length).toBe(5);
    });

    it('should have Business Analysis as the first stage', () => {
      const firstStage = component.stageItems[0];
      expect(firstStage[0].name).toBe('Business Analysis');
      expect(firstStage[0].stageCount).toBe('First');
      expect(firstStage[0].previousStageCount).toBe('');
      expect(firstStage[0].nextStageCount).toBe('Second');
    });

    it('should have Research as the second stage', () => {
      const secondStage = component.stageItems[1];
      expect(secondStage[0].name).toBe('Research');
      expect(secondStage[0].stageCount).toBe('Second');
      expect(secondStage[0].previousStageCount).toBe('First');
      expect(secondStage[0].nextStageCount).toBe('Third');
    });

    it('should have Technical Assessment as the third stage', () => {
      const thirdStage = component.stageItems[2];
      expect(thirdStage[0].name).toBe('Technical Assessment');
      expect(thirdStage[0].stageCount).toBe('Third');
      expect(thirdStage[0].previousStageCount).toBe('Second');
      expect(thirdStage[0].nextStageCount).toBe('Fourth');
    });

    it('should have Realization as the fourth stage', () => {
      const fourthStage = component.stageItems[3];
      expect(fourthStage[0].name).toBe('Realization');
      expect(fourthStage[0].stageCount).toBe('Fourth');
      expect(fourthStage[0].previousStageCount).toBe('Third');
      expect(fourthStage[0].nextStageCount).toBe('Fifth');
    });

    it('should have Further Cooperation as the last stage', () => {
      const lastStage = component.stageItems[component.stageItems.length - 1];
      expect(lastStage[0].name).toBe('Further Cooperation');
      expect(lastStage[0].stageCount).toBe('Fifth');
      expect(lastStage[0].previousStageCount).toBe('Fourth');
      expect(lastStage[0].nextStageCount).toBe('');
    });

    it('should have all stages with required properties', () => {
      component.stageItems.forEach((stage) => {
        expect(Array.isArray(stage)).toBe(true);
        expect(stage.length).toBeGreaterThan(0);

        stage.forEach((item) => {
          expect(item.name).toBeDefined();
          expect(typeof item.name).toBe('string');
          expect(item.stageCount).toBeDefined();
          expect(typeof item.stageCount).toBe('string');
          expect(item.stageDescription).toBeDefined();
          expect(typeof item.stageDescription).toBe('string');
          expect(item.stepCount).toBeDefined();
          expect(typeof item.stepCount).toBe('string');
          expect(item.stepDescription).toBeDefined();
          expect(typeof item.stepDescription).toBe('string');
          expect(item.stepIcon).toBeDefined();
          expect(typeof item.stepIcon).toBe('string');
          expect(item.nextStageCount).toBeDefined();
          expect(typeof item.nextStageCount).toBe('string');
          expect(item.previousStageCount).toBeDefined();
          expect(typeof item.previousStageCount).toBe('string');
        });
      });
    });

    it('should have consistent stage names within each stage array', () => {
      component.stageItems.forEach((stage) => {
        const stageName = stage[0].name;
        stage.forEach((item) => {
          expect(item.name).toBe(stageName);
        });
      });
    });

    it('should have consistent stage counts within each stage array', () => {
      component.stageItems.forEach((stage) => {
        const stageCount = stage[0].stageCount;
        const nextStageCount = stage[0].nextStageCount;
        const previousStageCount = stage[0].previousStageCount;

        stage.forEach((item) => {
          expect(item.stageCount).toBe(stageCount);
          expect(item.nextStageCount).toBe(nextStageCount);
          expect(item.previousStageCount).toBe(previousStageCount);
        });
      });
    });

    it('should have unique step counts within each stage', () => {
      component.stageItems.forEach((stage) => {
        const stepCounts = stage.map((item) => item.stepCount);
        const uniqueStepCounts = [...new Set(stepCounts)];
        expect(uniqueStepCounts.length).toBe(stepCounts.length);
      });
    });

    it('should have Business Analysis stage with 2 steps', () => {
      const businessAnalysisStage = component.stageItems[0];
      expect(businessAnalysisStage.length).toBe(2);
      expect(businessAnalysisStage[0].stepCount).toBe('First');
      expect(businessAnalysisStage[1].stepCount).toBe('Second');
    });

    it('should have Research stage with 4 steps', () => {
      const researchStage = component.stageItems[1];
      expect(researchStage.length).toBe(4);
      expect(researchStage[0].stepCount).toBe('First');
      expect(researchStage[1].stepCount).toBe('Second');
      expect(researchStage[2].stepCount).toBe('Third');
      expect(researchStage[3].stepCount).toBe('Fourth');
    });

    it('should have Technical Assessment stage with 3 steps', () => {
      const technicalAssessmentStage = component.stageItems[2];
      expect(technicalAssessmentStage.length).toBe(3);
    });

    it('should have Realization stage with 4 steps', () => {
      const realizationStage = component.stageItems[3];
      expect(realizationStage.length).toBe(4);
    });

    it('should have Further Cooperation stage with 2 steps', () => {
      const furtherCooperationStage = component.stageItems[4];
      expect(furtherCooperationStage.length).toBe(2);
    });

    it('should have valid step icons', () => {
      component.stageItems.forEach((stage) => {
        stage.forEach((item) => {
          expect(item.stepIcon).toMatch(/^looks_(one|two|3|4)$/);
        });
      });
    });

    it('should have non-empty step descriptions', () => {
      component.stageItems.forEach((stage) => {
        stage.forEach((item) => {
          expect(item.stepDescription).toBeTruthy();
          expect(item.stepDescription.trim().length).toBeGreaterThan(0);
        });
      });
    });

    it('should have non-empty stage descriptions', () => {
      component.stageItems.forEach((stage) => {
        expect(stage[0].stageDescription).toBeTruthy();
        expect(stage[0].stageDescription.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('template rendering', () => {
    it('should render the section element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('should render mat-card', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const matCard = compiled.querySelector('mat-card');
      expect(matCard).toBeTruthy();
    });

    it('should render mat-vertical-stepper', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const stepper = compiled.querySelector('mat-vertical-stepper');
      expect(stepper).toBeTruthy();
    });

    it('should render mat-step elements for each stage', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const stepActions = compiled.querySelectorAll('.step-actions');
      expect(stepActions.length).toBe(component.stageItems.length);
    });

    it('should render step-actions div for button container', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const stepActions = compiled.querySelectorAll('.step-actions');
      expect(stepActions.length).toBeGreaterThan(0);
    });
  });
});
