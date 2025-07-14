import { Component } from "@angular/core";

/**
 * @component SoftwareDevelopmentComponent
 * @description Create the component.
 */
@Component({
  selector: "app-software-development",
  templateUrl: "./software-development.component.html",
  styleUrls: ["./software-development.component.scss"],
})
export class SoftwareDevelopmentComponent {
  // Array to hold all Software Development services.
  public softwareDevelopmentItems: {
    description: string;
    name: string;
    src: string;
  }[] = [
    {
      description:
        "Amazon, Discord, Facebook, Google, MailChimp, Microsoft, PayPal, SAP, Slack, Stripe, More...",
      name: "Business Integrations",
      src: "assets/services/software-development/01_business_integrations.png",
    },
    {
      description:
        "Cloud Security, Cloud Infrastructure, DevOps, DevSecOps, Orchestration, SecDevOps, Serverless.",
      name: "Cloud Solutions",
      src: "assets/services/software-development/02_cloud_solutions.png",
    },
    {
      description:
        "Architecture Review, Design Review, Software Quality Advisory, Quality Assurance (QA), Software Testing, Test Coverage.",
      name: "Code Reviews",
      src: "assets/services/software-development/03_code_reviews.png",
    },
    {
      description: "Blog, eCommerce, Forum, Website.",
      name: "Content Management Systems",
      src:
        "assets/services/software-development/04_content_management_systems.png",
    },
    {
      description:
        "Application Programming Interfaces (API's), Backups, Hosting, Improvements, Maintenance, Migrations, Monitoring, Operations, Technical Support, Updates, Web Services.",
      name: "Complex Services",
      src: "assets/services/software-development/05_complex_services.png",
    },
    {
      description:
        "Artificial Intelligence (AI), Blockchain, Cryptocurrency Engineering, Deep Learning, Intelligent Process Automation (IPA), Legacy Re-Engineering, Machine Learning (ML).",
      name: "Custom Implementations",
      src: "assets/services/software-development/06_custom_implementations.png",
    },
    {
      description:
        "Growth Marketing, Integrations, Mobile Commerce (mCommerce), Omnichannel, Product Information Management (PIM), Selling Strategy.",
      name: "Electronic Commerce (eCommerce)",
      src: "assets/services/software-development/07_ecommerce.png",
    },
    {
      description:
        "Android, Cross-Platform Mobile Development, iOS, Native Mobile Application Development.",
      name: "Mobile Development",
      src: "assets/services/software-development/08_mobile_development.png",
    },
    {
      description:
        "Desktop Application, Offline Application, Push Notifications.",
      name: "Progressive Web Applications",
      src:
        "assets/services/software-development/09_progressive_web_applications.png",
    },
    {
      description: "Big Data, Data Mining, Emerging Technologies.",
      name: "Research & Discovery",
      src: "assets/services/software-development/10_research_and_discovery.png",
    },
    {
      description:
        "Automated Testing, End-to-End (E2E) Testing, Functional Testing, Integration, Manual Testing, Mutation Testing, Non-Functional Testing, Performance Testing, Regression Testing, Security Testing, Smoke Testing, Software Development Life Cycle (SDLC), Unit Testing.",
      name: "Software Quality Engineering",
      src:
        "assets/services/software-development/11_software_quality_engineering.png",
    },
    {
      description:
        "Web Applications - Backend, Backend For Frontend (BFF), Frontend, Micro Frontend, Microservices, Responsive Web Design (RWD), Search Engine Optimization (SEO), Web Content Accessibility Guidelines (WCAG).",
      name: "Web Development",
      src: "assets/services/software-development/12_web_development.png",
    },
  ];
}
