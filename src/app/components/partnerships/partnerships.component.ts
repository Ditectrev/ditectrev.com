import { Component } from '@angular/core';
import { PartnershipItem } from '@interfaces';
import { SharedModule } from '../shared.module';

/**
 * @component PartnershipsComponent
 * @description Create the component.
 */
@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class PartnershipsComponent {
  public partnershipsItems: PartnershipItem[] = [
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
