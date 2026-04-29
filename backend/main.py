"""
 Import necessary libraries for the FastAPI application, CORS middleware, HTTP client, 
 and environment variable management
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv

# Load environment variables from .env file into memory
load_dotenv()

# Allow frontend (React on port 3000) to make requests to backend (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Read Google API key from environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")