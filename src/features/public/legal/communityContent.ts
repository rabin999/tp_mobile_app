import type { LegalGroup } from './legalDocument';
import { legalText } from './legalText';

export const communityGroups: readonly LegalGroup[] = [
  {
    title: legalText.providerTitle,
    intro:
      'Welcome to the True Professional community! Our platform connects skilled service providers with customers seeking reliable and trustworthy assistance. These guidelines ensure a respectful, safe, and professional environment for all. By following them, you contribute to fostering trust and delivering exceptional experiences.',
    clauses: [
      {
        title: 'Professionalism and Quality Service',
        paragraphs: [
          'Treat customers with respect, kindness, and professionalism.',
          'Deliver work that meets or exceeds customer expectations using proper tools and techniques.',
          'Be punctual, reliable, and committed to providing high-quality services.',
        ],
      },
      {
        title: 'Transparency and Honest Communication',
        paragraphs: [
          'Provide accurate information about your expertise, services, availability, and pricing.',
          'Clearly outline the scope of work and address any questions or concerns promptly.',
          'Use polite and professional language in all interactions.',
        ],
      },
      {
        title: 'Trust and Verification',
        paragraphs: [
          "Participate in the platform's verification process, including submitting valid identification and certifications.",
          'Keep your profile updated with accurate and truthful information.',
          'Honor commitments and maintain transparency in all transactions.',
        ],
      },
      {
        title: 'Safety and Compliance',
        paragraphs: [
          'Prioritize safety for yourself and your customers during service delivery.',
          'Follow all relevant laws, regulations, and safety standards for your profession.',
          'Avoid illegal, unsafe, or unethical activities.',
        ],
      },
      {
        title: 'Fairness and Equality',
        paragraphs: [
          'Treat all customers fairly and respectfully, regardless of background or preferences.',
          'Avoid discriminatory behavior and foster inclusivity.',
          'Resolve misunderstandings with a willingness to find equitable solutions.',
        ],
      },
      {
        title: 'Accountability and Ownership',
        paragraphs: [
          'Take responsibility for your actions and address mistakes promptly and professionally.',
          'Inform customers when tasks exceed your expertise and commit to resolving issues effectively.',
        ],
      },
      {
        title: 'Platform Integrity',
        paragraphs: [
          'Use the platform responsibly, adhering to all policies and guidelines.',
          "Avoid fraudulent practices, misrepresentation, or actions that harm the community's reputation.",
          'Report unethical behavior or guideline violations to the support team.',
        ],
      },
      {
        title: 'Positive Community Engagement',
        paragraphs: [
          'Support fellow service providers by sharing advice and constructive feedback.',
          'Avoid spamming, fraudulent activities, or soliciting services outside the platform.',
          'Actively participate in creating a collaborative, professional community.',
        ],
      },
      {
        title: 'Ethical Growth and Improvement',
        paragraphs: [
          'Continuously enhance your skills to deliver the best possible service.',
          'Build trust through ethical practices and by maintaining customer privacy.',
          "Contribute to the community's growth by mentoring and inspiring others.",
        ],
      },
    ],
    closingTitle: legalText.commitmentTitle,
    closing:
      'By following these guidelines, you contribute to a thriving, trusted community that benefits both service providers and customers. Non-compliance may result in penalties, including temporary suspension or permanent removal from the platform. Together, let’s create a safe, professional, and supportive environment for all.',
  },
  {
    title: legalText.everyoneTitle,
    intro:
      'Welcome to True Professional! Our platform is built on trust, collaboration, and respect. To ensure a positive experience for everyone, we’ve outlined these community guidelines to help foster a safe and professional environment for both customers and service providers. By using True Professional, you agree to adhere to these principles.',
    clauses: [
      {
        title: 'Be Respectful',
        paragraphs: [
          'Treat everyone with courtesy and kindness.',
          'Discrimination, harassment, or offensive language will not be tolerated. We celebrate diversity and aim to create a welcoming space for all.',
        ],
      },
      {
        title: 'Honesty is Key',
        paragraphs: [
          'Provide accurate information about your needs when posting a request or contacting a service provider. Transparent communication helps build trust and ensures smooth interactions.',
        ],
      },
      {
        title: 'Stay Safe',
        paragraphs: [
          'Avoid sharing sensitive personal information like passwords, financial details, or private addresses in public posts or messages.',
          'Use True Professional’s communication tools to connect securely.',
        ],
      },
      {
        title: 'Fair Communication',
        paragraphs: [
          'Be clear and concise when explaining your requirements or providing feedback.',
          'Approach disagreements calmly and respectfully, aiming for solutions rather than conflict.',
        ],
      },
      {
        title: 'Support Local Expertise',
        paragraphs: [
          'True Professional is built to empower local skilled professionals. Engage meaningfully and give constructive feedback to help improve the quality of services offered.',
        ],
      },
      {
        title: 'No Unlawful Activities',
        paragraphs: [
          'Ensure all requests, communications, and transactions comply with Nepal’s laws and regulations.',
          'Illegal activities or requests are strictly prohibited.',
        ],
      },
      {
        title: 'Verify Before You Commit',
        paragraphs: [
          'While we verify service providers on our platform, customers should also perform their due diligence before engaging a professional.',
          'Check reviews, credentials, and ratings for added confidence.',
        ],
      },
      {
        title: 'Keep the Platform Professional',
        paragraphs: [
          'Do not post inappropriate or irrelevant content.',
          'Spam, fake profiles, and misleading information will result in removal from the platform.',
        ],
      },
      {
        title: 'Timely Payments',
        paragraphs: [
          'Respect the time and effort of service providers by paying promptly for services rendered.',
          'Payment disputes should be reported to us immediately for resolution.',
        ],
      },
      {
        title: 'Report Issues',
        paragraphs: [
          'Help us maintain a safe and professional platform. If you encounter suspicious behavior, fraudulent activities, or violations of these guidelines, please report it to our team.',
        ],
      },
      {
        title: 'Respect Time and Commitments',
        paragraphs: [
          'Both customers and service providers should respect agreed-upon schedules and commitments. Notify the other party in advance if changes are necessary to avoid inconvenience',
        ],
      },
      {
        title: 'Provide Honest Reviews',
        paragraphs: [
          'After completing a service, leave fair and constructive reviews. Your feedback helps other customers and service providers improve their services and make informed decisions.',
        ],
      },
      {
        title: 'Be Responsible with Cancellations',
        paragraphs: [
          'Cancellations should only happen when absolutely necessary.',
          'If you need to cancel a service, inform the provider as early as possible to minimize disruptions.',
        ],
      },
      {
        title: 'Environmentally Conscious Practices',
        paragraphs: [
          'Encourage sustainable practices when possible, such as requesting eco-friendly solutions or reducing waste in your service requirements.',
        ],
      },
      {
        title: 'Promote Skill Development',
        paragraphs: [
          'Support service providers by acknowledging their expertise and providing constructive feedback. Consider recommending their services to others if you’re satisfied with their work.',
        ],
      },
      {
        title: 'Clear Dispute Resolution Process',
        paragraphs: [
          'In case of disputes, both parties are encouraged to resolve them amicably.',
          "If resolution isn't possible, True Professional offers mediation services to ensure fairness.",
        ],
      },
      {
        title: 'Real-Time Data Usage',
        paragraphs: [
          'Our platform ensures real-time data updates for service availability. Always double-check the information before making decisions.',
        ],
      },
      {
        title: 'Inclusivity and Accessibility',
        paragraphs: [
          'We are committed to inclusivity. If you have specific accessibility needs, feel free to communicate them with the service provider, and they’ll strive to accommodate you.',
        ],
      },
      {
        title: 'Privacy Policy',
        paragraphs: [
          'For your safety and peace of mind, please review our Privacy Policy to understand how your data is protected. We are committed to safeguarding your personal information.',
        ],
      },
    ],
    closing:
      'We believe in building a trustworthy and efficient community where everyone thrives. Your adherence to these guidelines ensures a better experience for all users. Thank you for being part of True Professional!',
  },
  {
    title: legalText.prohibitedTitle,
    intro:
      'To maintain the integrity of the platform, the following behaviors are strictly prohibited for both customers and service providers:',
    clauses: [
      {
        title: 'Fake Reviews',
        paragraphs: [
          'Submitting fake or misleading reviews, whether positive or negative, is prohibited. All reviews must be genuine and reflect the true experience of the service.',
        ],
      },
      {
        title: 'Fake Posts and Profiles',
        paragraphs: [
          'Creating false service listings, profiles, or requests with the intent to mislead or deceive other users is not allowed.',
        ],
      },
      {
        title: 'Scamming and Fraud',
        paragraphs: [
          'Any form of scam, including charging for services not rendered, misrepresentation of services, or any attempt to deceive others, is strictly prohibited.',
        ],
      },
      {
        title: 'Inappropriate Content',
        paragraphs: [
          'Posting explicit, offensive, or inappropriate content, including nudity, hate speech, or discriminatory remarks, is not allowed.',
        ],
      },
      {
        title: 'Harassment or Abuse',
        paragraphs: [
          'Any form of harassment, whether verbal, physical, or emotional, will result in immediate action. This includes bullying, threats, or coercion of any kind.',
        ],
      },
      {
        title: 'Unauthorized Use of Personal Data',
        paragraphs: [
          'Sharing or using personal data without consent is prohibited. This includes spamming users or using their contact information for unsolicited offers.',
        ],
      },
      {
        title: 'Unlawful Activities',
        paragraphs: [
          'Any actions that violate the laws and regulations of Nepal are strictly prohibited on the platform.',
        ],
      },
    ],
  },
];
