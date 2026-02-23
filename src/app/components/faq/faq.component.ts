import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { FaqQuestions } from "../../interfaces";
import { SharedModule } from "../shared.module";

export const FAQ_QUESTIONS: FaqQuestions[] = [
  {
    category: "Basics",
    questions: [
      {
        answer:
          "We provide online education supported by our blog and three categories of services, i.e. Cyber Security, Digital Strategy and Software Development. Our blog and educational content is related to these three types of services.",
        question: "What are you doing?",
      },
      {
        answer: "The FAQ answers Frequently Asked Questions (FAQ).",
        question: "What is the page about?",
      },
    ],
  },
  {
    category: "Blog",
    questions: [
      {
        answer:
          "We publish educational content on our blog, which is free to use.",
        question: "What is the role of the blog?",
      },
      {
        answer:
          "On blog we share best practices related to our services and education, therefore (very) partially yes.",
        question: "Is the content of the blog related to your services?",
      },
    ],
  },
  {
    category: "Company",
    questions: [
      {
        answer:
          "We are IT company providing online education content and IT Consulting.",
        question: "What is Ditectrev?",
      },
      {
        answer:
          "We are working fully remotely from different countries and the company is registered in Poland.",
        question: "Where is the company located?",
      },
      {
        answer: "It is small, few people are working here.",
        question: "How big is the company?",
      },
    ],
  },
  {
    category: "Education",
    questions: [
      {
        answer:
          "We publish on Udemy and partially on YouTube, however in future we are planning to launch our own platform as well.",
        question: "Where can I watch the online courses?",
      },
      {
        answer:
          "Some of the technologies we use we record, however no single information from any of our commercial projects will be never disclosed.",
        question: "Is the content of the education related to your services?",
      },
      {
        answer:
          "We use Freemium content, i.e. some of the content is paid, whereas some is free.",
        question: "Is it free?",
      },
    ],
  },

  {
    category: "Finance",
    questions: [
      {
        answer:
          "Budgets for all projects are evaluated individually, the same for rates.",
        question: "How much does it costs?",
      },
      {
        answer:
          "We split it into multiple parts according to the flow of the project. During early stage of each project you receive basic functionality/prototype/sketch for free, if you like it then we will continue and ask for the first payment at that stage.",
        question: "How goes the payment?",
      },
      {
        answer:
          "Due to European legislation we have to include VAT in prices for our European clients. Non-EU clients have excluded VAT.",
        question: "Does the price includes Value Added Tax (VAT)?",
      },
      {
        answer:
          "We prefer euros (EUR), but we try to be flexible about your preferences.",
        question: "Which currency is being used for transactions?",
      },
      {
        answer:
          "All fees are on you, we require to receive to our bank account the same amount, which is specified on the invoice.",
        question: "What about payment processing fees (bank, PayPal, etc.)?",
      },
    ],
  },
  {
    category: "Legal",
    questions: [
      {
        answer:
          "Please check our <a href=\"/privacy-and-security\">Privacy & Security policy</a> for in-depth reading.",
        question: "How my personal data is being used?",
      },
      {
        answer:
          "We are governed by Polish law, therefore courts of Poland will have exclusive jurisdiction.",
        question: "Which country's laws apply to any disputes?",
      },
      {
        answer:
          "Yes, we do - for detailed explanation how we do so please check our <a href=\"/privacy-and-security\">Privacy & Security policy</a>.",
        question: "Are you using Cookies?",
      },
      {
        answer:
          "IBStructure Daniel Danielecki, Irysowa 18, 55-220 Jelcz-Laskowice, Poland, PL9121899240 ",
        question: "What is on the invoice from Ditectrev perspective?",
      },
      {
        answer:
          "Yes, please reach out to us with your own template if you have one.",
        question: "Can you sign a Non-Disclosure Agreement (NDA)?",
      },
    ],
  },
  {
    category: "Methodology",
    questions: [
      {
        answer:
          "We are working using agile technique called Scrum. This is a process for managing projects which relies on frequent updates of a client and delivering small parts, but often during project ongoing.",
        question: "How are you working?",
      },
      {
        answer:
          "The high level of overview you can find in our <a href=\"/methodology\">Methodology page</a>.",
        question: "What are the phases of each project?",
      },
      {
        answer:
          "Background of the problem to be solved, some initial information and useful materials which could have been helpful for us. Of course we will need also a bit of your time.",
        question: "What do you expect from me?",
      },
      {
        answer:
          "Yes, on every project stage we ask you to take a look and continue working based on your feedback.",
        question: "Am I involved in this project?",
      },
    ],
  },

  {
    category: "Services",
    questions: [
      {
        category: "Cyber Security",
        questions: [
          {
            answer: "Majority of our tools are related to Kali Linux.",
            question: "Which tools are you using?",
          },
          {
            answer:
              "If we have your permission and you are the owner or executive - yes.",
            question: "Is it legal?",
          },
          {
            answer:
              "Yes, we need it. Proof that you are the owner of the assets, infrastructure etc. on which we are supposed to do our work is also required.",
            question: "Do you need some permissions?",
          },
          {
            answer:
              "This is a must, otherwise we cannot do anything from legal point of view. The same basically applies to other our services, but for Cyber Security it is more strict.",
            question:
              "Do I have to be owner or an executive of the infrastructure to be tested from security point of view?",
          },
        ],
      },
      {
        category: "Digital Strategy",
        questions: [
          {
            answer:
              "There are lots of tools we use for this services, to name a few: Facebook Business Manager, Google Analytics, Google Lighthouse, Hotjar, MailChimp, SEO PowerSuite, Web Vitals, Yoast.",
            question: "Which tools are you using?",
          },
          {
            answer:
              "This is something we cannot guarantee, but we are always doing our best.",
            question: "Is my online success guaranteed?",
          },
          {
            answer:
              "We will provide you tools to do so, it strongly depends by a project. An important note is we focus on long-term Digital Strategy, therefore to see the first effects it may take some time.",
            question: "How can I monitor your progress of what you have done?",
          },
        ],
      },
      {
        category: "Software Development",
        questions: [
          {
            answer:
              "Angular, Apollo, Cypress, Deno, Docker, Firebase, GraphQL, Ionic, JavaScript, Jest, MongoDB, NativeScript, Nginx, Node.js, PrestaShop, React, React Native, TypeScript, Vue.js, WooCommerce, WordPress.",
            question: "Which technologies are you using?",
          },
          {
            answer:
              "Yes, the General Data Protection Regulation (GDPR) and other privacy laws enforces this on us.",
            question:
              "Do I need a domain, hosting and other required infrastructure for my applications, websites etc.?",
          },
          {
            answer:
              "It depends, if the application is relatively small then 1 hosting can host more than 1 application. Some hostings are really powerful, therefore in that case it would be not required.",
            question: "Do I need to buy a new hosting for each application?",
          },
        ],
      },
    ],
  },
  {
    category: "Technical terminology",
    questions: [
      {
        answer:
          "Many technical keywords are described in our <a href=\"/glossary\">Glossary</a>. If you would not find an answer neither in the FAQ nor in the Glossary do not hesitate to <a href=\"/contact\">Contact us</a>.",
        question:
          "Sometimes I cannot understand technical words, where to find clarification for those?",
      },
    ],
  },
];

