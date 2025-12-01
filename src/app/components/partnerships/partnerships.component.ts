import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PartnershipItem } from '@interfaces';

/**
 * @component PartnershipsComponent
 * @description Create the component.
 */
@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.scss'],
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatIconModule, CommonModule],
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
