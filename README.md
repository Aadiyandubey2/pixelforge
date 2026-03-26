# PixelForge

PixelForge is a full-stack image conversion website for converting common image formats into WebP and AVIF.

## Features

- Convert images to WebP and AVIF
- Upload multiple files in one session
- Adjust output quality before conversion
- Modern frontend built with Next.js
- Fast backend API powered by FastAPI

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: FastAPI, Pillow, pillow-avif-plugin

## Project Structure

- `frontend/` contains the Next.js website
- `backend/` contains the FastAPI conversion API

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Production Deployment

- Deploy the repository root to Vercel. The root `vercel.json` builds the static frontend from `frontend/`.
- Deploy the FastAPI backend from `backend/` to a Python host such as Render, Railway, Fly.io, or another VM/container platform.
- Keep the backend off Vercel Functions for the current 50 MB upload target.
- Set `NEXT_PUBLIC_API_URL` in your frontend deployment to the public backend origin.
- Set `ALLOWED_ORIGINS` in the backend deployment to your frontend domain.

Example values:

- Frontend `NEXT_PUBLIC_API_URL=https://api.yourdomain.com`
- Backend `ALLOWED_ORIGINS=https://yourdomain.com`

## Author

Aadiyan Dubey
