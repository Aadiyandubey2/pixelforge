# PixelForge

PixelForge is a browser-first image conversion website for converting common image formats into WebP and AVIF.

## Features

- Convert images to WebP and AVIF
- Upload multiple files in one session
- Adjust output quality before conversion
- Live hero preview that reflects the real converter queue and settings
- Modern frontend built with Next.js
- Client-side conversion that works on a static deployment

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Frontend conversion: WebAssembly codecs via jSquash
- Optional backend: FastAPI, Pillow, pillow-avif-plugin

## Project Structure

- `frontend/` contains the Next.js website
- `backend/` contains the optional FastAPI conversion API

## Frontend Notes

- The homepage hero and the main converter now share one client-side conversion state.
- Uploaded files, conversion progress, and completed size savings are reflected in the hero preview instead of mock placeholder data.
- Conversion still runs locally in the browser through WebAssembly codecs, so no backend is required for the main flow.

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Optional Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Production Deployment

- Deploy the repository root to Vercel. The frontend now converts images directly in the browser, so a live backend is not required for the core experience.
- Keep the FastAPI backend only if you want a separate API for future integrations or larger server-side workflows.

## Author

Aadiyan Dubey
