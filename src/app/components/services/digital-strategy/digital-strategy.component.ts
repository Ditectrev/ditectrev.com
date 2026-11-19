import { Component } from '@angular/core';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { ServiceItem } from '@interfaces';

/**
 * @component DigitalStrategyComponent
 * @description Create the component.
 */
@Component({
  selector: 'app-digital-strategy',
  standalone: true,
  imports: [ServiceDetailComponent],
  templateUrl: './digital-strategy.component.html',
})
export class DigitalStrategyComponent {
  // Array to hold all Digital Strategy services.
  public readonly digitalStrategyItems: ServiceItem[] = [
    {
      description:
        'Business Model Canvas, Business Processes, Customer Development & Journey, Customer Relationship Management (CRM), Innovation Acceleration, Lean Canvas, Product Management, User Journey Mapping.',
      name: 'Business Development',
      src: 'assets/services/digital-strategy/01_business_development.avif',
      width: 201,
      height: 208,
    },
    {
      description:
        'Competitive Analysis, Competitor Profiling, Emerging Startups, Media Scanning.',
      name: 'Competitors Analysis',
      src: 'assets/services/digital-strategy/02_competitors_analysis.avif',
      width: 329,
      height: 223,
    },
    {
      description: 'Digital Crowd, Indiegogo, Kickstarter.',
      name: 'Crowdfunding & Crowdsourcing',
      src:
        'assets/services/digital-strategy/03_crowdfunding_and_crowdsourcing.avif',
      width: 256,
      height: 256,
    },
    {
      description:
        'Brand Book, Concept Design, Design Science & Strategy, Organizational Psycholog, User Research, User Experience (UX) Audits',
      name: 'Culture Design',
      src: 'assets/services/digital-strategy/04_culture_design.avif',
      width: 214,
      height: 223,
    },
    {
      description:
        'Business Intelligence, Data Analytics, Data Operations, Data Platforms, Data Visualization, Database Monitoring, Web Scraping.',
      name: 'Data Analysis',
      src: 'assets/services/digital-strategy/05_data_analysis.avif',
      width: 326,
      height: 233,
    },
    {
      description:
        'Advertising, Brand Building & Communication, Conversion Rate Optimization (CRO), Growth Hacking, Search Engine Marketing (SEM), Social Media Marketing, Viral Marketing.',
      name: 'Digital Marketing',
      src: 'assets/services/digital-strategy/06_digital_marketing.avif',
      width: 299,
      height: 206,
    },
    {
      description:
        'Digital Opportunities, Focus Group, Marketing Strategy, Open-Source Intelligence (OSINT), PEST & SWOT Analysis, Product Strategy, Strategic Thinking.',
      name: 'Foresight & Trends',
      src: 'assets/services/digital-strategy/07_foresight_and_trends.avif',
      width: 268,
      height: 235,
    },
    {
      description:
        'Business Acceleration, Content Research, Everything as a Service (EaaS), Ideation, Incubation, Lead Generation.',
      name: 'Innovation Factory',
      src: 'assets/services/digital-strategy/08_innovation_factory.avif',
      width: 224,
      height: 248,
    },
    {
      description:
        'Audio & Video Streaming, Chatbots, Computer Vision, Internet of Things (IoT), Robotic Process Automation (RPA), Voice Assistants, Wireless Applications.',
      name: 'Interactive Systems',
      src: 'assets/services/digital-strategy/09_interactive_systems.avif',
      width: 302,
      height: 188,
    },
    {
      description:
        'Benchmark Analysis, Idea Validation, Lean Practices, Product Discovery & Improvements, Roadmaps.',
      name: 'Lean Innovation',
      src: 'assets/services/digital-strategy/10_lean_innovation.avif',
      width: 244,
      height: 271,
    },
    {
      description:
        'Concept Development, Graphics & Design, Lean User Experience (UX), Logo & Brand Identity, Motion Design, Prototyping, Validation Learning, Video & Animations.',
      name: "Minimum Viable Products (MVP's) & Proof of Concepts (PoF's)",
      src: 'assets/services/digital-strategy/11_mvps_and_pofs.avif',
      width: 207,
      height: 209,
    },
    {
      description:
        'DesignOps, Design Sprints, Mobile Design, Mockups, Sitemaps, User Interface (UI) Design, Visual Design, Web Design, Wireframing.',
      name: 'Product Design',
      src: 'assets/services/digital-strategy/12_product_design.avif',
      width: 200,
      height: 228,
    },
  ];
}
