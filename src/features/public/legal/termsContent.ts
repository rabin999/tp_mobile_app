import type { LegalGroup } from './legalDocument';
import { legalText } from './legalText';

export const termsGroup: LegalGroup = {
  title: legalText.termsTitle,
  intro:
    'Welcome to True Professional, a digital platform connecting service providers and customers seeking various professional services. By using our platform, you agree to comply with these Terms and Conditions. Please read them carefully.',
  clauses: [
    {
      title: 'Introduction',
      paragraphs: [
        'True Professional ("we," "our," or "the platform") is a digital service connecting skilled and experienced service providers ("Service Providers") with potential customers ("Customers") seeking their services.',
        'By using the True Professional platform, you agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree with any part of these terms, please refrain from using our platform.',
      ],
    },
    {
      title: 'Platform Usage',
      paragraphs: [
        'True Professional offers a wide range of service providers from various fields, including milk sellers, gas sellers, plumbers, doctors, engineers, contractors, and more. Users can search for Service Providers based on their specific needs and location.',
        'True Professional serves as an intermediary platform, facilitating communication between Customers and Service Providers. We do not endorse or guarantee the quality of services provided by Service Providers',
        'All Service Providers listed on the True Professional platform undergo a verification process. To ensure the safety and reliability of our platform, we may collect citizenship documents from Service Providers to perform background checks, including police reports.',
        'True Professional endeavors to verify the information provided by Service Providers, but we do not guarantee the accuracy, reliability, or completeness of the information.',
      ],
    },
    {
      title: 'Customer Guidelines and Responsibilities',
      paragraphs: [
        'Customers are solely responsible for their interactions with Service Providers and any decisions made based on the information provided by them.',
        'Customers are encouraged to thoroughly review and evaluate the qualifications, skills, and experience of the Service Providers before engaging in any service exchange.',
        'True Professional may offer guidelines and best practices to protect Customers during their interactions with Service Providers. However, Customers acknowledge that any actions taken based on these guidelines are at their own risk.',
      ],
    },
    {
      title: 'Emergency Situations',
      paragraphs: [
        'In the event of an emergency during an ongoing service, True Professional provides an emergency button feature for Customers. If a Customer presses the emergency button, the relevant authority will be immediately notified unless  the Customer cancels the emergency alert by pressing  the "Cancel" button within 8 seconds.',
        'True Professional will make reasonable efforts to ensure that the emergency notification system functions correctly. However, we do not guarantee the response time or actions taken by the relevant authority.',
      ],
    },
    {
      title: 'Limitation of Liability',
      paragraphs: [
        'True Professional shall not be held liable for any damages, losses, or claims arising from the services provided by Service Providers. Any dispute or issue arising between Customers and Service Providers is solely between the parties involved.',
        'True Professional shall not be responsible for any misrepresentation, non-performance, or dissatisfaction with the services provided by Service Providers.',
        'Customers agree to release True Professional and its affiliates from any claims, demands, or damages (actual or consequential) arising from their use of the platform.',
      ],
    },
    {
      title: 'Indemnification',
      paragraphs: [
        'Customers agree to indemnify and hold True Professional, its officers, directors, employees, and agents harmless from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from their use of the platform or any violation of these Terms and Conditions.',
      ],
    },
    {
      title: 'Modifications and Termination',
      paragraphs: [
        'True Professional reserves the right to modify or terminate the platform, its services, or these Terms and Conditions at any time without prior notice.',
        'If any provision of these Terms and Conditions is found to be invalid or unenforceable, such provision shall be deemed severed from these terms, and the remaining provisions shall remain in full force and effect.',
      ],
    },
    {
      title: 'Governing Law and Jurisdiction',
      paragraphs: [
        'These Terms and Conditions shall be governed by and construed in accordance with the laws of Nepal.',
        'Any disputes arising from the use of the True Professional platform shall be subject to the exclusive jurisdiction of the courts of Nepal.',
      ],
    },
  ],
};
