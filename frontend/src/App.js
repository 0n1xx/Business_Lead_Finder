import { useState } from "react"
import SearchBar from "./components/SearchBar"
import BusinessTable from "./components/BusinessTable"
import "./App.css"

function App() {
    // List of businesses returned from backend
    const [businesses, setBusinesses] = useState([])
    // Loading state - true while waiting for backend response
    const [isLoading, setIsLoading] = useState(false)
    // Total count of businesses found
    const [total, setTotal] = useState(0)
    // Called by SearchBar when user clicks Search
    const handleSearch = async (city, category) => {
        setIsLoading(true)
        setBusinesses([])
        try {
            const response = await fetch(
                `https://businessleadfinderbackend-production.up.railway.app/search?city=${encodeURIComponent(city)}&category=${category}`
            )
            const data = await response.json()
            setBusinesses(data.businesses)
            setTotal(data.total)
        } catch (error) {
            console.error("Search failed:", error)
        } finally {
            // Always runs - whether success or error
            setIsLoading(false)
        }
    }
    return (
      <div className="app">
        <div className="header">
          <h1>Business Lead Finder</h1>
          <p>Find local businesses without a website</p>
        </div>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        {total > 0 && (
          <p className="results-count">{total} businesses found without a website</p>
        )}
        <BusinessTable businesses={businesses} isLoading={isLoading} />
      </div>
    )
}
export default App
