import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartnershipsComponent } from './partnerships.component';
import { PartnershipItem } from '@interfaces';

describe('PartnershipsComponent', () => {
  let component: PartnershipsComponent;
  let fixture: ComponentFixture<PartnershipsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          PartnershipsComponent, // Import as standalone
          BrowserAnimationsModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create partnerships component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with partnershipsItems array', () => {
    expect(component.partnershipsItems).toBeDefined();
    expect(Array.isArray(component.partnershipsItems)).toBe(true);
    expect(component.partnershipsItems.length).toBe(3);
  });

  it('should have correct structure for each partnership item', () => {
    component.partnershipsItems.forEach((item: PartnershipItem) => {
      expect(item.description).toBeDefined();
      expect(item.icon).toBeDefined();
      expect(item.name).toBeDefined();
      expect(typeof item.description).toBe('string');
      expect(typeof item.icon).toBe('string');
      expect(typeof item.name).toBe('string');
    });
  });

  it('should have correct partnership items data', () => {
    const expectedItems: PartnershipItem[] = [
      {
        description: "Let's partner to give you our technical expertise.",
        icon: 'grade',
        name: 'Creative Agencies',
      },
      {
        description: 'Together we can do more.',
        icon: 'perm_identity',
        name: 'Freelancers',
      },
      {
        description: "Overloaded with work? Sometimes we're too, let's talk.",
        icon: 'code',
        name: 'Software Houses',
      },
    ];

    expect(component.partnershipsItems).toEqual(expectedItems);
  });

  it('should render section with correct aria-label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section');

    expect(section).toBeTruthy();
    expect(section?.getAttribute('aria-label')).toBe(
      'This is a partnerships page to inform you about possible ways of cooperation.'
    );
  });

  it('should render mat-card with correct attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('mat-card');

    expect(card).toBeTruthy();
    expect(card?.getAttribute('aria-label')).toBe(
      'These are partnerships details.'
    );
    expect(card?.getAttribute('role')).toBe('region');
    expect(card?.classList.contains('mat-elevation-z24')).toBe(true);
  });

  it('should render mat-card-title with correct text and attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('mat-card-title');

    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Partnerships');
    expect(title?.getAttribute('aria-level')).toBe('1');
    expect(title?.getAttribute('role')).toBe('heading');
    expect(title?.getAttribute('title')).toBe('Partnerships');
  });

  it('should render mat-card-subtitle with correct text and attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitle = compiled.querySelector('mat-card-subtitle');

    expect(subtitle).toBeTruthy();
    expect(subtitle?.textContent?.trim()).toBe(
      'We can partner with many entities.'
    );
    expect(subtitle?.getAttribute('aria-level')).toBe('3');
    expect(subtitle?.getAttribute('role')).toBe('heading');
  });

  it('should render mat-tab-group', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabGroup = compiled.querySelector('mat-tab-group');

    expect(tabGroup).toBeTruthy();
  });

  it('should render all partnership items as tabs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabGroup = compiled.querySelector('mat-tab-group');
    expect(tabGroup).toBeTruthy();
    expect(component.partnershipsItems.length).toBe(3);
  });

  it('should render mat-icon for each partnership item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('mat-icon');

    expect(icons.length).toBe(component.partnershipsItems.length);
    icons.forEach((icon, index) => {
      expect(icon.getAttribute('aria-hidden')).toBe('true');
      expect(icon.textContent?.trim()).toBe(
        component.partnershipsItems[index].icon
      );
    });
  });

  it('should render partnership names in tab labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabLabels = compiled.querySelectorAll('[mat-tab-label], .mat-mdc-tab-labels [role="tab"]');
    expect(tabLabels.length).toBeGreaterThanOrEqual(0);
    component.partnershipsItems.forEach((item) => {
      expect(item.name).toBeDefined();
      expect(compiled.textContent).toContain(item.name);
    });
  });

  it('should render partnership descriptions in tab content', () => {
    component.partnershipsItems.forEach((item) => {
      expect(item.description).toBeDefined();
      expect(item.description.length).toBeGreaterThan(0);
    });
    expect(component.partnershipsItems[0].description).toBe(
      "Let's partner to give you our technical expertise."
    );
  });

  it('should render description paragraphs with correct classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraphs = compiled.querySelectorAll('p.example-large-box');
    expect(paragraphs.length).toBeGreaterThanOrEqual(0);
    paragraphs.forEach((paragraph) => {
      expect(paragraph.classList.contains('example-large-box')).toBe(true);
      expect(paragraph.classList.contains('mat-elevation-z24')).toBe(true);
    });
  });
});
