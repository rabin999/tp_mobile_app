import { appConfig } from '../../../app/config';
import type { PrivacyBlock } from './legalDocument';
import { legalText } from './legalText';

/**
 * Opening copy for the privacy page, including the public site URL.
 */
export const privacyIntro = `True Professional.com (“we”, “Our” or us) is committed to protecting your privacy. This Privacy policy explains how your personal information is collected, used and disclosed by True Professional.com. This privacy policies applies to our websites, ${appConfig.publicSiteUrl} , and its associated subdomains (Collectively, our service”) alongside our application, True Professional. By accessing or using our service, you signify that you have read, understood and agree to our collection, storage, use and disclosure of your personal information as described in the privacy policy and our terms of service.`;

export const privacyTitle = legalText.privacyTitle;

export const privacyBlocks: readonly PrivacyBlock[] = [
  {
    heading: 'What Information do we collect?',
    paragraphsBefore: [
      'We collect information from you when you visit our service, register, place an order, subscribe to our newsletter, respond to our survey or fill the form.',
    ],
    bullets: [
      'Name',
      'Phone Numbers',
      'Email Addresses',
      'Billing Addresses',
      'Password',
    ],
    paragraphsAfter: [
      'We also collect information from mobile devices for better user experience although these features are completely optional.',
    ],
  },
  {
    heading: 'How Do we use the Information we collect?',
    paragraphsBefore: [
      'Any of the information we collect from you may be used in one of the following ways:',
    ],
    bullets: [
      'To personalize your experience (your information helps us to better respond to your individual needs)',
      'To improve our service (we continually strive to improve our service offerings based on the information and feedbacks we receive from you',
      'To improve customer service (your information helps us to more effectively respond to your customer service request and needs)',
      'To process transactions',
      'To administer a contest, promotion, survey or other site feature.',
      'To send periodic emails.',
    ],
  },
  {
    heading: 'When do we use customer information from third parties?',
    paragraphsBefore: [
      'We receive some information from the third parties when you contact us. For example: when you submit your email address to us to show interest in becoming our customer., we receive information from a third party that provides automated fraud detection service to us. We also occasionally collect information that is made publicly available on social media websites. You can control how much of your information social media websites make public by visiting these websites and changing your privacy settings.',
    ],
  },
  {
    heading: 'Do we Share the information we collect with third parties',
    paragraphsBefore: [
      'We may share the information that we collect, both personal and non-personal with third parties such as advertisers, contest sponsor, promotional and marketing partners and offers who may provide our content or whose products or service we think may interest you. We may also share it with our current and future affiliated companies or business partners, and if we are involved in a merger, asset sale or other business reorganization, we may also share or transfer your information to our successor. We may engage trusted third-party service providers to perform functions and provide services to us, such as hosting and maintaining our servers and our service, database storage and management e-mail management, storage marketing, credit card processing, customer service and fulfilling orders for products and services you may purchase through our platform. We will likely share your personal information, and possibly some non-personal information with these third parties to enable them to perform these services for us and for you. We may share portions of our log file data, including IP addresses for analytics purposes with third parties such as web analytics partners, application developers, and ad networks. If your P address is shared, it may be used to estimate general location and other technographics such as connection speed, whether you have visited the service in a shared location and type of device used to visit the service. They may aggregate information about our advertising and what you see on the service and then provide auditing, research and reporting for us and our advertisers. If your IP address is shared, it may be used to estimate general location and other technographics such as connection speed, whether you have visited the service in a shared location, and type of device used to visit the service. They may aggregate information about our advertising and what you see on the service and then provide auditing, research and reporting for us and our advertisers. We may also disclose personal and non-personal information about you to government or law enforcement officials or private parties as we in our sole discretion, believe necessary or appropriate in order to respond to claims, legal process (including subpoenas), to protect our rights and interests or those of a third party, the safety of the public or any person, to prevent or stop any illegal, unethical, or legally actionable activity, or to otherwise comply with applicable court orders, laws, rules and regulations.',
    ],
  },
  {
    heading:
      'Where and when is information collected from customers and end users?',
    paragraphsBefore: [
      'We will collect personal information that you submit to us. We may also receive personal information about you from third parties as described above.',
    ],
  },
  {
    heading: 'How Do We Use Your Email Address?',
    paragraphsBefore: [
      'By submitting your email address on this both, you agree to receive emails from us. You can cancel your participation in any of these email lists at any time by clicking on the opt-out link or other unsubscribe option that is included in the respective email. We only send emails to people who have authorized us to contact them, either directly, or through a third party. We do not send unsolicited commercial emails, because we hate spam as much as you do By submitting your email address, you also agree to allow us to use your email address for customer audience targeting on sites like Facebook, where we display custom advertising to specific people who have opted-in to receive communications from us. Email addresses submitted only through the order processing page will be used for the sole purpose of sending you information and updates pertaining to your order. If, however, you have provided the same email to us through another method, we may use it for any of the purposes stated in this Policy. Note: If at any time you would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.',
    ],
  },
  {
    heading: 'Could my information be transferred to other countries?',
    paragraphsBefore: [
      'We are incorporated in Nepal. Information collected via our website, through direct interactions with you, or from use of our help services may be transferred from time to time to our offices or personnel, or to third parties, located throughout the world, and may be viewed and hosted anywhere in the world, including countries that may not have laws of general applicability regulating the use and transfer of such data. To the fullest extent allowed by applicable law, by using any of the above, you voluntarily consent to the trans-border transfer and hosting of such information.',
    ],
  },
  {
    heading: 'Is the information collected through our service secure?',
    paragraphsBefore: [
      'We take precautions to protect the security of your information. We have physical, electronic, and managerial procedures to help safeguard, prevent unauthorized access, maintain data security, and correctly use your information. However, neither people nor security systems are foolproof, including encryption systems. In addition, people can commit intentional crimes, make mistakes or fail to follow policies. Therefore, while we use reasonable efforts to protect your personal information, we cannot guarantee its absolute security. If applicable law imposes any non-disclaim able duty to protect your personal information, you agree that intentional misconduct will be the standards used to measure our compliance with that duty. ',
    ],
  },
  {
    heading: 'Can I update or correct my information?',
    paragraphsBefore: [
      'The rights you have to request updates or corrections to the information we collect depend on your relationship with us Personnel may update or correct their information as detailed in our internal company employment policies. Customers have the right to request the restriction of certain uses and disclosures of personally identifiable information as follows. You can contact us in order to (1)update or correct your personally identifiable information, (2) change your preferences with respect to communications and other information you receive from us, or (3) delete the personally identifiable information maintained about you on our systems (subject to the following paragraph), by cancelling your account Such updates, corrections, changes and deletions will have no effect on other information that we maintain, or information that we have provided to third parties in accordance with this Privacy Policy prior to such update, correction, change or deletion To protect your privacy and security, we may take reasonable steps (such as requesting a unique password) to verify your identity before granting you profile access or making corrections You are responsible for maintaining the secrecy of your unique password and account information at all times you should be aware that it is not technologically possible to remove each and every record of the information you have provided to us from our system. The need to back up our systems to protect information from inadvertent loss means that a copy of your information may exist in a non-erasable form that will be difficult or impossible for us to locate Promptly after receiving your request all personal information stored in databases we actively use and other readily searchable media will be updated, corrected, changed or deleted as appropriate as soon as and to the extent reasonably and technically practicable. If you are an end user and wish to update delete or receive any information we have about you, you may do so by contacting the organization of which you are a customer.',
    ],
  },
  {
    heading: 'Personnel',
    paragraphsBefore: [
      'If you are one of our workers or applicants, we collect information you voluntarily provide to us. We use the information collected for Human Resources purposes in order to administer benefits to workers and screen applicants. You may contact us in order to (1) update or correct your information, (2) change your preferences with respect to communications and other information you receive from us, or (3) receive a record of the information we have relating to you. Such updates, corrections changes and deletions will have no effect on other information that we maintain, or information that we have provided to third parties in accordance with this Privacy Policy prior to such update correction, change or deletion.',
    ],
  },
  {
    heading: 'Sale of Business',
    paragraphsBefore: [
      'We reserve the right to transfer information to a third party in the event of a sale, merger or other transfer of all or substantially all of the assets of us or any of its Corporate Affiliates (as defined herein) or that portion of us or any of its Corporate Affiliates Service relates, or in the event that we discontinue our business or file a petition or have filed against us a petition in bankruptcy, reorganization or similar proceeding provided that the third party agrees to adhere to the terms of this Privacy Policy.',
    ],
  },
  {
    heading: 'Affiliates',
    paragraphsBefore: [
      'We may disclose information (including personal information) about you to our Corporate Affiliates. For purposes of this Privacy Policy, "Corporate Affiliate" means any person or entity which directly or indirectly controls, is controlled by or is under common control with us, whether by ownership or otherwise Any information relating to you that we provide to our Corporate Affiliates will be treated by those Corporate Affiliates in accordance with the terms of this Privacy Policy',
    ],
  },
  {
    heading: 'How Long Do We Keep Your Information?',
    paragraphsBefore: [
      "We keep your information only so long as we need it to provide service to you and fulfil the purposes described in this policy This is also the case for anyone that we share your information with and who carries out services on our behalf When we no longer need to use your information and there is no need for us to keep it to comply with our legal or regulatory obligations, we'll either remove it from our systems or depersonalize it so that we can't identity you.",
    ],
  },
  {
    heading: 'How Do We Protect Your Information?',
    paragraphsBefore: [
      'We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit or access your personal information We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems and are required to keep the information confidential After a transaction, your private payment information is never kept on file. We cannot however, ensure or warrant the absolute security of any information you transmit to us or guarantee that your information on the Service may not be accessed, disclosed, allured, or destroyed by a breach of any of our physical technical, or managerial safeguards',
    ],
  },
  {
    heading: 'Governing Law',
    paragraphsBefore: [
      'The laws of Nepal, excluding its conflicts of law rules, shall cover this Agreement and your use of our service.',
    ],
  },
  {
    heading: 'Your Consent',
    paragraphsBefore: [
      'By using our service, registering an account or making a purchase, you consent to this Privacy policy.',
    ],
  },
  {
    heading: 'Cookies',
    paragraphsBefore: [
      'We use cookies to identify the areas of our website that you have visited. A cookie is a small piece of data stored on your computer or mobile device by your own browser. We use cookies to personalize the content that you see on your website. Most web browsers can be set to disable the use of cookies. However, if you disable cookies, you may not be able to access functionally on our websites correctly or at all. We never place personally Identifiable information in cookies.',
    ],
  },
  {
    heading: 'Changes to our Privacy policy',
    paragraphsBefore: [
      'If we decide to change our privacy policy, we will post those changes on this page, and/or update the privacy policy modification date below.',
    ],
  },
  {
    heading: 'Third-Party Services',
    paragraphsBefore: [
      'We may display, include or make available third-party content (including data, information, applications and other products services) or provide links to third party websites or services ("Third-Party Services"). You acknowledge and agree that we shall not be responsible for any Third-Party Services, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect thereof. We do not assume and shall not have any liability or responsibility to you or any other person or entity for any Third-Party Services. Third Party Services and links thereto are provided solely as a convenience to you and you access and use them entirely at your own risk and subject to such third parties’ terms and conditions.',
    ],
  },
  {
    heading: 'Tracking Technologies',
    subSections: [
      {
        title: 'Google Maps APIs',
        paragraphs: [
          'Google Maps API is a robust tool that can be used to create a custom map, a searchable map, check-in functions display live data synching with location, plan routes, or create a mashup just to name a few.',
          'Google Maps API may collect information from You and from Your Device for security purposes. Google Maps API collects information that is held in accordance with its Privacy Policy policy',
        ],
      },
    ],
  },
];
