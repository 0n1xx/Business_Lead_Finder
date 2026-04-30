# Business Lead Finder

A tool to find local businesses without websites for outreach.

## Overview

Business Lead Finder helps you discover local businesses that don't have a website yet. Built as a sales tool for door-to-door outreach — you arrive knowing exactly who needs a website and where they are.

## Features

- Search businesses by city and category
- Filters only businesses without a website
- Shows name, address, phone, and rating
- Dark mode UI
- Mobile responsive

## Tech Stack

**Backend**
- Python 3
- FastAPI
- Google Places API

**Frontend**
- React
- HTML / CSS

**Deployment**
- Railway

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Google Places API key

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend` folder:

```
GOOGLE_PLACES_API_KEY=your_api_key_here
```

Run the server:

```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. User enters a city and selects a business category
2. Frontend sends request to FastAPI backend
3. Backend queries Google Places API for businesses
4. For each business, backend checks if a website exists
5. Only businesses without a website are returned
6. Results displayed in a clean table with contact details

## Architecture

```
React (port 3000)
    ↓ fetch
FastAPI (port 8000)
    ↓ Google Places API
    → Text Search (get list of businesses)
    → Place Details (check if website exists)
    ↓ filter businesses without website
React displays results
```

## Use Case

Built for web developers and agencies who want to do cold outreach to local businesses. Instead of going door-to-door blindly, this tool gives you a targeted list of businesses that actually need your services.

Workflow:
1. Search for businesses in your city
2. Call or visit the ones without a website
3. Offer your web development services

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_PLACES_API_KEY` | Google Places API key from Google Cloud Console |

## Deployment

Both services are deployed separately on Railway.

- Backend: set `Root Directory` to `backend` and add environment variables
- Frontend: set `Root Directory` to `frontend`
