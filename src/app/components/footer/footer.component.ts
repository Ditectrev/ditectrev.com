import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import {
  faAt,
  faHome,
  faInfoCircle,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// TODO: Make this a separated file.
interface ResponseMailChimp {
  result: string;
  msg: string;
}

// TODO: Add invisible reCAPTCHA?
// TODO: Social icons with education included, when blog/courses will be done then: CodeSandbox, Discord, GitHub, Medium and YouTube too.
// TODO: Zoom in a bit this section/region of footer (one of the three only: "Ditectrev", "Stay Informed", "Information") which is on hover.
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    FontAwesomeModule,
  ]
})
export class FooterComponent {
  public constructor(
    private httpClient: HttpClient,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faAt);
    this.library.addIcons(faFacebookF);
    this.library.addIcons(faHome);
    this.library.addIcons(faInstagram);
    this.library.addIcons(faInfoCircle);
    this.library.addIcons(faLinkedinIn);
    this.library.addIcons(faPhone);
    this.library.addIcons(faTwitter);
  }

  public formControlEmail: FormControl = new FormControl(null, [
    Validators.email,
    Validators.maxLength(512),
    Validators.minLength(6),
    Validators.required,
  ]);

  public currentDate: Date = new Date();
  public endpointMailChimp = ''; // TODO: Configure MailChimp endpoint
  public error = '';
  public submitted = false;

  public bottomMenuItems: { name: string; path: string }[] = [
    { name: 'Copyrights', path: '/copyrights' },
    { name: 'Sitemap', path: '/sitemap' },
    { name: 'Terms of Use', path: '/terms-of-use' },
  ];

  public informationItems: {
    content: string;
    icon: [string, string];
    name: string;
  }[] = [
    {
      content: 'Irysowa 18, 55-220 Jelcz-Laskowice, Poland',
      icon: ['fas', 'home'],
      name: 'Address',
    },
    {
      content: '+48 732 280 741', // TODO: Make phone number unsafe HTML and interactive.
      icon: ['fas', 'phone'],
      name: 'Phone number',
    },
    { content: 'contact@ditectrev.com', icon: ['fas', 'at'], name: 'Email' }, // TODO: Make e-mail unsafe HTML and interactive.
    {
      content: 'Tax ID: PL9121899240',
      icon: ['fas', 'info-circle'],
      name: 'Legal information',
    },
  ];
  public rightMenuItems: { name: string; path: string }[] = [
    { name: 'Faq', path: '/faq' },
    { name: 'Glossary', path: '/glossary' },
    { name: 'Partnerships', path: '/partnerships' },
  ];

  public socialItems: {
    icon: [string, string];
    name: string;
    url: string;
  }[] = [
    {
      icon: ['fab', 'facebook-f'],
      name: 'Facebook',
      url: 'https://www.facebook.com/ditectrev',
    },
    {
      icon: ['fab', 'instagram'],
      name: 'Instagram',
      url: 'https://www.instagram.com/ditectrev',
    },
    {
      icon: ['fab', 'linkedin-in'],
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/ditectrev',
    },
    {
      icon: ['fab', 'twitter'],
      name: 'Twitter',
      url: 'https://twitter.com/ditectrev',
    },
  ];

  public onSubmit(): void {
    const params = new HttpParams()
      .set('EMAIL', this.formControlEmail.value)
      .set('b_1234567890abcdef1234567890_abcdef123456', ''); // TODO: Configure MailChimp hidden input
    const urlMailChimp = this.endpointMailChimp + params.toString();

    // TODO: Fix this after upgrade to Angular 10 isn't working.
    this.httpClient.jsonp<ResponseMailChimp>(urlMailChimp, 'c').subscribe(
      (response) => {
        if (response.result && response.result !== 'error') {
          Swal.fire(
            'Subscribed.',
            'Thank you for subscribing to our mailing news. Shortly you will receive further instructions.',
            'success'
          );
          this.submitted = true;
        } else {
          Swal.fire(
            'Error occurred.',
            'It was not possible to subscribe to our newsletter. Please try again or contact us directly.',
            'error'
          );
        }
      },
      (error) => {
        Swal.fire(
          'Error occurred.',
          'It was not possible to subscribe to our newsletter. Please try again or contact us directly.',
          'error'
        );
        console.error(error); // TODO: Remove this or make this as Sentry (as well as add contact error handling to Sentry).
      }
    );
    this.formControlEmail.reset(); // Reset the mail input.
  }
}
