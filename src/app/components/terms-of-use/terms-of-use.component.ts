import * as AOS from "aos";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Legal } from '../../interfaces';

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
  imports: [CommonModule, RouterModule, MatCardModule]
})
export class TermsOfUseComponent implements OnInit {
  sections: Legal[] = [
    {
      title: 'Introduction',
      content: '',
      ariaLabel: 'This is Introduction section of Terms of Use.',
      delay: 0,
      hasLinks: true
    },
    {
      title: 'About Ditectrev',
      content: '',
      ariaLabel: 'This is About Ditectrev section of Terms of Use.',
      delay: 300,
      hasLinks: true
    },
    {
      title: 'Disclaimers',
      content: '',
      ariaLabel: 'This is Disclaimers section of Terms of Use.',
      delay: 600,
      hasLinks: true
    },
    {
      title: 'Intellectual Property',
      content: '',
      ariaLabel: 'This is Intellectual Property section of Terms of Use.',
      delay: 900,
      hasLinks: true
    },
    {
      title: 'Cyber Security',
      content: 'We cannot guarantee that our Assets will be free of bugs, viruses, vulnerabilities and/or any other malicious content.<p>You are responsible for cyber security configuration using your computer programs, information technology and platform to access our Content. You should your own virus protection software.</p><p>Knowingly introducing bugs, logic bombs, malicious software, trojans, viruses, worms and/or any kind of content which may be harmful is forbidden to all Assets belonging to us. Artificial intelligence-powered attack, brute-forcing, clickjacking, cookie forgery, cross-site request forgery, cross-site scripting, cryptographical analysis, data tampering, denial-of-service attack, distributed denial-of-service attack, eavesdropping, file upload attack, gathering our API keys, hacking, information gathering, injections (server-side, shell, SQL, query and others), introducing known vulnerabilities, man-in-the-middle attack, network and server analysis, password attack, penetration testing, phishing, reconnaissance tools, scanning, session hijacking, spamming, stress testing, unauthorized access, violating our content security policy, vulnerabilities assessment or any other attack and/or type of activity which might reveal our content, network and server infrastructure or weakness about any of our Assets is a criminal offence under the Chapter 18 of the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and cooperate with them by providing your identity information. For scenarios of such a breach your right to use our Assets will expire immediately.</p><p>You are responsible for the content you are uploading to our Assets as well as for its backing up and securing.</p><p>We grant rights to remove your content partially and fully whenever we want without giving a valid reason for that.</p>',
      ariaLabel: 'This is Cyber Security section of Terms of Use.',
      delay: 1200,
      hasLinks: false
    },
    {
      title: 'Privacy',
      content: '',
      ariaLabel: 'This is Privacy section of Terms of Use.',
      delay: 1500,
      hasLinks: true
    },
    {
      title: 'Availability',
      content: 'Our Website and Assets are provided <q>as is</q> and on an <q>as available</q> basis.<p>We cannot guarantee that our Website and/or Assets and/or an content on it will be always free of defects and/or faults. We may suspend or withdraw our Website and/or Assets full and/or partially.</p><p>The company tries to keep the content up-to-date, however we cannot give any guarantees and/or warranties that it will be always accurate.</p><p>You may access our Website and Assets by using a computer, laptop or a mobile device.</p><p>Technical requirements to have our Website and Assets running is its support for CSS, HTML and JavaScript technologies.</p><p>We do out best to provide as high accessibility as possible, but cannot guarantee that all of them will be compatible with the Web Content Accessibility Guidelines (WCAG).</p>',
      ariaLabel: 'This is Availability section of Terms of Use.',
      delay: 1800,
      hasLinks: false
    },
    {
      title: 'Limitations of Liability',
      content: 'To the maximum extent permitted by law we do not accept any liability for any direct and/or indirect partial and/or full damage and/or loss of business interruption, income, profits, reputation, revenue and/or any other valuable your asset, including the foreseeable ones.<p>Excluding personal injuries or deaths resulting from our negligence would be unlawful and therefore we do not exclude and/or limit them.</p>',
      ariaLabel: 'This is Limitations of Liability section of Terms of Use.',
      delay: 2100,
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
