# PixelForge Frontend

This frontend is a static Next.js build for the PixelForge image converter.
It performs WebP and AVIF conversion directly in the browser.

## Local Development

Run the frontend locally:

```bash
cd frontend
npm install
npm run dev
```

## Production Notes

- The frontend is configured for static export.
- Vercel should deploy the repository root using the root `vercel.json`.
- A backend URL is not required for the main conversion flow anymore.

## Build

```bash
cd frontend
npm run build
```

This generates the static production output used by Vercel.
