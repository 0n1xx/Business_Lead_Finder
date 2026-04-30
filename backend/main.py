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

# List of business categories with user-friendly display names
CATEGORIES = {
    "restaurant": "Restaurants",
    "cafe": "Cafes",
    "bar": "Bars",
    "hair_care": "Hair Salons",
    "beauty_salon": "Beauty Salons",
    "gym": "Gyms",
    "store": "Stores",
    "clothing_store": "Clothing Stores",
    "car_repair": "Auto Repair",
    "plumber": "Plumbers",
    "electrician": "Electricians",
    "lawyer": "Lawyers",
    "dentist": "Dentists",
    "doctor": "Doctors",
}

# Endpoint to return available categories for frontend dropdown
@app.get("/categories")
def get_categories():
    return {
        "categories": [
            {"value": key, "label": name}
            for key, name in CATEGORIES.items()
        ]
    }

# Build request params for Google Places API
# First page uses text query, next pages use page token from Google
def build_params(category: str, city: str, next_page_token: str = None):
    if next_page_token:
        return {"pagetoken": next_page_token, "key": GOOGLE_API_KEY}
    return {"query": f"{category} in {city}", "key": GOOGLE_API_KEY}


# Fetch one page of results from Google Places Text Search
# Returns up to 20 businesses per page
async def fetch_places_page(client, params: dict):
    response = await client.get(
        "https://maps.googleapis.com/maps/api/place/textsearch/json",
        params=params
    )
    return response.json()


# Fetch website and phone for a specific business
# Website and phone are not included in text search results, require separate request
async def get_place_details(client, place_id: str):
    response = await client.get(
        "https://maps.googleapis.com/maps/api/place/details/json",
        params={
            "place_id": place_id,
            "fields": "website,formatted_phone_number",
            "key": GOOGLE_API_KEY,
        }
    )
    return response.json().get("result", {})


# Fetch details for all places on a page concurrently
# Semaphore(5) limits to 5 simultaneous requests to avoid Google rate limiting
async def fetch_all_details(client, places: list):
    semaphore = asyncio.Semaphore(5)

    async def fetch_with_limit(place):
        # Semaphore acts as a gate - allows max 5 requests through at a time
        async with semaphore:
            details = await get_place_details(client, place.get("place_id"))
            return place, details

    # gather fires all tasks at once and waits for all to complete
    tasks = [fetch_with_limit(place) for place in places]
    return await asyncio.gather(*tasks)


# Format a single place into our data structure
# Transforms raw Google response into clean object for the frontend
def format_place(place: dict, details: dict):
    return {
        "name": place.get("name"),
        "address": place.get("formatted_address"),
        "rating": place.get("rating"),
        "reviews": place.get("user_ratings_total"),
        "phone": details.get("formatted_phone_number"),
        "place_id": place.get("place_id"),
        # lat/lng will be used for map pins in Part 3
        "lat": place["geometry"]["location"]["lat"],
        "lng": place["geometry"]["location"]["lng"],
    }


# Main search endpoint
# New approach: fetches details for all businesses on a page concurrently (fast)
@app.get("/search")
async def search_businesses(city: str, category: str):
    results = []
    next_page_token = None

    async with httpx.AsyncClient() as client:
        for _ in range(3):
            params = build_params(category, city, next_page_token)
            data = await fetch_places_page(client, params)

            # Fetch details for all 20 businesses on the page concurrently
            places_with_details = await fetch_all_details(client, data.get("results", []))

            # Only keep businesses with no website
            for place, details in places_with_details:
                if not details.get("website"):
                    results.append(format_place(place, details))

            next_page_token = data.get("next_page_token")
            if not next_page_token:
                break

    return {"total": len(results), "businesses": results}