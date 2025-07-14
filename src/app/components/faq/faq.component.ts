import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="faq">
      <h1>Frequently Asked Questions</h1>
      <p>Find answers to common questions about our services and processes.</p>

      <div class="faq-list">
        <div class="faq-item" *ngFor="let item of faqItems; let i = index">
          <div class="faq-question" (click)="toggleItem(i)">
            <h3>{{ item.question }}</h3>
            <span class="toggle-icon">{{ item.isOpen ? '−' : '+' }}</span>
          </div>
          <div class="faq-answer" [class.open]="item.isOpen">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .faq {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .faq h1 {
      text-align: center;
      margin-bottom: 1rem;
    }
    .faq > p {
      text-align: center;
      margin-bottom: 3rem;
      color: #666;
    }
    .faq-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-bottom: 1rem;
      overflow: hidden;
    }
    .faq-question {
      padding: 1rem;
      background: #f8f9fa;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .faq-question h3 {
      margin: 0;
      font-size: 1.1rem;
    }
    .toggle-icon {
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
    }
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .faq-answer.open {
      max-height: 200px;
    }
    .faq-answer p {
      padding: 1rem;
      margin: 0;
      line-height: 1.6;
    }
  `]
})
export class FaqComponent {
  faqItems = [
    {
      question: 'What services do you offer?',
      answer: 'We offer software development, digital strategy, and cyber security services tailored to your business needs.',
      isOpen: false
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on complexity. Small projects can take 2-4 weeks, while larger projects may take 3-6 months.',
      isOpen: false
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer ongoing support and maintenance for all our solutions to ensure they continue to meet your needs.',
      isOpen: false
    },
    {
      question: 'What technologies do you use?',
      answer: 'We use modern technologies including Angular, React, Node.js, Python, and cloud platforms like AWS and Azure.',
      isOpen: false
    }
  ];

  toggleItem(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
