import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeoService } from './services/seo.service';

// TODO: Outsource this to constants.
const FADE_ANIMATION =
  // Trigger name, needed to attach in HTML.
  trigger('routeState', [
    // Route for 'enter' transition.
    transition('*<=>*', [
      style({ opacity: 0.1 }), // CSS styles at start of transition.
      animate('1.2s', style({ opacity: 1 })), // Animation and styles at end of transition.
    ]),
  ]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [FADE_ANIMATION],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
// TODO: Add unit tests coverage for these methods.
// TODO: Uncomment ngx-spinner and fix it on Angular Universal, because now it's breaking.
export class AppComponent {
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event) => {
        this.seoService.updateForUrl(event.urlAfterRedirects);
      });
  }

  public getRouterOutletState(routerOutlet: RouterOutlet): string {
    const routeData = routerOutlet.activatedRouteData['animation'];
    return routeData ? routeData : 'rootPage';
  }

  /**
   * @constructor
   * @description Create a new instance of this component.
   * @param {NgxSpinnerService} spinner Spinner class object to show/hide spinner on home page.
   */
  // constructor(private spinner: NgxSpinnerService) {}

  /**
   * @access public
   * @callback ngOnInit
   * @description Invoked immediately after Angular has completed initialization and setting up component.
   * @returns {void}
   */
  // public ngOnInit(): void {
  //   this.spinner.show();
  // }

  /**
   * @access public
   * @callback ngAfterViewInit
   * @description Invoked immediately after Angular has completed checking component's view.
   * @returns {void}
   */
  // public ngAfterViewInit(): void {
  //   this.spinner.hide();
  // }
}
