import { expect, test } from 'vitest';
import { GET, OPTIONS } from './+server';
import type { RequestEvent } from './$types';

test('Options method contains correct headers', () => {
  const response = OPTIONS();
  expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET');
});

test('GET method with no filters returns all library playlist data', async () => {
  const urlstring = 'https://test.com/api/playlists/library';
  const mockRequestEvent = {
    request: new Request(urlstring),
    url: new URL(urlstring),
    params: {},
  } as unknown as RequestEvent;
  const response = await GET(mockRequestEvent);
  expect(await response.json()).toMatchInlineSnapshot(`
  [
    {
      "created_ts": "2024-05-22T10:36:17",
      "is_editable": false,
      "linked_deck_id": 113822357,
      "modified_ts": "2024-05-22T10:36:17",
      "name": "Library Playlist CVC",
      "position": -1,
      "refId": 2808579789,
      "words": [
        [
          "b",
          null,
          "a",
          "n",
          null,
        ],
        [
          "f",
          null,
          "a",
          "n",
          null,
        ],
        [
          "f",
          null,
          "u",
          "n",
          null,
        ],
        [
          "f",
          null,
          "i",
          "n",
          null,
        ],
        [
          "t",
          null,
          "i",
          "n",
          null,
        ],
        [
          "t",
          null,
          "i",
          "p",
          null,
        ],
      ],
    },
  ]
  `);
});

test('GET method with filters returns only filtered data', async () => {
  const urlstring = 'https://test.com/api/playlists/library?attributes=name,is_editable,refId';
  const mockRequestEvent = {
    request: new Request(urlstring),
    url: new URL(urlstring),
    params: { attributes: 'name,is_editable,refId' },
  } as unknown as RequestEvent;
  const response = await GET(mockRequestEvent);
  expect(await response.json()).toMatchInlineSnapshot(`
  [
    {
      "is_editable": false,
      "name": "Library Playlist CVC",
      "refId": 2808579789,
    },
  ]
  `);
});
