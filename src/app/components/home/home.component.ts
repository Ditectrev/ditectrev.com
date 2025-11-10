import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { SiriWaveComponent } from './siriwave/siriwave.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'app-home',
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    TestimonialsComponent,
    SiriWaveComponent,
    GalleryComponent,
    HeroComponent
  ]
})
export class HomeComponent {}
