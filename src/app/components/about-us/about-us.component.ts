import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  template: `
    <div class="about-us">
      <h1>About Us</h1>
      <p>Welcome to Ditectrev. We are a technology company specializing in digital solutions.</p>
    </div>
  `,
  styles: [`
    .about-us {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class AboutUsComponent {}
