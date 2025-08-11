import * as AOS from "aos";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Legal } from '../../interfaces';

/**
 * @component CopyrightsComponent
 * @description Create the component.
 * @implements OnInit
 */
@Component({
  selector: "app-copyrights",
  templateUrl: "./copyrights.component.html",
  styleUrls: ["./copyrights.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule]
})
export class CopyrightsComponent implements OnInit {
  sections: Legal[] = [
    {
      title: 'Content',
      content: '',
      ariaLabel: 'This is Content section of Copyrights.',
      delay: 0,
      hasLinks: true
    },
    {
      title: 'Licensing',
      content: 'In some scenarios we might publish this under any permissive license, e.g. BSD, ISC or MIT. Other options includes Apache or any GPL-related licenses, all of that has to be consulted with us.',
      ariaLabel: 'This is Licensing section of Copyrights.',
      delay: 300,
      hasLinks: false
    },
    {
      title: 'Content Infringes',
      content: 'For a cases when you believe that the Content infringes you and/or any third party kindly please contact us with sufficient information about the entity whose intellectual property rights are broken and we will conduct a thorough investigation in order to eventually remove it. When you would knowingly make any misrepresentations when providing us this information you might be a subject to liability.',
      ariaLabel: 'This is Content Infringes section of Copyrights.',
      delay: 600,
      hasLinks: false
    },
    {
      title: 'Material from the Website',
      content: 'Material from the Website may be re-used without written permission where any of the exceptions detailed in Chapter III of the Copyright Designs and Patents Act 1988 apply.',
      ariaLabel: 'This is Material from the Website section of Copyrights.',
      delay: 900,
      hasLinks: false
    }
  ];

  /**
   * @access public
   * @callback ngOnInit
   * @description Invoked immediately after Angular has completed initialization and setting up component.
   * @returns {void}
   */
  public ngOnInit() {
    AOS.init(); // Initialize Animate on Scroll (AOS) library.
  }
}
