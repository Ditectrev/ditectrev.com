import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GlossaryComponent } from './glossary.component';
import { GLOSSARY_DATA } from '../../data';

describe('GlossaryComponent', () => {
  let component: GlossaryComponent;
  let fixture: ComponentFixture<GlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        GlossaryComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create glossary component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.dataSource).toBeTruthy();
    expect(component.displayedColumns).toEqual(['position', 'name', 'description']);
    expect(component.hasSearched).toBe(false);
    expect(component.lastSearchTerm).toBe('');
  });

  it('should load glossary data correctly', () => {
    expect(component.dataSource.data).toEqual(GLOSSARY_DATA);
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should have correct table structure', () => {
    const compiled = fixture.nativeElement;
    const table = compiled.querySelector('mat-table');
    const headerRow = compiled.querySelector('mat-header-row');
    const searchField = compiled.querySelector('mat-form-field');

    expect(table).toBeTruthy();
    expect(headerRow).toBeTruthy();
    expect(searchField).toBeTruthy();
  });

  it('should display search field with correct placeholder', () => {
    const compiled = fixture.nativeElement;
    const searchInput = compiled.querySelector('input[matInput]');

    expect(searchInput).toBeTruthy();
    expect(searchInput.placeholder).toBe('Search for terms...');
  });

  it('should show search icon when search field is empty', () => {
    const compiled = fixture.nativeElement;
    const searchIcon = compiled.querySelector('mat-icon');

    expect(searchIcon).toBeTruthy();
    expect(searchIcon.textContent.trim()).toBe('search');
  });

  it('should update lastSearchTerm when onSearchInput is called', () => {
    const mockEvent = {
      target: { value: 'test search' }
    } as any;

    component.onSearchInput(mockEvent);

    expect(component.lastSearchTerm).toBe('test search');
    expect(component.hasSearched).toBe(true);
  });

  it('should set hasSearched to false for empty search input', () => {
    const mockEvent = {
      target: { value: '   ' }
    } as any;

    component.onSearchInput(mockEvent);

    expect(component.hasSearched).toBe(false);
  });

  it('should clear search when clearSearch is called', () => {
    // First set some search data
    component.lastSearchTerm = 'test';
    component.hasSearched = true;
    component.dataSource.filter = 'test';

    component.clearSearch();

    expect(component.lastSearchTerm).toBe('');
    expect(component.hasSearched).toBe(false);
    expect(component.dataSource.filter).toBe('');
  });

  it('should apply filter when applyFilter is called', () => {
    spyOn(component['searchSubject$'], 'next');

    component.applyFilter('test filter');

    expect(component['searchSubject$'].next).toHaveBeenCalledWith('test filter');
  });

  it('should initialize search subscription on ngOnInit', () => {
    spyOn(component as any, 'initializeSearch');

    component.ngOnInit();

    expect(component['initializeSearch']).toHaveBeenCalled();
  });

  it('should initialize table features on ngAfterViewInit', () => {
    spyOn(component as any, 'initializeTableFeatures');

    component.ngAfterViewInit();

    expect(component['initializeTableFeatures']).toHaveBeenCalled();
  });

  it('should unsubscribe from search subscription on ngOnDestroy', () => {
    spyOn(component['searchSubscription']!, 'unsubscribe');

    component.ngOnDestroy();

    expect(component['searchSubscription']!.unsubscribe).toHaveBeenCalled();
  });

  it('should handle search subscription cleanup when subscription is undefined', () => {
    component['searchSubscription'] = undefined;

    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should display correct number of terms in table', () => {
    const compiled = fixture.nativeElement;
    const tableRows = compiled.querySelectorAll('mat-row');

    expect(tableRows.length).toBe(Math.min(GLOSSARY_DATA.length, 5)); // Default page size is 5
  });

  it('should have paginator with correct configuration', () => {
    const compiled = fixture.nativeElement;
    const paginator = compiled.querySelector('mat-paginator');

    expect(paginator).toBeTruthy();
  });

  it('should show no results message when search returns no results', () => {
    // Set up component state for no results
    component.hasSearched = true;
    component.lastSearchTerm = 'nonexistent';
    component.dataSource.filter = 'nonexistent';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const noResults = compiled.querySelector('.no-results');

    expect(noResults).toBeTruthy();
  });

  it('should not show no results message when search has not been performed', () => {
    component.hasSearched = false;
    component.dataSource.filter = '';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const noResults = compiled.querySelector('.no-results');

    expect(noResults).toBeFalsy();
  });

  it('should display search term in no results message', () => {
    component.hasSearched = true;
    component.lastSearchTerm = 'test search';
    component.dataSource.filter = 'test search';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const noResultsText = compiled.querySelector('.no-results p strong');

    expect(noResultsText.textContent).toContain('test search');
  });

  it('should have clear search button in no results message', () => {
    component.hasSearched = true;
    component.lastSearchTerm = 'xyznonexistent';
    component.dataSource.filter = 'xyznonexistent';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const noResults = compiled.querySelector('.no-results');
    const clearButton = noResults?.querySelector('button');

    expect(noResults).toBeTruthy();
    expect(clearButton).toBeTruthy();
    expect(clearButton?.textContent).toContain('Clear Search');
  });

  it('should call clearSearch when clear button is clicked', () => {
    component.hasSearched = true;
    component.lastSearchTerm = 'xyznonexistent';
    component.dataSource.filter = 'xyznonexistent';

    fixture.detectChanges();

    spyOn(component, 'clearSearch');

    const compiled = fixture.nativeElement;
    const clearButton = compiled.querySelector('.no-results button');
    expect(clearButton).toBeTruthy();
    (clearButton as HTMLElement).click();

    expect(component.clearSearch).toHaveBeenCalled();
  });

  it('should have proper table headers', () => {
    const compiled = fixture.nativeElement;
    const headerCells = compiled.querySelectorAll('mat-header-cell');

    expect(headerCells.length).toBe(3);
    expect(headerCells[0].textContent.trim()).toBe('Position (no.)');
    expect(headerCells[1].textContent.trim()).toBe('Name');
    expect(headerCells[2].textContent.trim()).toBe('Description');
  });

  it('should display first term data correctly', () => {
    const firstTerm = GLOSSARY_DATA[0];
    const compiled = fixture.nativeElement;
    const firstRow = compiled.querySelector('mat-row');
    const cells = firstRow.querySelectorAll('mat-cell');

    expect(cells[0].textContent).toContain(firstTerm.position.toString());
    expect(cells[1].textContent).toContain(firstTerm.name);
    expect(cells[2].textContent).toContain(firstTerm.description);
  });
});
