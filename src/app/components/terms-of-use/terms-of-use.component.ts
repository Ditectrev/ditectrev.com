import * as AOS from "aos";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

/**
 * @component TermsOfUseComponent
 * @description Create the component.
 * @implements OnInit
 */
@Component({
  selector: "app-terms-of-use",
  templateUrl: "./terms-of-use.component.html",
  styleUrls: ["./terms-of-use.component.scss"],
  standalone: true,
  imports: [CommonModule, MatCardModule]
})
export class TermsOfUseComponent implements OnInit {
  /**
   * @access public
   * @callback ngOnInit
   * @description Invoked immediately after Angular has completed initialization and setting up component.
   * @returns {void}
   */
  public ngOnInit() {
    AOS.init(); // Initialie Animate on Scroll (AOS) library.
  }
}
