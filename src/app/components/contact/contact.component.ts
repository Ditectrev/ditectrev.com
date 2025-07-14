import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="contact">
      <h1>Contact Us</h1>
      <p>Get in touch with us for your technology needs.</p>

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" formControlName="name" placeholder="Your name">
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" placeholder="Your email">
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" formControlName="message" placeholder="Your message" rows="5"></textarea>
        </div>

        <button type="submit" [disabled]="!contactForm.valid">Send Message</button>
      </form>

      <div class="contact-info">
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> contact&#64;ditectrev.com</p>
        <p><strong>Phone:</strong> +48 732 280 741</p>
        <p><strong>Address:</strong> Irysowa 18, 55-220 Jelcz-Laskowice, Poland</p>
      </div>
    </div>
  `,
  styles: [`
    .contact {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .contact-form {
      margin: 2rem 0;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    input, textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    button {
      background: #1976d2;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .contact-info {
      margin-top: 2rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      alert('Thank you for your message! We will get back to you soon.');
      this.contactForm.reset();
    }
  }
}
