# PixelForge Frontend

This frontend is a static Next.js build for the PixelForge image converter.
It performs WebP and AVIF conversion directly in the browser.

## What Changed

- The homepage hero card now shows real converter state instead of hardcoded sample files.
- The hero and converter share a single client-side hook, so queue state, format, quality, and completed results stay in sync.

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
- Homepage UI state is managed in `src/hooks/useImageConverter.ts` and composed through `src/components/HomePageContent.tsx`.

## Build

```bash
cd frontend
npm run build
```

This generates the static production output used by Vercel.
