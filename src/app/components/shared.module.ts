import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

/**
 * SharedModule: reusable UI dependencies (Material, Carousel, Forms, Router, etc.).
 * Import in feature modules or use in standalone components: imports: [SharedModule, ...].
 */
@NgModule({
  exports: [
    CarouselModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MaterialModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  imports: [
    CarouselModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MaterialModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
