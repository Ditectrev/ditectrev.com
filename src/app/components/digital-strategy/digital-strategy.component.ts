import { Component } from '@angular/core';

/**
 * @component DigitalStrategyComponent
 * @description Create the component.
 */
@Component({
  selector: 'app-digital-strategy',
  templateUrl: './digital-strategy.component.html',
  styleUrls: ['./digital-strategy.component.scss'],
})
export class DigitalStrategyComponent {
  // Array to hold all Digital Strategy services.
  public digitalStrategyItems: {
    description: string;
    name: string;
    src: string;
  }[] = [
    {
      description:
        'Business Model Canvas, Business Processes, Customer Development & Journey, Customer Relationship Management (CRM), Innovation Acceleration, Lean Canvas, Product Management, User Journey Mapping.',
      name: 'Business Development',
      src: 'assets/services/digital-strategy/01_business_development.png',
    },
    {
      description:
        'Competitive Analysis, Competitor Profiling, Emerging Startups, Media Scanning.',
      name: 'Competitors Analysis',
      src: 'assets/services/digital-strategy/02_competitors_analysis.png',
    },
    {
      description: 'Digital Crowd, Indiegogo, Kickstarter.',
      name: 'Crowdfunding & Crowdsourcing',
      src:
        'assets/services/digital-strategy/03_crowdfunding_and_crowdsourcing.png',
    },
    {
      description:
        'Brand Book, Concept Design, Design Science & Strategy, Organizational Psycholog, User Research, User Experience (UX) Audits',
      name: 'Culture Design',
      src: 'assets/services/digital-strategy/04_culture_design.png',
    },
    {
      description:
        'Business Intelligence, Data Analytics, Data Operations, Data Platforms, Data Visualization, Database Monitoring, Web Scraping.',
      name: 'Data Analysis',
      src: 'assets/services/digital-strategy/05_data_analysis.png',
    },
    {
      description:
        'Advertising, Brand Building & Communication, Conversion Rate Optimization (CRO), Growth Hacking, Search Engine Marketing (SEM), Social Media Marketing, Viral Marketing.',
      name: 'Digital Marketing',
      src: 'assets/services/digital-strategy/06_digital_marketing.png',
    },
    {
      description:
        'Digital Opportunities, Focus Group, Marketing Strategy, Open-Source Intelligence (OSINT), PEST & SWOT Analysis, Product Strategy, Strategic Thinking.',
      name: 'Foresight & Trends',
      src: 'assets/services/digital-strategy/07_foresight_and_trends.png',
    },
    {
      description:
        'Business Acceleration, Content Research, Everything as a Service (EaaS), Ideation, Incubation, Lead Generation.',
      name: 'Innovation Factory',
      src: 'assets/services/digital-strategy/08_innovation_factory.png',
    },
    {
      description:
        'Audio & Video Streaming, Chatbots, Computer Vision, Internet of Things (IoT), Robotic Process Automation (RPA), Voice Assistants, Wireless Applications.',
      name: 'Interactive Systems',
      src: 'assets/services/digital-strategy/09_interactive_systems.png.png',
    },
    {
      description:
        'Benchmark Analysis, Idea Validation, Lean Practices, Product Discovery & Improvements, Roadmaps.',
      name: 'Lean Innovation',
      src: 'assets/services/digital-strategy/10_lean_innovation.png',
    },
    {
      description:
        'Concept Development, Graphics & Design, Lean User Experience (UX), Logo & Brand Identity, Motion Design, Prototyping, Validation Learning, Video & Animations.',
      name: "Minimum Viable Products (MVP's) & Proof of Concepts (PoF's)",
      src: 'assets/services/digital-strategy/11_mvps_and_pofs.png',
    },
    {
      description:
        'DesignOps, Design Sprints, Mobile Design, Mockups, Sitemaps, User Interface (UI) Design, Visual Design, Web Design, Wireframing.',
      name: 'Product Design',
      src: 'assets/services/digital-strategy/12_product_design.png',
    },
  ];
}
