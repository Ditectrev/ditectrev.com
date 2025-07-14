import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
  ]
})
export class HeaderComponent {
  public menuItems: { icon: string; name: string; path: string }[] = [
    { icon: "home", name: "Home", path: "/" },
    { icon: "playlist_add_check", name: "Services", path: "/services" },
    { icon: "fingerprint", name: "Methodology", path: "/methodology" },
    { icon: "sentiment_satisfied_alt", name: "About us", path: "/about-us" },
    // { icon: 'format_quote', name: 'Blog', path: '/blog' }, // TODO: Change blog to external URL.
    { icon: "alternate_email", name: "Contact", path: "/contact" },
    { icon: "close", name: "Close", path: "/" },
  ];

  // Change this as a subroute (not child) of services.
  public servicesItems: { icon: string; name: string; path: string }[] = [
    {
      icon: "security",
      name: "Cyber Security",
      path: "/cyber-security",
    },
    {
      icon: "star",
      name: "Digital Strategy",
      path: "/digital-strategy",
    },
    {
      icon: "code",
      name: "Software Development",
      path: "/software-development",
    },
  ];
}
