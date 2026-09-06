import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import {
  faqAnswerText,
  filterFaqsByQuestion,
  hasFaqSectionIcon,
  parseFaqs,
  parseFaqSections,
  type FaqItem,
} from '../../../src/features/public/faq/faq';

test('parses FAQ sections and skips a missing data list', () => {
  expect(parseFaqSections({ data: [], meta: {}, link: {} })).toEqual([]);
  expect(
    parseFaqSections({
      data: [{ id: 1, title: 'Tasks', description: 'Task related support' }],
    }),
  ).toEqual([{ id: 1, title: 'Tasks' }]);
});

test('builds a section media URL only when icon metadata exists', () => {
  expect(hasFaqSectionIcon(undefined)).toBe(false);
  expect(hasFaqSectionIcon({})).toBe(false);
  expect(hasFaqSectionIcon({ key: 'icon.png' })).toBe(true);
  expect(
    parseFaqSections({
      data: [{ id: 4, title: 'Billing', iconMeta: { file: 'a.png' } }],
    })[0].iconUrl,
  ).toMatch(/\/faq-sections\/media\/4$/);
});

test('rejects a payload that is not the FAQ section list', () => {
  expect(() => parseFaqSections(null)).toThrow(
    new AppException(httpMessages.unavailable),
  );
  expect(() => parseFaqSections({ data: [{ id: 1 }] })).toThrow(
    new AppException(httpMessages.unavailable),
  );
});

test('parses FAQs and strips answer HTML', () => {
  expect(
    parseFaqs({
      data: [
        {
          id: 1,
          question: 'How to post a task ?',
          answer: '<p>Click on “Post a task”.</p>',
        },
      ],
    }),
  ).toEqual([
    {
      id: 1,
      question: 'How to post a task ?',
      answer: 'Click on “Post a task”.',
    },
  ]);
});

test('rejects a payload that is not the FAQ list', () => {
  expect(() => parseFaqs([{ question: 'How?' }])).toThrow(
    new AppException(httpMessages.unavailable),
  );
});

test('filters questions with a case-insensitive substring', () => {
  const faqs: FaqItem[] = [
    { id: 1, question: 'How to post a task ?', answer: 'Post it.' },
    { id: 2, question: 'How do I pay?', answer: 'Use the app.' },
  ];

  expect(filterFaqsByQuestion(faqs, '  TASK  ')).toEqual([faqs[0]]);
  expect(filterFaqsByQuestion(faqs, '')).toEqual(faqs);
  expect(filterFaqsByQuestion(faqs, 'zzz')).toEqual([]);
});

test('turns FAQ HTML into readable text', () => {
  expect(faqAnswerText('<p>First<br/>second</p><p>Third</p>')).toBe(
    'First\nsecond\nThird',
  );
  expect(faqAnswerText('A &amp; B &quot;C&quot;')).toBe('A & B "C"');
});
