import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FaqComponent, FAQ_QUESTIONS } from './faq.component';
import { FaqQuestions } from '../../interfaces';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FaqComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
    fixture.detectChanges();
  });

  it('should create faq component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource with FAQ_QUESTIONS', () => {
    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.data).toEqual(FAQ_QUESTIONS);
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should initialize treeControl', () => {
    expect(component.treeControl).toBeTruthy();
    expect(component.treeControl).toBeInstanceOf(NestedTreeControl);
  });

  describe('hasChild', () => {
    it('should return true for nodes with questions array that has length > 0', () => {
      const nodeWithQuestions: FaqQuestions = {
        category: 'Test Category',
        questions: [
          { question: 'Test Question', answer: 'Test Answer' }
        ]
      };

      const result = component.hasChild(0, nodeWithQuestions);
      expect(result).toBe(true);
    });

    it('should return false for nodes with empty questions array', () => {
      const nodeWithEmptyQuestions: FaqQuestions = {
        category: 'Test Category',
        questions: []
      };

      const result = component.hasChild(0, nodeWithEmptyQuestions);
      expect(result).toBe(false);
    });

    it('should return false for nodes without questions property', () => {
      const nodeWithoutQuestions: FaqQuestions = {
        category: 'Test Category',
        question: 'Test Question',
        answer: 'Test Answer'
      };

      const result = component.hasChild(0, nodeWithoutQuestions);
      expect(result).toBe(false);
    });

    it('should return false for nodes with undefined questions', () => {
      const nodeWithUndefinedQuestions: FaqQuestions = {
        category: 'Test Category',
        questions: undefined
      };

      const result = component.hasChild(0, nodeWithUndefinedQuestions);
      expect(result).toBe(false);
    });

    it('should work correctly with actual FAQ_QUESTIONS data', () => {
      const firstCategory = FAQ_QUESTIONS[0];
      const result = component.hasChild(0, firstCategory);
      expect(result).toBe(true);
      expect(firstCategory.questions).toBeDefined();
      expect(firstCategory.questions!.length).toBeGreaterThan(0);
    });
  });

  describe('sanitizeHtml', () => {
    it('should sanitize HTML content with anchor tags', () => {
      const html = 'Please check our <a href="/privacy-and-security">Privacy & Security policy</a> for in-depth reading.';
      const spy = jest.spyOn(sanitizer, 'bypassSecurityTrustHtml');

      const result = component.sanitizeHtml(html);

      expect(spy).toHaveBeenCalledWith(html);
      expect(result).toBeDefined();
    });

    it('should return empty SafeHtml for empty string', () => {
      const html = '';
      const spy = jest.spyOn(sanitizer, 'bypassSecurityTrustHtml');

      const result = component.sanitizeHtml(html);

      expect(spy).toHaveBeenCalledWith('');
      expect(result).toBeDefined();
    });

    it('should handle HTML with multiple anchor tags', () => {
      const html = 'Many technical keywords are described in our <a href="/glossary">Glossary</a>. If you would not find an answer neither in the FAQ nor in the Glossary do not hesitate to <a href="/contact">Contact us</a>.';
      const spy = jest.spyOn(sanitizer, 'bypassSecurityTrustHtml');

      const result = component.sanitizeHtml(html);

      expect(spy).toHaveBeenCalledWith(html);
      expect(result).toBeDefined();
    });

    it('should return SafeHtml type', () => {
      const html = 'Test <a href="/test">link</a>';
      const result = component.sanitizeHtml(html);

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('treeControl functionality', () => {
    it('should be able to expand and collapse nodes', () => {
      const firstCategory = FAQ_QUESTIONS[0];

      expect(component.treeControl.isExpanded(firstCategory)).toBe(false);

      component.treeControl.expand(firstCategory);
      expect(component.treeControl.isExpanded(firstCategory)).toBe(true);

      component.treeControl.collapse(firstCategory);
      expect(component.treeControl.isExpanded(firstCategory)).toBe(false);
    });

    it('should get children correctly', () => {
      const firstCategory = FAQ_QUESTIONS[0];
      const children = component.treeControl.getChildren(firstCategory);

      expect(children).toBeDefined();
      expect(children).toEqual(firstCategory.questions);
    });

    it('should toggle expand/collapse state', () => {
      const firstCategory = FAQ_QUESTIONS[0];

      expect(component.treeControl.isExpanded(firstCategory)).toBe(false);

      component.treeControl.toggle(firstCategory);
      expect(component.treeControl.isExpanded(firstCategory)).toBe(true);

      component.treeControl.toggle(firstCategory);
      expect(component.treeControl.isExpanded(firstCategory)).toBe(false);
    });
  });

  describe('FAQ_QUESTIONS data structure', () => {
    it('should have valid FAQ_QUESTIONS data', () => {
      expect(FAQ_QUESTIONS).toBeDefined();
      expect(Array.isArray(FAQ_QUESTIONS)).toBe(true);
      expect(FAQ_QUESTIONS.length).toBeGreaterThan(0);
    });

    it('should have categories with questions', () => {
      FAQ_QUESTIONS.forEach((category) => {
        expect(category.category).toBeDefined();
        expect(category.questions).toBeDefined();
        expect(Array.isArray(category.questions)).toBe(true);
      });
    });

    it('should have questions with question and answer properties', () => {
      FAQ_QUESTIONS.forEach((category) => {
        if (category.questions) {
          category.questions.forEach((question) => {
            // Questions can be either leaf nodes (with question/answer) or nested categories
            if (question.question) {
              expect(question.question).toBeDefined();
              expect(question.answer).toBeDefined();
            }
          });
        }
      });
    });
  });

  describe('nested categories', () => {
    it('should handle nested category structure (Services category)', () => {
      const servicesCategory = FAQ_QUESTIONS.find(cat => cat.category === 'Services');
      expect(servicesCategory).toBeDefined();

      if (servicesCategory && servicesCategory.questions) {
        // Services category has nested categories
        const hasNestedCategories = servicesCategory.questions.some(
          item => item.category !== undefined
        );
        expect(hasNestedCategories).toBe(true);
      }
    });

    it('should correctly identify nested categories as having children', () => {
      const servicesCategory = FAQ_QUESTIONS.find(cat => cat.category === 'Services');

      if (servicesCategory) {
        const result = component.hasChild(0, servicesCategory);
        expect(result).toBe(true);

        // Check nested categories
        if (servicesCategory.questions) {
          const nestedCategory = servicesCategory.questions.find(
            item => item.category !== undefined && item.questions !== undefined
          );

          if (nestedCategory) {
            const nestedResult = component.hasChild(0, nestedCategory);
            expect(nestedResult).toBe(true);
          }
        }
      }
    });
  });
});
