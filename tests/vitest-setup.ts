import { vi, beforeEach } from 'vitest';
import { STRIPE_BLEND_PRO_PRODUCT_CODE } from '$env/static/private';

const { db, resetDb } = await vi.hoisted(async () => {
  const mockDb = await import('../firebase-local/mockData/database_export/csma-blend-default-rtdb.json');
  let db = JSON.parse(JSON.stringify(mockDb));
  return {
    db,
    resetDb: () => {
      const mockDbCopy = JSON.parse(JSON.stringify(mockDb));
      Object.assign(db, mockDbCopy);
    },
  };
});

vi.mock('firebase-admin', async () => {
  return {
    default: {
      apps: [],
      initializeApp: vi.fn(),
      credential: {
        cert: vi.fn(),
      },
      auth: () => ({
        verifyIdToken: (token: string) => {
          if (token === 'pro') {
            return { uid: 'proUserId' };
          } else if (token === 'orgMember') {
            return { uid: 'orgMemberId' };
          } else if (token === 'basic') {
            return { uid: 'basicUserId' };
          }
        },
        getUser: (uid: string) => {
          const userInfo = {
            proUserId: {
              uid,
              email: 'test@test.com',
              displayName: 'Test User',
            },
            orgMemberId: {
              uid,
              email: 'test2@test.com',
              displayName: 'Test User 2',
            },
            basicUserId: {
              uid,
              email: 'basic@test.com',
              displayName: 'Basic User',
            },
          };
          // @ts-expect-error
          return userInfo[uid];
        },
      }),
      database: () => ({
        ref: (path: string) => {
          const pathSegments = path.split('/').filter((p) => p);
          return {
            get: () => ({
              val: () =>
                path
                  .replace(/^\/+/, '')
                  .split('/')
                  .reduce((acc, cur) => (acc ? acc[cur] : null), db),
            }),
            once: () => {
              return {
                val: () => pathSegments.reduce((acc, cur) => (acc ? acc[cur] : null), db),
              };
            },
            set: (data: any, errorCb: any) => {
              path.split('/').reduce((acc, cur, i, arr) => {
                if (i === arr.length - 1) acc[cur] = data;
                else if (!acc[cur]) {
                  acc[cur] = {};
                  return acc[cur];
                } else return acc[cur];
              }, db);
              errorCb(null);
            },
            push: (data: any, errorCb: any) => {
              const key = 'mockKey';
              path.split('/').reduce((acc, cur, i, arr) => {
                if (i === arr.length - 1) acc[cur][key] = data;
                else return acc[cur];
              }, db);
              errorCb(null);
              return { key };
            },
            remove: (errorCb: any) => {
              path.split('/').reduce((acc, cur, i, arr) => {
                if (i === arr.length - 1) delete acc[cur];
                else return acc[cur];
              }, db);
              errorCb(null);
            },
          };
        },
      }),
    },
  };
});

vi.mock('stripe', async (importOriginal) => {
  return {
    default: class {
      constructor() {}
      customers = {
        retrieve: (id: string, options: any) => ({
          id,
          email: 'test@test.com',
          subscriptions: {
            data: [
              {
                items: { data: [{ plan: { product: STRIPE_BLEND_PRO_PRODUCT_CODE, active: true } }] },
              },
            ],
          },
        }),
      };
    },
  };
});

beforeEach(() => {
  resetDb();
});
