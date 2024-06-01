import { expect, test } from 'vitest';
import { GET, OPTIONS } from './+server';
import type { RequestEvent } from './$types';

test('Options method contains correct headers', () => {
  const response = OPTIONS();
  expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET');
});

test('GET method returns user playlists for pro user', async () => {
  const request = new Request('https://test.com/api/playlists/user', { headers: { Authorization: 'Bearer pro' } });
  const response = await GET({ request } as RequestEvent);
  expect(await response.json()).toMatchInlineSnapshot(`
  [
  {
    "created_ts": "2023-09-08T14:28:17",
    "is_editable": true,
    "linked_deck_id": 113822357,
    "modified_ts": "2023-09-08T14:28:17",
    "name": "a new playlist",
    "position": -1,
    "refId": 3390772308,
    "words": [
      [
        "d",
        "r",
        "i",
        "n",
        "k",
      ],
      [
        "b",
        "r",
        "i",
        "n",
        "k",
      ],
      [
        "b",
        "r",
        null,
        "n",
        "k",
      ],
    ],
  },
  {
    "created_ts": "2023-08-19T12:55:15",
    "is_editable": true,
    "linked_deck_id": 113822357,
    "modified_ts": "2023-08-19T12:55:15",
    "name": "star",
    "position": -1,
    "refId": 4136956609,
    "words": [
      [
        "s",
        "t",
        "a",
        null,
        "r",
      ],
      [
        "s",
        "t",
        "a",
        null,
        "ck",
      ],
      [
        "s",
        "t",
        "o",
        null,
        "ck",
      ],
    ],
  },
]
  `);
});

