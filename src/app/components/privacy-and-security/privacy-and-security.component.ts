import AOS from "aos";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Legal } from '../../interfaces';

/**
 * @component PrivacyAndSecurityComponent
 * @description Create the component.
 * @implements OnInit
 */
@Component({
  selector: "app-privacy-and-security",
  templateUrl: "./privacy-and-security.component.html",
  styleUrls: ["./privacy-and-security.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule]
})
export class PrivacyAndSecurityComponent implements OnInit {
  sections: Legal[] = [
    {
      title: 'Information Scope',
      content: '',
      ariaLabel: 'This is Information Scope section of Privacy and Security.',
      delay: 0,
      hasLinks: true
    },
    {
      title: 'Data Collection',
      content: '',
      ariaLabel: 'This is Data Collection section of Privacy and Security.',
      delay: 300,
      hasLinks: true
    },
    {
      title: 'Cookies',
      content: '',
      ariaLabel: 'This is Cookies section of Privacy and Security.',
      delay: 600,
      hasLinks: true
    },
    {
      title: 'Third Party Software and Services',
      content: 'Our Assets may be involve third party software and services. Those should have their own Privacy & Security policies, which we may require you to accept. These policies are out of our control scope, therefore our policies applies only to the information that we collect. It is your sole responsibility to determine whether any third party software and/or service provides acceptable for you Privacy & Security policies. Out Assets may contain links to third party applications and/or websites. We do not accept any liability and/or responsibility for those, because these are not controlled by us. These have separated and independent privacy policies which are out of our scope, therefore visiting them is at your own risk. Nonetheless, to protect integrity of our Assets and users we welcome any feedback about those applications and websites.<p>You can set up an account using one of the Single Sign-On (SSO) providers, before using them you should be familiar with their privacy policies.</p><p>We enable you to connect with us via social media, therefore exposing there personal information equals to the fact that we may have them as well. We use them to provide updates and announce public information about our work.</p>',
      ariaLabel: 'This is Third Party Software and Services section of Privacy and Security.',
      delay: 900,
      hasLinks: false
    },
    {
      title: 'Legal Rights',
      content: 'Under the applicable data protection laws you have the right for: access, be forgotten, be informed, complain, correction, data portability, erasure, object to processing, rectification, restriction, transfer and withdraw consent. As long as your requests are not clearly unfounded, excessive or repetitive the data changes are out of charge. In these, but not limited to, scenarios we may charge you or refuse your request related to personal data. Sometimes, to confirm your identity we may request some additional data as a security measure to ensure that personal data is not disclosed to unwanted parties. For information erased if appropriate we will delete your data. However, this is unfeasible to do so on the backups.',
      ariaLabel: 'This is Legal Rights section of Privacy and Security.',
      delay: 1200,
      hasLinks: false
    },
    {
      title: 'Children',
      content: 'This Website nor any of our Assets is not intended to be used by children under 13 years old (or other age as required by local law). We do not knowingly collect personal data from these children. Every parent or guardian can notify us immediately if they would have noticed one of our Assets is being used by their child. For that scenario every data associated with account of this child will be permanently delete without possibility to restore such data. By providing us with your data, you warrant to us you are over the required age by local law to do so. For children who wants to submit its personal data and are below the minimum age to contact us, please ask your parent or guardian to do so on your behalf.',
      ariaLabel: 'This is Children section of Privacy and Security.',
      delay: 1500,
      hasLinks: false
    },
    {
      title: 'Anonymization',
      content: 'Whenever possible we try to keep your personal data anonymously. You can also browser our Assets anonymously, however when setting up an account you will need to identify yourself. Providing not real personal data may affect quality of our products and services, ability to provide you requested information and support.',
      ariaLabel: 'This is Anonymization section of Privacy and Security.',
      delay: 1800,
      hasLinks: false
    },
    {
      title: 'Data Protection Officer',
      content: '',
      ariaLabel: 'This is Data Protection Officer section of Privacy and Security.',
      delay: 2100,
      hasLinks: true
    },
    {
      title: 'Data Breaches',
      content: 'Once we will detect data breach within one of our Assets, we will inform everyone whose personal data has been compromised as soon as possible. Legal authorities and affected Users can expect our cooperation in case of a data breach.',
      ariaLabel: 'This is Data Breaches section of Privacy and Security.',
      delay: 2400,
      hasLinks: false
    },
    {
      title: 'Opposition to Marketing Campaigns',
      content: 'We hereby expressly prohibit collection and usage of our contact information available across our Assets to all kind of marketing campaigns. We reserve the right to take specific legal action if it will be not respected.',
      ariaLabel: 'This is Opposition to Marketing Campaigns section of Privacy and Security.',
      delay: 2700,
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
