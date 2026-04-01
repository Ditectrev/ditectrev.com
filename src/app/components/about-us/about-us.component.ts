import { Component } from "@angular/core";
import { NgCircleProgressModule, CircleProgressOptions } from 'ng-circle-progress';
import { SharedModule } from '../shared.module';

@Component({
  selector: "app-about-us",
  standalone: true,
  imports: [SharedModule, NgCircleProgressModule],
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
