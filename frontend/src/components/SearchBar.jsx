import { useState, useEffect } from "react"

// SearchBar component - handles city input, category dropdown and search button
function SearchBar({ onSearch, isLoading }) {
    // Local state for city input and selected category
    const [city, setCity] = useState("Barrie, Ontario")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])

    // Fetch categories from backend when component first loads
    useEffect(() => {
        fetch("https://businessleadfinderbackend-production.up.railway.app/categories")
            .then(res => res.json())
            .then(data => setCategories(data.categories))
    }, [])

    // Called when user clicks Search button
    const handleSearch = () => {
        if (!city || !category) return
        onSearch(city, category)
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select category...</option>
                {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                        {cat.label}
                    </option>
                ))}
            </select>
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Searching..." : "Search"}
            </button>
        </div>
    )
}

export default SearchBar