/**
 * @component FaqComponent
 * @description Create the component.
 */
@Component({
  selector: "app-faq",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"],
})
export class FaqComponent {
  // Control the expand/collapse state of FAQ items.
  public treeControl: NestedTreeControl<FaqQuestions> = new NestedTreeControl<
    FaqQuestions
  >((node) => node.questions);
  // Data source for nested FAQ items.
  public dataSource: MatTreeNestedDataSource<
    FaqQuestions
  > = new MatTreeNestedDataSource<FaqQuestions>();

  /**
   * @constructor
   * @description Create a new instance of this component.
   * @param {DomSanitizer} sanitizer Angular service that sanitizes HTML content to prevent XSS attacks by marking content as safe for rendering.
   */
  constructor(private sanitizer: DomSanitizer) {
    this.dataSource.data = FAQ_QUESTIONS; // Get data source of FAQ questions.
  }

  /**
   * @access public
   * @description Sanitize HTML content to safely render links in FAQ answers.
   * Allows anchor tags with href attributes for internal navigation.
   * @function sanitizeHtml
   * @param {string} html HTML string to sanitize.
   * @returns {SafeHtml} Sanitized HTML safe for rendering.
   */
  public sanitizeHtml(html: string): SafeHtml {
    if (!html) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }
    // Allow anchor tags with href for internal links
    // DomSanitizer will strip dangerous attributes but keep safe ones like href
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
   * @access public
   * @description Check if FAQ item (parent) has a subcategory (child) item(s).
   * @function hasChild
   * @param {number} _ Number of FAQ items.
   * @param {FaqQuestions} node Object of FAQ items.
   * @returns {boolean}
   */
  public hasChild(_: number, node: FaqQuestions): boolean {
    return !!node.questions && node.questions.length > 0; // '!!' is truthiness (represented as a boolean) - it's simply casting. It gives the ability to check the truthiness of multiple variables against each other in a repeatable, standardized (and JSLint friendly) fashion.
  }
}
