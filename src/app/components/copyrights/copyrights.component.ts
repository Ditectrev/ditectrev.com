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
      content: `Content &ndash; all of part of is forbidden for these actions: adapting, altering, broadcasting, changing, copying, data extraction/mining/scraping, decompiling, disassembling, distributing, downloading, editing, framing, hacking, lending, making a derivative work from, making available to the public, penetration testing, posting, rebranding, renting, repositioning, reproducing, republishing, reverse engineering, sublicensing, transmitting or anything which might cause our loss if not stated otherwise. The Content includes: blogs we post, copyrights, courses we do, data, design rights, editorial content, feel and look (UX), fonts, graphics, images, intellectual property rights and patents (registered and unregistered), music, photographs, products we deliver, services we do, software, sounds, source code, text, UI and UX mock ups, video recordings we publish and any content which you can find in our assets (including this website) or elsewhere we performed some job belongs to the company IBStructure Daniel Danielecki and its affiliates, contributors or third parties (which may include you or other client and/or users), except to the extent permitted at law. The company reserves all of its rights. The only exceptions are explicitly provided in the Terms of Use. In all other cases nothing grants you a license or rights to use any copyright, design right, trademark or a product/service or its part we deliver which is controlled by IBStructure Daniel Danielecki. You cannot use it without written permission of owner of any of the Content. All these copyrights are for manual actions as well for any kind of automated tools, e.g. robot, spider or any other automated device and/or software.`,
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
