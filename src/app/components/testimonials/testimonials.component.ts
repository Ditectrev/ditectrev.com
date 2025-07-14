import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  public customOptions: OwlOptions = {
    animateIn: 'fadeInRight',
    animateOut: 'fadeOutLeft',
    autoHeight: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoWidth: false,
    center: true,
    dots: true,
    dotsSpeed: 1000,
    items: 1,
    loop: true,
    mouseDrag: true,
    nav: false,
    pullDrag: true,
    smartSpeed: 500,
    touchDrag: true,
  };

  // TODO: Make this an interface.
  public slidesItems: {
    id: string;
    name: string;
    position: string;
    src: string;
    testimonial: string;
  }[] = [
    {
      id: '1',
      name: 'Jarosław Miężał',
      position: 'Owner of VipSzofer',
      src: 'assets/man.png',
      testimonial:
        'Knowledge in a given topic and professionalism are features that should be mentioned when speaking about Ditectrev.',
    },
    {
      id: '2',
      name: 'Magdalena Czerwińska',
      position: 'Owner of Dziergalena',
      src: 'assets/woman.png',
      testimonial: 'Efficient cooperation. Contact without a problem.',
    },
    {
      id: '3',
      name: 'Krzysztof Konopka',
      position: 'CEO of CSiR Jelcz-Laskowice',
      src: 'assets/man.png',
      testimonial:
        'Pragmatic technical arguments and easy to adopt for non-technology people.',
    },
    {
      id: '4',
      name: 'Hanna Głowacka',
      position: 'Owner of CoverX',
      src: 'assets/woman.png',
      testimonial:
        'Successfully delivered project, and warm approach for clients.',
    },
    {
      id: '5',
      name: 'Sers Eire',
      position: 'Editor in EirerePublic',
      src: 'assets/man.png',
      testimonial: 'Remote cooperation without any problems.',
    },
  ];
}
