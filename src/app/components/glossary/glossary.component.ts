import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="glossary">
      <h1>Glossary</h1>
      <p>Technical terms and definitions used in our industry.</p>

      <div class="search-box">
        <input
          type="text"
          placeholder="Search terms..."
          [(ngModel)]="searchTerm"
          (input)="filterTerms()"
        >
      </div>

      <div class="terms-list">
        <div class="term-item" *ngFor="let term of filteredTerms">
          <h3>{{ term.term }}</h3>
          <p>{{ term.definition }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .glossary {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .glossary h1 {
      text-align: center;
      margin-bottom: 1rem;
    }
    .glossary > p {
      text-align: center;
      margin-bottom: 2rem;
      color: #666;
    }
    .search-box {
      margin-bottom: 2rem;
    }
    .search-box input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
    }
    .term-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;
      background: #f8f9fa;
    }
    .term-item h3 {
      color: #667eea;
      margin-bottom: 0.5rem;
    }
    .term-item p {
      margin: 0;
      line-height: 1.6;
    }
  `]
})
export class GlossaryComponent {
  searchTerm = '';
  allTerms = [
    {
      term: 'API',
      definition: 'Application Programming Interface - a set of rules that allows one software application to interact with another.'
    },
    {
      term: 'Frontend',
      definition: 'The part of a website or application that users interact with directly, including the user interface and user experience.'
    },
    {
      term: 'Backend',
      definition: 'The server-side of an application that handles data processing, business logic, and database operations.'
    },
    {
      term: 'Database',
      definition: 'An organized collection of structured information or data, typically stored electronically in a computer system.'
    },
    {
      term: 'Cloud Computing',
      definition: 'The delivery of computing services over the internet, including servers, storage, databases, networking, and software.'
    }
  ];
  filteredTerms = [...this.allTerms];

  filterTerms() {
    if (!this.searchTerm.trim()) {
      this.filteredTerms = [...this.allTerms];
    } else {
      this.filteredTerms = this.allTerms.filter(term =>
        term.term.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
