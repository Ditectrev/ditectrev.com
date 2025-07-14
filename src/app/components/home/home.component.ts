import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home">
      <section class="hero">
        <h1>Welcome to Ditectrev</h1>
        <p>Your trusted partner for innovative technology solutions.</p>
        <button class="cta-button">Get Started</button>
      </section>

      <section class="features">
        <h2>Our Services</h2>
        <div class="feature-grid">
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
      </section>

      <section class="about-preview">
        <h2>Why Choose Us?</h2>
        <p>We combine technical expertise with business acumen to deliver solutions that drive real results.</p>
      </section>
    </div>
  `,
  styles: [`
    .home {
      min-height: 100vh;
    }
    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    .cta-button {
      background: #fff;
      color: #667eea;
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .features {
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .features h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .feature {
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 10px;
      text-align: center;
      transition: transform 0.3s ease;
    }
    .feature:hover {
      transform: translateY(-5px);
    }
    .feature h3 {
      color: #667eea;
      margin-bottom: 1rem;
    }
    .about-preview {
      padding: 4rem 2rem;
      background: #f8f9fa;
      text-align: center;
    }
    .about-preview h2 {
      margin-bottom: 1rem;
      font-size: 2.5rem;
    }
  `]
})
export class HomeComponent {}
