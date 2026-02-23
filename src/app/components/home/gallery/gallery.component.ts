import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SharedModule } from '../../shared.module';

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
  standalone: true,
  imports: [SharedModule],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'scale(0.8) rotate(-10deg)',
          filter: 'blur(5px)'
        }),
        animate('600ms ease-in-out', style({
          opacity: 1,
          transform: 'scale(1) rotate(0deg)',
          filter: 'blur(0px)'
        }))
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {
  currentIndex = 0;
  isAutoPlay = true;
  autoPlayInterval: any;
  progressInterval: any;
  progress = 0;
  autoPlayDuration = 4000;

  // TODO: Change href on routerLink, issue #87.
  images: GalleryImage[] = [
    {
      src: './assets/cyber-security.avif',
      title: 'Cyber Security',
      description: 'Learn more about our cyber security services',
      link: '/cyber-security'
    },
    {
      src: 'assets/digital-strategy.avif',
      title: 'Digital Strategy',
      description: 'Explore our digital strategy solutions',
      link: '/digital-strategy'
    },
    {
      src: 'assets/software-development.avif',
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
    this.resetProgress();
  }

  previous(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resetProgress();
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.resetProgress();
  }

  onMouseEnter(): void {
    this.pauseAutoPlay();
  }

  onMouseLeave(): void {
    this.resumeAutoPlay();
  }

  private startAutoPlay(): void {
    if (this.isAutoPlay) {
      this.resetProgress();
      this.autoPlayInterval = setInterval(() => {
        this.next();
      }, this.autoPlayDuration);
    }
  }

  private pauseAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = undefined;
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = undefined;
    }
  }

  private resumeAutoPlay(): void {
    if (this.isAutoPlay) {
      // Calculate remaining time based on current progress
      const remainingProgress = 100 - this.progress;
      const remainingTime = (remainingProgress / 100) * this.autoPlayDuration;

      // Start progress animation from current position
      const updateInterval = 50;
      this.progressInterval = setInterval(() => {
        this.progress += (updateInterval / this.autoPlayDuration) * 100;
        if (this.progress >= 100) {
          this.progress = 100;
        }
      }, updateInterval);

      // Set timeout for remaining time before advancing to next slide
      this.autoPlayInterval = setTimeout(() => {
        this.next();
        // After advancing, set up the regular interval
        this.autoPlayInterval = setInterval(() => {
          this.next();
        }, this.autoPlayDuration);
      }, remainingTime);
    }
  }

  private resetProgress(): void {
    this.progress = 0;
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    if (this.isAutoPlay) {
      const updateInterval = 50; // Update every 50ms for smooth animation
      this.progressInterval = setInterval(() => {
        this.progress += (updateInterval / this.autoPlayDuration) * 100;
        if (this.progress >= 100) {
          this.progress = 100;
        }
      }, updateInterval);
    }
  }
}
