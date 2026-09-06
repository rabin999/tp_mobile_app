import { tpAssets, type TpSvgAsset } from '../../ui/theme/tpAssets';

export type ContactChannel = {
  key: 'phone' | 'whatsapp' | 'email';
  icon: TpSvgAsset;
  label: string;
  meta?: string;
  url: string;
  accessibilityLabel: string;
};

/**
 * Phone, WhatsApp, and email shown on this page.
 */
export const contactChannels: readonly ContactChannel[] = [
  {
    key: 'phone',
    icon: tpAssets.iconPhoneAlt,
    label: '980-2364648',
    url: 'tel:+9779802364648',
    accessibilityLabel: 'Call 980-2364648',
  },
  {
    key: 'whatsapp',
    icon: tpAssets.iconWhatsapp,
    label: '980-2364648',
    meta: '(WhatsApp)',
    url: 'https://wa.me/9779802364648',
    accessibilityLabel: 'Chat on WhatsApp: 980-2364648',
  },
  {
    key: 'email',
    icon: tpAssets.iconEnvelope,
    label: 'trueprofessionalservice@gmail.com',
    url: 'mailto:trueprofessionalservice@gmail.com',
    accessibilityLabel: 'Email trueprofessionalservice@gmail.com',
  },
];
