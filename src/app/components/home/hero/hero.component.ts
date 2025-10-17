import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ParticlesConfig } from './particles/particles-config';

declare let particlesJS: any; // Required to be properly interpreted by TypeScript.

/**
 * @component HeroComponent
 * @description Main hero section component with animated text and particles background.
 * @implements OnInit, AfterViewInit
 */
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeroComponent implements OnInit, AfterViewInit {
  private headerText: string =
    "<span style='color: #3f51b5'>#Build</span> <span style='font-weight: 100'>Your</span> Digital Future."; // Styles and text for the heading.
  public headerSafeHtml: SafeHtml; // Required for mixing styles in HTML tags within a string.

  // Subheader text
  private subheaderFullText: string =
    'Online Education and Information Technology (IT) Consulting.';
  private subheaderMobileText: string =
    'Online Education and Information\nTechnology (IT) Consulting.';
  public subheaderLetters: string[] = [];
  public showScrollButton = true;
  public isMobile: boolean = false;

  /**
   * @constructor
   * @description Create a new instance of this component.
   * @param {DomSanitizer} domSanitizer Angular's built-in service to prevent attackers from injecting malicious client-side scripts.
   */
  constructor(private domSanitizer: DomSanitizer) {
    // Bypass Angular's XSS protection to parse HTML mixed with styles.
    this.headerSafeHtml = this.domSanitizer.bypassSecurityTrustHtml(
      this.headerText
    );
  }

  /**
   * @access public
   * @callback ngOnInit
   * @description Invoked immediately after Angular has completed initialization and setting up component.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.invokeParticles();
    // Check if mobile device
    this.isMobile = window.innerWidth <= 600;
    // Use mobile text if on mobile device, otherwise use full text
    const textToUse = this.isMobile ? this.subheaderMobileText : this.subheaderFullText;
    // Split text into individual letters for CSS animation
    this.subheaderLetters = textToUse.split('');
  }

  /**
   * @access public
   * @callback ngAfterViewInit
   * @description Invoked after view initialization to trigger animations.
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    // Show scroll button after a delay
    setTimeout(() => {
      this.showScrollButton = true;
    }, 3000);
  }

  /**
   * @access public
   * @description Invoke Particles.
   * @function invokeParticles
   * @returns {void}
   */
  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () {});
  }

  /**
   * @access public
   * @description Scroll to the next section (gallery).
   * @function scrollToNextSection
   * @returns {void}
   */
  public scrollToNextSection(): void {
    const galleryElement = document.querySelector('app-gallery');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
