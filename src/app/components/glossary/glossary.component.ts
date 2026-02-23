import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from '../shared.module';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Term } from '../../interfaces';
import { GLOSSARY_DATA } from '../../data';

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit, AfterViewInit, OnDestroy {
  private searchSubject$: Subject<string> = new Subject<string>();
  private searchSubscription?: Subscription;

  public dataSource: MatTableDataSource<Term> = new MatTableDataSource<Term>(GLOSSARY_DATA);
  public displayedColumns: string[] = ['position', 'name', 'description'];
  public hasSearched: boolean = false;
  public lastSearchTerm: string = '';

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngOnInit(): void {
    this.initializeSearch();
  }

  ngAfterViewInit(): void {
    this.initializeTableFeatures();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  private initializeSearch(): void {
    this.searchSubscription = this.searchSubject$
      .pipe(
        debounceTime(1000), // Limit requests to maximum one per second.
        distinctUntilChanged() // Eliminate duplicate values.
      )
      .subscribe((filterValue: string) => {
        this.lastSearchTerm = filterValue;
        this.hasSearched = filterValue.trim().length > 0;
        this.dataSource.filter = filterValue.trim().toLowerCase(); // Filter data in glossary table.
      });
  }

  private initializeTableFeatures(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string): void {
    this.searchSubject$.next(filterValue);
  }

  public onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.lastSearchTerm = value;
    this.hasSearched = value.trim().length > 0;
  }

  public clearSearch(): void {
    this.hasSearched = false;
    this.lastSearchTerm = '';
    this.dataSource.filter = '';
    // Clear the search input field
    const searchInput = document.querySelector('input[matInput]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
  }
}
