import { Component } from '@angular/core';
import { GalleryComponent } from './gallery/gallery.component';
import { HeroComponent } from './hero/hero.component';
import { SiriWaveComponent } from './siriwave/siriwave.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-home',
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [
    SharedModule,
    TestimonialsComponent,
    SiriWaveComponent,
    GalleryComponent,
    HeroComponent,
  ]
})
export class HomeComponent {}
