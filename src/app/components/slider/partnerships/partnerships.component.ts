import { Component } from '@angular/core';

/**
 * @component PartnershipsComponent
 * @description Create the component.
 */
@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.scss'],
})
export class PartnershipsComponent {
  // Array to hold all Cyber Security services.
  // TODO: Make this interface.
  public partnershipsItems: {
    description: string;
    icon: string;
    name: string;
  }[] = [
    {
      description: "Let's partner to give you our technical expertise.",
      icon: 'grade',
      name: 'Creative Agencies',
    },
    {
      description: 'Together we can do more.',
      icon: 'perm_identity',
      name: 'Freelancers',
    },
    {
      description: "Overloaded with work? Sometimes we're too, let's talk.",
      icon: 'code',
      name: 'Software Houses',
    },
  ];
}
