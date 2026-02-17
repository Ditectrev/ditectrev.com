import { CarouselModule } from "ngx-owl-carousel-o";
// import { ChartsModule } from "ng2-charts";
import { CommonModule } from "@angular/common";
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from "@angular/material/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FooterComponent } from "./footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { MomentModule } from "ngx-moment";
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from "@angular/router";
// import { TeximateModule } from "ngx-teximate";

// TODO: Create separated module MaterialModule
// TODO: Looks like header & footer should be part of CoreModule, because they're not changing any data (no login/register for example), therefore are static and are available globally.
@NgModule({
  // declarations: [FooterComponent, HeaderComponent], // These are now standalone components
  exports: [
    CarouselModule,
    // ChartsModule,
    CommonModule,
    FontAwesomeModule,
    // FooterComponent, // Now standalone component
    FormsModule,
    // HeaderComponent, // Now standalone component
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    // MomentModule, // Not compatible with Angular 17
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    // TeximateModule,
  ],
  imports: [
    CarouselModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    // MomentModule, // Not compatible with Angular 17
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    // TeximateModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class SharedModule {}
