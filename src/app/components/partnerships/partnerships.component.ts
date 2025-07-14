import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-partnerships',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="partnerships">
      <h1>Partnerships</h1>
      <p>We collaborate with leading technology companies and organizations to deliver exceptional solutions.</p>

      <div class="partnership-grid">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Technology Partners</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Strategic partnerships with leading technology providers to ensure we deliver cutting-edge solutions.</p>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Industry Collaborations</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Working with industry leaders to stay ahead of trends and best practices.</p>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Academic Partnerships</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Collaborating with academic institutions to drive innovation and research.</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="contact-section">
        <h2>Interested in Partnering?</h2>
        <p>Get in touch with us to explore partnership opportunities.</p>
        <button mat-raised-button color="primary">
          <mat-icon>email</mat-icon>
          Contact Us
        </button>
      </div>
    </div>
  `,
  styles: [`
    .partnerships {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .partnership-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    .contact-section {
      text-align: center;
      margin-top: 3rem;
      padding: 2rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
    button {
      margin-top: 1rem;
    }
  `]
})
export class PartnershipsComponent {}
