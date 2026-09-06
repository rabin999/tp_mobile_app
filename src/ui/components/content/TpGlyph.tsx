import Svg, { Circle, Path } from 'react-native-svg';

export type TpGlyphName =
  | 'menu'
  | 'close'
  | 'search'
  | 'chevronRight'
  | 'backspace'
  | 'visibility'
  | 'visibilityOff'
  | 'check'
  | 'checkCircle'
  | 'warningAmber'
  | 'info'
  | 'errorOutline'
  | 'star'
  | 'starBorder'
  | 'starOutline'
  | 'calendar'
  | 'arrowDropDown'
  | 'facebook'
  | 'person'
  | 'home'
  | 'people'
  | 'work'
  | 'menuBook'
  | 'addBusiness'
  | 'mail'
  | 'help'
  | 'privacy'
  | 'gavel'
  | 'groups'
  | 'logout'
  | 'tune'
  | 'brightnessAuto'
  | 'lightMode'
  | 'darkMode'
  | 'notifications'
  | 'verified'
  | 'doubleArrowLeft'
  | 'doubleArrowRight'
  | 'camera'
  | 'music'
  | 'instagram'
  | 'tiktok'
  | 'linkedin';

type Props = {
  name: TpGlyphName;
  size?: number;
  color?: string;
};

/**
 * Kit glyphs that were Material Icons on Flutter. Kept as SVG paths so we
 * do not add a vector-icon package.
 */
export function TpGlyph({ name, size = 24, color = '#3C424F' }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    accessibilityElementsHidden: true,
    importantForAccessibility: 'no-hide-descendants' as const,
  };

  switch (name) {
    case 'menu':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
          />
        </Svg>
      );
    case 'close':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </Svg>
      );
    case 'search':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </Svg>
      );
    case 'chevronRight':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
          />
        </Svg>
      );
    case 'backspace':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"
          />
        </Svg>
      );
    case 'visibility':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          />
        </Svg>
      );
    case 'visibilityOff':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
          />
        </Svg>
      );
    case 'check':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
          />
        </Svg>
      );
    case 'checkCircle':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </Svg>
      );
    case 'warningAmber':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
          />
        </Svg>
      );
    case 'info':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          />
        </Svg>
      );
    case 'errorOutline':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </Svg>
      );
    case 'star':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </Svg>
      );
    case 'starBorder':
    case 'starOutline':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
          />
        </Svg>
      );
    case 'calendar':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"
          />
        </Svg>
      );
    case 'arrowDropDown':
      return (
        <Svg {...common}>
          <Path fill={color} d="M7 10l5 5 5-5z" />
        </Svg>
      );
    case 'facebook':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
          />
        </Svg>
      );
    case 'person':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </Svg>
      );
    case 'home':
      return (
        <Svg {...common}>
          <Path fill={color} d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </Svg>
      );
    case 'people':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
          />
        </Svg>
      );
    case 'work':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
          />
        </Svg>
      );
    case 'menuBook':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"
          />
        </Svg>
      );
    case 'addBusiness':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M15 17h2v-3h1v-2l-1-5H2l-1 5v2h1v6h9v-6h4v3zm-6 1H4v-4h5v4zM2 4h15v2H2z"
          />
          <Path fill={color} d="M20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2z" />
        </Svg>
      );
    case 'mail':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
          />
        </Svg>
      );
    case 'help':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
          />
        </Svg>
      );
    case 'privacy':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
          />
        </Svg>
      );
    case 'gavel':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="m1 21 9-9 1.42 1.42-9 9L1 21zm13.71-5.13 4.58-4.58a.996.996 0 0 0 0-1.41l-5.17-5.17a.996.996 0 0 0-1.41 0L8.13 9.42a.996.996 0 0 0 0 1.41l4.58 4.58c.39.39 1.02.39 1.41 0zM20 21h-9l5.5-5.5L20 21z"
          />
        </Svg>
      );
    case 'groups':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.46 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.28 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.8 0 16.8V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3.78 1.58c-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.2c0-1-.48-1.9-1.22-2.22zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"
          />
        </Svg>
      );
    case 'logout':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
          />
        </Svg>
      );
    case 'tune':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
          />
        </Svg>
      );
    case 'brightnessAuto':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z"
          />
        </Svg>
      );
    case 'lightMode':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c0-1.04.16-2.04.46-2.99L2.64 9.18C2.23 10.39 2 11.67 2 13zm1.13-6.95 1.41-1.41C6.9 3.26 9.34 2 12 2v2c-2.05 0-3.93.78-5.34 2.05L3.13 6.05zM13 2v2c2.05 0 3.93.78 5.34 2.05l1.53-1.53C18.1 3.26 15.66 2 13 2zm5.87 4.05 1.41 1.41C21.77 8.61 22 9.89 22 11.13h-2c0-1.04-.16-2.04-.46-2.99l-1.67-1.09zM20 13h2c0 1.33-.23 2.61-.64 3.82l-1.82-.83c.3-.95.46-1.95.46-2.99z"
          />
        </Svg>
      );
    case 'darkMode':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
          />
        </Svg>
      );
    case 'notifications':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          />
        </Svg>
      );
    case 'verified':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21.04l3.4 1.47 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"
          />
        </Svg>
      );
    case 'doubleArrowLeft':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z"
          />
          <Path
            fill={color}
            d="M11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"
          />
        </Svg>
      );
    case 'doubleArrowRight':
      return (
        <Svg {...common}>
          <Path fill={color} d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z" />
          <Path
            fill={color}
            d="M13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"
          />
        </Svg>
      );
    case 'camera':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
          />
        </Svg>
      );
    case 'music':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
          />
        </Svg>
      );
    case 'instagram':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5A1.25 1.25 0 1 1 16 6.75 1.25 1.25 0 0 1 17.25 5.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
          />
        </Svg>
      );
    case 'tiktok':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M18 7.2c-.9-.4-1.6-1.1-2-2V14.5c0 2.5-2 4.5-4.5 4.5S7 17 7 14.5 9 10 11.5 10c.5 0 1 .1 1.5.2V7.1C12.5 7 12 7 11.5 7 7.4 7 4 10.4 4 14.5S7.4 22 11.5 22 19 18.6 19 14.5V9.3c.9.6 2 1 3.2 1.1V7.2H18z"
          />
        </Svg>
      );
    case 'linkedin':
      return (
        <Svg {...common}>
          <Path
            fill={color}
            d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 19H5.5V9.5H8V19zM6.75 8.25c-.83 0-1.5-.67-1.5-1.5S5.92 5.25 6.75 5.25 8.25 5.92 8.25 6.75 7.58 8.25 6.75 8.25zM19 19h-2.5v-4.6c0-1.1-.4-1.8-1.4-1.8-.75 0-1.2.5-1.4 1-.07.18-.09.42-.09.66V19H11V9.5h2.5v1.3c.33-.5 1.15-1.5 2.8-1.5 2.05 0 3.6 1.35 3.6 4.25V19z"
          />
        </Svg>
      );
    default:
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="8" fill={color} />
        </Svg>
      );
  }
}
