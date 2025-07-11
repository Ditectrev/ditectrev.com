import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="contact">
      <h1>Contact Us</h1>
      <p>Get in touch with us for your technology needs.</p>
      <p>Email: contact&#64;ditectrev.com</p>
    </div>
  `,
  styles: [`
    .contact {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class ContactComponent {}
