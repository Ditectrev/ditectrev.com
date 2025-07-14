import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-about-us",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-us">
      <h1>About Us</h1>
      <p>Welcome to Ditectrev. We are a technology company specializing in digital solutions.</p>
      <div class="stats">
        <div class="stat">
          <h3>100+</h3>
          <p>Delivered projects</p>
        </div>
        <div class="stat">
          <h3>50+</h3>
          <p>Happy clients</p>
        </div>
        <div class="stat">
          <h3>5+</h3>
          <p>Years experience</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-us {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .stat {
      text-align: center;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .stat h3 {
      font-size: 2rem;
      color: #1976d2;
      margin: 0;
    }
  `]
})
export class AboutUsComponent {}
