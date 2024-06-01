import { expect, test, vi } from 'vitest';
import { OPTIONS, GET } from './+server';

import type { RequestEvent } from './$types';

test('Options method contains correct headers', () => {
  const response = OPTIONS();
  expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET');
});

test('GET method returns user data for pro user', async () => {
  const request = new Request('https://test.com/api/user', { headers: { Authorization: 'Bearer pro' } });
  const response = await GET({ request } as RequestEvent);
  expect(await response.json()).toMatchInlineSnapshot(`
    {
      "displayName": "Test User",
      "email": "test@test.com",
      "isSubscribedToBlendPro": true,
      "organizationInfo": [],
      "uid": "proUserId",
    }
  `);
});

test('GET method returns user data for basic user', async () => {
  const request = new Request('https://test.com/api/user', { headers: { Authorization: 'Bearer basic' } });
  const response = await GET({ request } as RequestEvent);
  expect(await response.json()).toMatchInlineSnapshot(`
    {
      "displayName": "Basic User",
      "email": "basic@test.com",
      "isSubscribedToBlendPro": false,
      "organizationInfo": [],
      "uid": "basicUserId",
    }
  `);
});
