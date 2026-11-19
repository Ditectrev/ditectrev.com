import { Component } from "@angular/core";
import { ServiceDetailComponent } from "../service-detail/service-detail.component";
import { ServiceItem } from "@interfaces";

/**
 * @component CyberSecurityComponent
 * @description Create the component.
 */
@Component({
  selector: "app-cyber-security",
  standalone: true,
  imports: [ServiceDetailComponent],
  templateUrl: "./cyber-security.component.html",
})
export class CyberSecurityComponent {
  // Array to hold all Cyber Security services.
  public readonly cyberSecurityItems: ServiceItem[] = [
    {
      description:
        "Classifications, E-Law Advisory, General Data Protection Regulation (GDPR), International Organization for Standardization (ISO) 27001, Privacy Audits.",
      name: "Compliance Audits",
      src: "assets/services/cyber-security/01_compliance_audits.avif",
      width: 231,
      height: 200,
    },
    {
      description:
        "Control, Risks, Risk Mitigation, Threats, Threat Intelligence, Vulnerabilities.",
      name: "Cyber Research",
      src: "assets/services/cyber-security/02_cyber_research.avif",
      width: 192,
      height: 217,
    },
    {
      description: "Application Security, Penetration Testing.",
      name: "Ethical Hacking",
      src: "assets/services/cyber-security/03_ethical_hacking.avif",
      width: 253,
      height: 253,
    },
    {
      description: "Crashes, Memory Leaks, Security Investigation.",
      name: "Fuzzing",
      src: "assets/services/cyber-security/04_fuzzing.avif",
      width: 207,
      height: 207,
    },
    {
      description:
        "Chain of Custody, Digital Evidence, Investigate Attack, Unauthorized Access.",
      name: "Post-Incident Analysis",
      src: "assets/services/cyber-security/05_post_incident_analysis.avif",
      width: 240,
      height: 235,
    },
    {
      description:
        "Attack Vectors, Hacking Simulations, Reconnaissance, Threat Modelling.",
      name: "Proactive Cyber Defence",
      src: "assets/services/cyber-security/06_proactive_cyber_defence.avif",
      width: 327,
      height: 194,
    },
    {
      description: "System Reproduction, Software Architecture & Design.",
      name: "Reverse Engineering",
      src: "assets/services/cyber-security/07_reverse_engineering.avif",
      width: 278,
      height: 196,
    },
    {
      description:
        "Privacy by Design & Security, Secure Software Development Life Cycle (SSDLC), Security First, Software Development.",
      name: "Secure Programming",
      src: "assets/services/cyber-security/08_secure_programming.avif",
      width: 283,
      height: 241,
    },
    {
      description:
        "Black-Box Testing, Client-Side Attacks, Cryptanalysis, Gray-Box Testing, Mobile Application Security, Network Security, Physical Security, Server-Side Attacks, Vulnerability Analysis, White-Box Testing.",
      name: "Security Analysis",
      src: "assets/services/cyber-security/09_security_analysis.avif",
      width: 257,
      height: 223,
    },
    {
      description:
        "Blue & Red Teaming, Computer Security Incident Response Team (CSIRT), Cyber Risk Governance, Identity Management.",
      name: "Systems Security",
      src: "assets/services/cyber-security/10_systems_security.avif",
      width: 234,
      height: 224,
    },
    {
      description: "Psychological Manipulation, Weakest Link.",
      name: "Social Engineering",
      src: "assets/services/cyber-security/11_social_engineering.avif",
      width: 261,
      height: 196,
    },
    {
      description:
        "Code Quality, Databases, Frameworks, Performance, Scalability, Software Architecture, Software Security, Technical Documentation.",
      name: "Source Code Audits",
      src: "assets/services/cyber-security/12_source_code_audits.avif",
      width: 317,
      height: 233,
    },
  ];
}
