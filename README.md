# Broccoli & Co.

Airwallex coding challenge implementation

## Run

1. Install pnpm (`npm i -g pnpm`)
2. Install package dependencies (`pnpm i`)
3. Ensure that all required environment variables are set
4. Start the development server (`pnpm start`)

## Build for production

1. Ensure that all required environment variables are set
2. Start a production build (`pnpm build`)
3. Optional: Preview the resulting build (`pnpm preview`)
4. Production build will be output to `/dist`

## Testing

### Unit tests

Run Jest with `pnpm test`.

All tests are located in `src/test/`.

### Integration tests

NOTE: Java 8 or higher is required to run integration tests.

Run on Chrome: `pnpm integration:chrome`
Run on Firefox: `pnpm integration:firefox`

Integration tests can be found in `gwen/features/`.

## Environment variables

The app uses the following environment variables at build time:

- `VITE_API_BASE_URL`: Base URL for the backend API.

Variables can be read from the environment, or from `.env` files - see [the Vite docs](https://vitejs.dev/guide/env-and-mode.html#env-files) for more information.
