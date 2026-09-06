import { jsonResponse, type ScriptedHttpResult } from './scriptedHttp';

export const faqTasksSection = { id: 1, title: 'Tasks' };

export const faqPostTaskHtml = {
  id: 1,
  question: 'How to post a task ?',
  answer:
    '<p>Providers are called Taskers when you post a task from the app.</p>',
};

export const contactTopicRows = [
  { topic: 'General', value: 'general' },
  { topic: 'Transaction', value: 'transaction' },
  { topic: 'Billing', value: 'billing' },
] as const;

/**
 * Fake backend for tests: FAQ, contact, and unknown-login payloads.
 */
export const appHttpResult: ScriptedHttpResult = (url, init) => {
  const method = init.method ?? 'GET';

  if (url.includes('/faq-sections/all')) {
    return jsonResponse(200, { data: [faqTasksSection] });
  }

  if (url.includes('/faqs/all')) {
    if (url.includes('audienceType=SERVICE_PROVIDER')) {
      return jsonResponse(200, { data: [] });
    }

    return jsonResponse(200, { data: [faqPostTaskHtml] });
  }

  if (url.includes('/general-feedbacks/topics/get-all')) {
    return jsonResponse(200, contactTopicRows);
  }

  if (url.includes('/general-feedbacks') && method === 'POST') {
    return jsonResponse(201);
  }

  if (url.includes('/auth/login') && method === 'POST') {
    return jsonResponse(400, {
      message: 'Sorry, unable to find user',
      statusCode: 400,
    });
  }

  throw new Error(`unhandled ${method} ${url}`);
};
