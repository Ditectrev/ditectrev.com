import { Component } from "@angular/core";
import { MenuItem } from "../../interfaces";
import { SharedModule } from "../shared.module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class HeaderComponent {
  public onServicesClick(event: Event): void {
    // Prevent navigation when clicking to expand the dropdown
    event.preventDefault();
  }

  public menuItems: MenuItem[] = [
    { icon: "home", name: "Home", path: "/" },
    { icon: "playlist_add_check", name: "Services", path: "/services" },
    { icon: "fingerprint", name: "Methodology", path: "/methodology" },
    { icon: "sentiment_satisfied_alt", name: "About us", path: "/about-us" },
    { icon: "alternate_email", name: "Contact", path: "/contact" },
    { icon: "edit_note", name: "Blog", path: "https://blog.ditectrev.com", external: true },
    { icon: "school", name: "Education", path: "https://education.ditectrev.com", external: true },
    { icon: "shopping_cart", name: "Shop", path: "https://shop.ditectrev.com", external: true },
    { icon: "close", name: "Close", path: "/" },
  ];

  public servicesItems: MenuItem[] = [
    {
      icon: "security",
      name: "Cyber Security",
      path: "/services/cyber-security",
    },
    {
      icon: "star",
      name: "Digital Strategy",
      path: "/services/digital-strategy",
    },
    {
      icon: "code",
      name: "Software Development",
      path: "/services/software-development",
    },
  ];
}
