import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./components/about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'methodology',
    loadComponent: () => import('./components/methodology/methodology.component').then(m => m.MethodologyComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./components/faq/faq.component').then(m => m.FaqComponent)
  },
  {
    path: 'glossary',
    loadComponent: () => import('./components/glossary/glossary.component').then(m => m.GlossaryComponent)
  },
  {
    path: 'sitemap',
    loadComponent: () => import('./components/sitemap/sitemap.component').then(m => m.SitemapComponent)
  },
  {
    path: 'copyrights',
    loadComponent: () => import('./components/copyrights/copyrights.component').then(m => m.CopyrightsComponent)
  },
  {
    path: 'terms-of-use',
    loadComponent: () => import('./components/terms-of-use/terms-of-use.component').then(m => m.TermsOfUseComponent)
  },
  {
    path: 'privacy-and-security',
    loadComponent: () => import('./components/privacy-and-security/privacy-and-security.component').then(m => m.PrivacyAndSecurityComponent)
  },

  {
    path: 'partnerships',
    loadComponent: () => import('./components/partnerships/partnerships.component').then(m => m.PartnershipsComponent)
  },
  // Service routes
  {
    path: 'cyber-security',
    loadComponent: () => import('./components/cyber-security/cyber-security.component').then(m => m.CyberSecurityComponent)
  },
  {
    path: 'digital-strategy',
    loadComponent: () => import('./components/digital-strategy/digital-strategy.component').then(m => m.DigitalStrategyComponent)
  },
  {
    path: 'software-development',
    loadComponent: () => import('./components/software-development/software-development.component').then(m => m.SoftwareDevelopmentComponent)
  },
  // Catch all route for 404
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
