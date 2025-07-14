import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

interface GalleryImage {
  src: string;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {
  currentIndex = 0;
  images: GalleryImage[] = [
    {
      src: './assets/cyber-security.jpg',
      title: 'Cyber Security',
      description: 'Learn more about our cyber security services',
      link: '/cyber-security'
    },
    {
      src: 'assets/digital-strategy.jpg',
      title: 'Digital Strategy',
      description: 'Explore our digital strategy solutions',
      link: '/digital-strategy'
    },
    {
      src: 'assets/software-development.jpg',
      title: 'Software Development',
      description: 'Discover our software development expertise',
      link: '/software-development'
    }
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previous(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number): void {
    this.currentIndex = index;
  }

  private startAutoPlay(): void {
    setInterval(() => {
      this.next();
    }, 4000);
  }
}
