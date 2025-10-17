import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

/**
 * @component PartnershipsComponent
 * @description Create the component.
 */
@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.scss'],
  standalone: true,
  imports: [MatTabsModule, MatCardModule],
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
