import { tpCopyrightNotice } from '../../src/ui/components/navigation/TpNavDrawer';

test('copyright uses the current year', () => {
  const notice = tpCopyrightNotice({ now: new Date('2031-06-01') });
  expect(notice).toBe('© 2019–2031 True Professional. All rights reserved.');
});
