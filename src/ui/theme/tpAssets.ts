import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';

import iconEnvelope from '../../../assets/icons/envelope.svg';
import iconFacebook from '../../../assets/icons/icons8-facebook-logo.svg';
import iconFilter from '../../../assets/icons/filter.svg';
import iconGmail from '../../../assets/icons/icons8-gmail.svg';
import iconHelpCenter from '../../../assets/icons/helpCenter.svg';
import iconGps from '../../../assets/icons/gps.svg';
import iconHome from '../../../assets/icons/home-run.svg';
import iconGoogle from '../../../assets/icons/icons8-google.svg';
import iconInstagram from '../../../assets/icons/icons8-instagram-logo.svg';
import iconLinkedin from '../../../assets/icons/icons8-linkedin.svg';
import iconMember from '../../../assets/icons/member.svg';
import iconOverflow from '../../../assets/icons/nounDots.svg';
import iconPhoneAlt from '../../../assets/icons/phone-alt.svg';
import iconPost from '../../../assets/icons/plus_rounded.svg';
import iconProfile from '../../../assets/icons/profile.svg';
import iconRegister from '../../../assets/icons/register.svg';
import iconReport from '../../../assets/icons/report_flag.svg';
import iconTasks from '../../../assets/icons/service-list.svg';
import iconTiktok from '../../../assets/icons/tiktok.svg';
import iconWhatsapp from '../../../assets/icons/whatsapp.svg';
import activeSupport from '../../../assets/images/activeSupport.png';
import communicate from '../../../assets/images/communicate.png';
import empty from '../../../assets/images/empty.png';
import howItStarted from '../../../assets/images/howItStarted.png';
import error from '../../../assets/images/error.png';
import mail from '../../../assets/images/mail.png';
import notFound from '../../../assets/images/not_found.png';
import otp from '../../../assets/images/otp.png';
import posts from '../../../assets/images/posts.png';
import telecommuting from '../../../assets/images/telecommuting.png';

export type TpSvgAsset = ComponentType<SvgProps>;

/**
 * Asset paths copied from the web mobile implementation.
 */
export const tpAssets = {
  iconHome,
  iconTasks,
  iconPost,
  iconRegister,
  iconProfile,
  iconFilter,
  iconOverflow,
  iconMember,
  iconGps,
  iconReport,
  iconGoogle,
  iconFacebook,
  iconInstagram,
  iconTiktok,
  iconLinkedin,
  iconGmail,
  iconPhoneAlt,
  iconWhatsapp,
  iconEnvelope,
  iconHelpCenter,
  empty,
  activeSupport,
  notFound,
  error,
  mail,
  communicate,
  howItStarted,
  otp,
  posts,
  telecommuting,
} as const;
