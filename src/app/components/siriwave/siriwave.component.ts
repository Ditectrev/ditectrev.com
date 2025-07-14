import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import SiriWave from "siriwave";

/**
 * @component SiriWaveComponent
 * @description Create the component.
 * @implements AfterViewInit
 */
@Component({
  selector: "app-siriwave",
  templateUrl: "./siriwave.component.html",
  styleUrls: ["./siriwave.component.scss"],
})
export class SiriWaveComponent implements AfterViewInit {
  @ViewChild("renderSiri", { static: false })
  private renderSiri!: ElementRef<HTMLElement>; // Get reference of div element from HTML element to render SiriWave. Non-null assertion operator is required to let know the compiler that this value is not empty and exists.

  /**
   * @access public
   * @callback ngAfterViewInit
   * @description Invoked immediately after Angular has completed initialization of a component's view.
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    // Initialize SiriWave with its properties.
    new SiriWave({
      amplitude: 0.6,
      autostart: true,
      color: "#3f51b5",
      container: this.renderSiri.nativeElement,
      frequency: 5,
      speed: 0.025,
    });
  }
}
