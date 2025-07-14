import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

/**
 * @component NotFoundComponent
 * @description Create the component.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  template: `
    <div class="not-found-container">
      <mat-card class="not-found-card">
        <mat-card-content>
          <div class="error-content">
            <h1 class="error-code">404</h1>
            <h2 class="error-title">Page Not Found</h2>
            <p class="error-message">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div class="error-actions">
              <button mat-raised-button color="primary" routerLink="/home">
                Go to Home
              </button>
              <button mat-button routerLink="/contact">
                Contact Us
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem;
    }

    .not-found-card {
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    .error-content {
      padding: 2rem;
    }

    .error-code {
      font-size: 6rem;
      font-weight: bold;
      color: #f44336;
      margin: 0;
      line-height: 1;
    }

    .error-title {
      font-size: 2rem;
      color: #333;
      margin: 1rem 0;
    }

    .error-message {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .error-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    @media (max-width: 600px) {
      .error-code {
        font-size: 4rem;
      }

      .error-title {
        font-size: 1.5rem;
      }

      .error-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class NotFoundComponent {}
