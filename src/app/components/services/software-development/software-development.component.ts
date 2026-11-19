import { Component } from "@angular/core";
import { ServiceDetailComponent } from "../service-detail/service-detail.component";
import { ServiceItem } from "@interfaces";

/**
 * @component SoftwareDevelopmentComponent
 * @description Create the component.
 */
@Component({
  selector: "app-software-development",
  standalone: true,
  imports: [ServiceDetailComponent],
  templateUrl: "./software-development.component.html",
})
export class SoftwareDevelopmentComponent {
  // Array to hold all Software Development services.
  public readonly softwareDevelopmentItems: ServiceItem[] = [
    {
      description:
        "Amazon, Discord, Facebook, Google, MailChimp, Microsoft, PayPal, SAP, Slack, Stripe, More...",
      name: "Business Integrations",
      src: "assets/services/software-development/01_business_integrations.avif",
    },
    {
      description:
        "Cloud Security, Cloud Infrastructure, DevOps, DevSecOps, Orchestration, SecDevOps, Serverless.",
      name: "Cloud Solutions",
      src: "assets/services/software-development/02_cloud_solutions.avif",
    },
    {
      description:
        "Architecture Review, Design Review, Software Quality Advisory, Quality Assurance (QA), Software Testing, Test Coverage.",
      name: "Code Reviews",
      src: "assets/services/software-development/03_code_reviews.avif",
    },
    {
      description: "Blog, eCommerce, Forum, Website.",
      name: "Content Management Systems",
      src:
        "assets/services/software-development/04_content_management_systems.avif",
    },
    {
      description:
        "Application Programming Interfaces (API's), Backups, Hosting, Improvements, Maintenance, Migrations, Monitoring, Operations, Technical Support, Updates, Web Services.",
      name: "Complex Services",
      src: "assets/services/software-development/05_complex_services.avif",
    },
    {
      description:
        "Artificial Intelligence (AI), Blockchain, Cryptocurrency Engineering, Deep Learning, Intelligent Process Automation (IPA), Legacy Re-Engineering, Machine Learning (ML).",
      name: "Custom Implementations",
      src: "assets/services/software-development/06_custom_implementations.avif",
    },
    {
      description:
        "Growth Marketing, Integrations, Mobile Commerce (mCommerce), Omnichannel, Product Information Management (PIM), Selling Strategy.",
      name: "Electronic Commerce (eCommerce)",
      src: "assets/services/software-development/07_ecommerce.avif",
    },
    {
      description:
        "Android, Cross-Platform Mobile Development, iOS, Native Mobile Application Development.",
      name: "Mobile Development",
      src: "assets/services/software-development/08_mobile_development.avif",
    },
    {
      description:
        "Desktop Application, Offline Application, Push Notifications.",
      name: "Progressive Web Applications",
      src:
        "assets/services/software-development/09_progressive_web_applications.avif",
    },
    {
      description: "Big Data, Data Mining, Emerging Technologies.",
      name: "Research & Discovery",
      src: "assets/services/software-development/10_research_and_discovery.avif",
    },
    {
      description:
        "Automated Testing, End-to-End (E2E) Testing, Functional Testing, Integration, Manual Testing, Mutation Testing, Non-Functional Testing, Performance Testing, Regression Testing, Security Testing, Smoke Testing, Software Development Life Cycle (SDLC), Unit Testing.",
      name: "Software Quality Engineering",
      src:
        "assets/services/software-development/11_software_quality_engineering.avif",
    },
    {
      description:
        "Web Applications - Backend, Backend For Frontend (BFF), Frontend, Micro Frontend, Microservices, Responsive Web Design (RWD), Search Engine Optimization (SEO), Web Content Accessibility Guidelines (WCAG).",
      name: "Web Development",
      src: "assets/services/software-development/12_web_development.avif",
    },
  ];
}
