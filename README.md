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

## Author

Aadiyan Dubey
