import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';

/**
 * Shared import arrays for use in NgModules only.
 * For standalone components, use SharedModule instead: imports: [SharedModule, ...]
 * (Angular's compiler requires a single NgModule reference; spreading these consts causes NG2012.)
 */
export const COMMON_IMPORTS = [
  CarouselModule,
  CommonModule,
  FontAwesomeModule,
  FormsModule,
  MaterialModule,
  NgxSpinnerModule,
  ReactiveFormsModule,
  RouterModule,
];

export const FORM_IMPORTS = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
];

export const LAYOUT_IMPORTS = [MaterialModule];

export const DATA_IMPORTS = [MaterialModule];
