/**
 * True when `url` is a tel, mailto, or allowlisted https link this app
 * may hand to the OS.
 */
export function isAllowedOutboundUrl(url: string): boolean {
  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    return false;
  }

  switch (parsed.protocol) {
    case 'tel:':
      return /^\+?[0-9]+$/.test(telNumber(parsed));
    case 'mailto:':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.pathname);
    case 'https:':
      return (
        parsed.hostname.toLowerCase() === 'wa.me' &&
        parsed.username === '' &&
        parsed.port === '' &&
        /^\+?[0-9]+$/.test(parsed.pathname.replace(/^\//, ''))
      );
    default:
      return false;
  }
}

function telNumber(parsed: URL): string {
  const fromPath = parsed.pathname.replace(/^\//, '');

  if (fromPath.length > 0) {
    return fromPath;
  }

  return parsed.hostname;
}
