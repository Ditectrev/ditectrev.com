import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="header">
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/about-us">About Us</a>
        <a routerLink="/services">Services</a>
        <a routerLink="/contact">Contact</a>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      background: #333;
      color: white;
      padding: 1rem;
    }
    nav {
      display: flex;
      gap: 1rem;
    }
    a {
      color: white;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class HeaderComponent {}