test('GET method returns user and org playlists for org member', async () => {
  const request = new Request('https://test.com/api/playlists/user', { headers: { Authorization: 'Bearer orgMember' } });
  const response = await GET({ request } as RequestEvent);
  expect(await response.json()).toMatchInlineSnapshot(`
  [
    {
      "created_ts": "2023-09-09T15:48:18",
      "is_editable": true,
      "linked_deck_id": 339203615,
      "modified_ts": "2023-09-09T15:48:18",
      "name": "Lesson 38a",
      "position": -1,
      "refId": 77746384,
      "words": [
        [
          "",
          "a",
          "t",
          "",
        ],
        [
          "s",
          "a",
          "t",
          "",
        ],
        [
          "m",
          "a",
          "t",
          "",
        ],
        [
          "m",
          "a",
          "p",
          "",
        ],
        [
          "s",
          "a",
          "p",
          "",
        ],
        [
          "n",
          "a",
          "p",
          "",
        ],
        [
          "t",
          "a",
          "p",
          "",
        ],
      ],
    },
    {
      "created_ts": "2023-09-03T08:49:33",
      "is_editable": true,
      "linked_deck_id": 541852177,
      "modified_ts": "2023-09-03T08:51:00",
      "name": "Lesson 17",
      "position": -1,
      "refId": 165125250,
      "words": [
        [
          "f",
          "o",
          "g",
          null,
        ],
        [
          "c",
          "o",
          "g",
          null,
        ],
        [
          "d",
          "o",
          "g",
          null,
        ],
        [
          "d",
          "u",
          "g",
          null,
        ],
        [
          "d",
          "u",
          "d",
          null,
        ],
        [
          "d",
          "i",
          "d",
          null,
        ],
        [
          "d",
          "i",
          "g",
          null,
        ],
        [
          "g",
          "i",
          "g",
          null,
        ],
        [
          "g",
          "a",
          "g",
          null,
        ],
        [
          "g",
          "a",
          "p",
          null,
        ],
        [
          "c",
          "a",
          "p",
          null,
        ],
        [
          "c",
          "o",
          "p",
          null,
        ],
        [
          "c",
          "u",
          "p",
          null,
        ],
        [
          "c",
          "u",
          "t",
          null,
        ],
        [
          "g",
          "u",
          "t",
          null,
        ],
        [
          "g",
          "u",
          "m",
          null,
        ],
      ],
    },
    {
      "created_ts": "2023-09-11T13:29:23",
      "is_editable": true,
      "linked_deck_id": 339203615,
      "modified_ts": "2023-09-11T13:29:23",
      "name": "Lesson 47",
      "position": -1,
      "refId": 191036910,
      "words": [
        [
          "",
          "",
          "",
          "",
        ],
      ],
    },
    {
      "created_ts": "2023-09-03T08:45:47",
      "is_editable": true,
      "linked_deck_id": 541852177,
      "modified_ts": "2023-09-03T08:45:47",
      "name": "Lesson 16",
      "position": -1,
      "refId": 253387243,
      "words": [
        [
          "",
          "u",
          "p",
          null,
        ],
        [
          "c",
          "u",
          "p",
          null,
        ],
        [
          "p",
          "u",
          "p",
          null,
        ],
        [
          "p",
          "u",
          "n",
          null,
        ],
        [
          "p",
          "i",
          "n",
          null,
        ],
        [
          "p",
          "a",
          "n",
          null,
        ],
        [
          "c",
          "a",
          "n",
          null,
        ],
        [
          "c",
          "o",
          "n",
          null,
        ],
        [
          "c",
          "o",
          "d",
          null,
        ],
        [
          "m",
          "o",
          "d",
          null,
        ],
        [
          "m",
          "u",
          "d",
          null,
        ],
        [
          "d",
          "u",
          "d",
          null,
        ],
        [
          "s",
          "u",
          "d",
          null,
        ],
        [
          "s",
          "u",
          "n",
          null,
        ],
        [
          null,
          "u",
          "n",
          null,
        ],
        [
          null,
          "u",
          "m",
          null,
        ],
      ],
    },
    {
      "created_ts": "2023-09-08T20:32:24",
      "is_editable": true,
      "linked_deck_id": 339203615,
      "modified_ts": "2023-09-08T20:32:24",
      "name": "Lesson 28",
      "position": -1,
      "refId": 358311594,
      "words": [
        [
          "l",
          "i",
          "d",
          "",
        ],
        [
          "sl",
          "i",
          "d",
          "",
        ],
        [
          "sl",
          "e",
          "d",
          "",
        ],
        [
          "fl",
          "e",
          "d",
          "",
        ],
        [
          "pl",
          "e",
          "d",
          "",
        ],
        [
          "bl",
          "e",
          "d",
          "",
        ],
        [
          "l",
          "e",
          "d",
          "",
        ],
        [
          "r",
          "e",
          "d",
          "",
        ],
        [
          "b",
          "e",
          "d",
          "",
        ],
        [
          "b",
          "e",
          "t",
          "",
        ],
        [
          "b",
          "e",
          "lt",
          "",
        ],
        [
          "f",
          "e",
          "lt",
          "",
        ],
        [
          "f",
          "e",
          "lp",
          "",
        ],
        [
          "h",
          "e",
          "lp",
          "",
        ],
        [
          "h",
          "e",
          "ld",
          "",
        ],
      ],
    },
    {
      "created_ts": "2023-08-17T15:48:00",
      "is_editable": false,
      "linked_deck_id": 2986162618,
      "modified_ts": "2023-08-17T15:48:00",
      "name": "bread for real",
      "orgSource": {
        "orgId": "0000",
        "orgName": "Illuminati",
      },
      "position": -1,
      "refId": 128965805,
      "words": [
        [
          "br",
          "ea",
          "d",
          null,
        ],
        [
          "br",
          "ea",
          "ch",
          null,
        ],
        [
          "br",
          "ea",
          "th",
          null,
        ],
        [
          "br",
          "ea",
          "th",
          "e",
        ],
        [
          "br",
          "ea",
          "th",
          "es",
        ],
      ],
    },
    {
      "created_ts": "2023-08-10T18:17:29",
      "is_editable": false,
      "linked_deck_id": 2986162618,
      "modified_ts": "2023-08-10T18:17:29",
      "name": "new lesson",
      "orgSource": {
        "orgId": "0000",
        "orgName": "Illuminati",
      },
      "position": -1,
      "refId": 741143312,
      "words": [
        [
          "cl",
          "o",
          "n",
          "e",
        ],
        [
          "sh",
          "o",
          "n",
          "e",
        ],
        [
          "sh",
          "i",
          "n",
          "e",
        ],
        [
          "sh",
          "i",
          "n",
          "e",
        ],
        [
          "sh",
          "i",
          "n",
          null,
        ],
      ],
    },
  ]
`);
});

test('GET method returns no playlists for basic user', async () => {
  const request = new Request('https://test.com/api/playlists/user', { headers: { Authorization: 'Bearer basic' } });
  const response = await GET({ request } as RequestEvent);
  expect(await response.json()).toMatchInlineSnapshot(`[]`);
});
