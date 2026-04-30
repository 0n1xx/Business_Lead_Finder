import BusinessCard from "./BusinessCard"

// BusinessTable component - renders the full table of businesses
function BusinessTable({ businesses, isLoading }) {
    // Show loading state while fetching
    if (isLoading) {
        return <p>Searching for businesses...</p>
    }
    // Show message if no results found
    if (businesses.length === 0) {
        return <p>No businesses found. Try a different city or category.</p>
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {businesses.map(business => (
                    <BusinessCard
                        key={business.place_id}
                        business={business}
                    />
                ))}
            </tbody>
        </table>
    )
}
export default BusinessTable