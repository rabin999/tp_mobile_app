import { isAllowedOutboundUrl } from '../../src/core/outboundUrl';
import { contactChannels } from '../../src/features/contact/contactChannels';

test('contact channels are allowed outbound URLs', () => {
  for (const channel of contactChannels) {
    expect(isAllowedOutboundUrl(channel.url)).toBe(true);
  }
});

test('rejects javascript, files, and arbitrary https', () => {
  expect(isAllowedOutboundUrl('javascript:alert(1)')).toBe(false);
  expect(isAllowedOutboundUrl('file:///etc/passwd')).toBe(false);
  expect(isAllowedOutboundUrl('intent://scan/#Intent;end')).toBe(false);
  expect(isAllowedOutboundUrl('https://evil.example/phish')).toBe(false);
  expect(isAllowedOutboundUrl('http://wa.me/9779802364648')).toBe(false);
  expect(isAllowedOutboundUrl('tel:not-a-number')).toBe(false);
  expect(isAllowedOutboundUrl('')).toBe(false);
});
