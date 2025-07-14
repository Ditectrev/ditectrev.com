import * as AOS from "aos";
import { Component, OnInit } from "@angular/core";

/**
 * @component PrivacyAndSecurityComponent
 * @description Create the component.
 * @implements OnInit
 */
@Component({
  selector: "app-privacy-and-security",
  templateUrl: "./privacy-and-security.component.html",
  styleUrls: ["./privacy-and-security.component.scss"],
})
export class PrivacyAndSecurityComponent implements OnInit {
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
