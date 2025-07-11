import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home">
      <h1>Welcome to Ditectrev</h1>
      <p>Your trusted partner for innovative technology solutions.</p>
      <div class="features">
        <div class="feature">
          <h3>Software Development</h3>
          <p>Custom software solutions tailored to your needs.</p>
        </div>
        <div class="feature">
          <h3>Digital Strategy</h3>
          <p>Strategic digital transformation for your business.</p>
        </div>
        <div class="feature">
          <h3>Cyber Security</h3>
          <p>Protect your digital assets with our security expertise.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .feature {
      padding: 1.5rem;
      border: 1px solid #eee;
      border-radius: 8px;
      background: #f9f9f9;
    }
  `]
})
export class HomeComponent {}
