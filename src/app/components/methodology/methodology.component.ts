import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-methodology',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="methodology">
      <h1>Our Methodology</h1>
      <p>Modern delivery approach that ensures success.</p>

      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Discovery</h3>
          <p>We start by understanding your business needs, goals, and challenges.</p>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <h3>Planning</h3>
          <p>We create a detailed roadmap and strategy to achieve your objectives.</p>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <h3>Development</h3>
          <p>We build your solution using modern technologies and best practices.</p>
        </div>

        <div class="step">
          <div class="step-number">4</div>
          <h3>Testing</h3>
          <p>We thoroughly test everything to ensure quality and reliability.</p>
        </div>

        <div class="step">
          <div class="step-number">5</div>
          <h3>Deployment</h3>
          <p>We launch your solution and provide ongoing support and maintenance.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .methodology {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .methodology h1 {
      text-align: center;
      margin-bottom: 1rem;
    }
    .methodology > p {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 1.2rem;
      color: #666;
    }
    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    .step {
      text-align: center;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 10px;
      position: relative;
    }
    .step-number {
      width: 50px;
      height: 50px;
      background: #667eea;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto 1rem;
    }
    .step h3 {
      margin-bottom: 1rem;
      color: #333;
    }
  `]
})
export class MethodologyComponent {}
