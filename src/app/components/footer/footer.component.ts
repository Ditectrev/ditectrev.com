import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p>&copy; 2024 Ditectrev. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .footer {
      background: #333;
      color: white;
      padding: 1rem;
      text-align: center;
      margin-top: auto;
    }
  `]
})
export class FooterComponent {}
