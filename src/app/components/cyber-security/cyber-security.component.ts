import { Component } from "@angular/core";

/**
 * @component CyberSecurityComponent
 * @description Create the component.
 */
@Component({
  selector: "app-cyber-security",
  templateUrl: "./cyber-security.component.html",
  styleUrls: ["./cyber-security.component.scss"],
})
export class CyberSecurityComponent {
  // Array to hold all Cyber Security services.
  public cyberSecurityItems: {
    description: string;
    name: string;
    src: string;
  }[] = [
    {
      description:
        "Classifications, E-Law Advisory, General Data Protection Regulation (GDPR), International Organization for Standardization (ISO) 27001, Privacy Audits.",
      name: "Compliance Audits",
      src: "assets/services/cyber-security/01_compliance_audits.png",
    },
    {
      description:
        "Control, Risks, Risk Mitigation, Threats, Threat Intelligence, Vulnerabilities.",
      name: "Cyber Research",
      src: "assets/services/cyber-security/02_cyber_research.png",
    },
    {
      description: "Application Security, Penetration Testing.",
      name: "Ethical Hacking",
      src: "assets/services/cyber-security/03_ethical_hacking.png",
    },
    {
      description: "Crashes, Memory Leaks, Security Investigation.",
      name: "Fuzzing",
      src: "assets/services/cyber-security/04_fuzzing.png",
    },
    {
      description:
        "Chain of Custody, Digital Evidence, Investigate Attack, Unauthorized Access.",
      name: "Post-Incident Analysis",
      src: "assets/services/cyber-security/05_post_incident_analysis.png",
    },
    {
      description:
        "Attack Vectors, Hacking Simulations, Reconnaissance, Threat Modelling.",
      name: "Proactive Cyber Defence",
      src: "assets/services/cyber-security/06_proactive_cyber_defence.png",
    },
    {
      description: "System Reproduction, Software Architecture & Design.",
      name: "Reverse Engineering",
      src: "assets/services/cyber-security/07_reverse_engineering.png",
    },
    {
      description:
        "Privacy by Design & Security, Secure Software Development Life Cycle (SSDLC), Security First, Software Development.",
      name: "Secure Programming",
      src: "assets/services/cyber-security/08_secure_programming.png",
    },
    {
      description:
        "Black-Box Testing, Client-Side Attacks, Cryptanalysis, Gray-Box Testing, Mobile Application Security, Network Security, Physical Security, Server-Side Attacks, Vulnerability Analysis, White-Box Testing.",
      name: "Security Analysis",
      src: "assets/services/cyber-security/09_security_analysis.png",
    },
    {
      description:
        "Blue & Red Teaming, Computer Security Incident Response Team (CSIRT), Cyber Risk Governance, Identity Management.",
      name: "Systems Security",
      src: "assets/services/cyber-security/10_systems_security.png",
    },
    {
      description: "Psychological Manipulation, Weakest Link.",
      name: "Social Engineering",
      src: "assets/services/cyber-security/11_social_engineering.png",
    },
    {
      description:
        "Code Quality, Databases, Frameworks, Performance, Scalability, Software Architecture, Software Security, Technical Documentation.",
      name: "Source Code Audits",
      src: "assets/services/cyber-security/12_source_code_audits.png",
    },
  ];
}
