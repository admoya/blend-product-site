# Blend Product Site

## Environment Variables Required

```
FIREBASE_SERVICE_PRIVATE_KEY_ID
FIREBASE_SERVICE_PRIVATE_KEY
STRIPE_SECRET_KEY
STRIPE_BLEND_PRO_PRICE_CODE
STRIPE_BLEND_PRO_PRODUCT_CODE
STRIPE_BLEND_PRO_ANNUAL_PRICE_CODE
FIREBASE_AUTH_EMULATOR_HOST
FIREBASE_DATABASE_EMULATOR_HOST
PUBLIC_DEPLOY_CONTEXT
LISTMONK_API_URL
LISTMONK_PASSWORD
LISTMONK_USER
PUBLIC_APP_URL
FIREBASE_STORAGE_EMULATOR_HOST
STRIPE_ANNUAL_DISCOUNT_ID
```

## How to run
### Start the Firebase Emulator
`npm run firebase-local`

The emulator will be running on `localhost:4000`

### Start the site
`npm run dev`

Note: If having issues with the port not being accessible, might have to run with the following options:
`npm run dev -- --host`

The site will be running on `localhost:5173`

