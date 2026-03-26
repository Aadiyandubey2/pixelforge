# PixelForge Frontend

This frontend is a static Next.js build for the PixelForge image converter.

## Local Development

Run the frontend locally:

```bash
cd frontend
npm install
npm run dev
```

The app expects the backend API at:

- `http://localhost:8000` by default during local development
- `NEXT_PUBLIC_API_URL` when deployed

Create `frontend/.env.local` if you want to override the API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Production Notes

- The frontend is configured for static export.
- Vercel should deploy the repository root using the root `vercel.json`.
- Set `NEXT_PUBLIC_API_URL` in Vercel to your deployed backend URL.

## Build

```bash
cd frontend
npm run build
```

This generates the static production output used by Vercel.
