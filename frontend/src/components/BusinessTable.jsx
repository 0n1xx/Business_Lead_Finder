import BusinessCard from "./BusinessCard"

// BusinessTable component - renders the full table of businesses
function BusinessTable({ businesses, isLoading }) {
    if (isLoading) return <div className="state-message loading">Searching...</div>
    if (businesses.length === 0) return <div className="state-message">No businesses found. Try a different city or category.</div>

    return (
    <div className="table-wrapper">
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
    </div>
    )
}
export default BusinessTable