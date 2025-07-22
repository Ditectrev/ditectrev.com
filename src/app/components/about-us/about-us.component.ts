import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { NgCircleProgressModule, CircleProgressOptions } from 'ng-circle-progress';

@Component({
  selector: "app-about-us",
  standalone: true,
  imports: [CommonModule, MatCardModule, NgCircleProgressModule],
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
  providers: [
    {
      provide: CircleProgressOptions,
      useValue: {}
    }
  ]
})
export class AboutUsComponent {}
