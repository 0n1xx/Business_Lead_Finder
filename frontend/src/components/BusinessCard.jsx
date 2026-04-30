// BusinessCard component - renders a single business row in the table
function BusinessCard({ business }) {
    return (
        <tr>
            <td>{business.name}</td>
            <td>{business.address}</td>
            <td>{business.phone || "No phone"}</td>
            <td>{business.rating ? `${business.rating} ⭐ (${business.reviews})` : "No rating"}</td>
        </tr>
    )
}

export default BusinessCard