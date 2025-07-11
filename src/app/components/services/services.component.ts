import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <div class="services">
      <h1>Our Services</h1>
      <ul>
        <li>Software Development</li>
        <li>Digital Strategy</li>
        <li>Cyber Security</li>
        <li>Cloud Solutions</li>
      </ul>
    </div>
  `,
  styles: [`
    .services {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }
  `]
})
export class ServicesComponent {}
