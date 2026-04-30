// BusinessCard component - renders a single business row in the table
function BusinessCard({ business }) {
    return (
        <tr>
            <td><span className="business-name">{business.name}</span></td>
            <td><span className="business-address">{business.address}</span></td>
            <td><span className="business-phone">{business.phone || "—"}</span></td>
            <td><span className="rating">{business.rating ? `${business.rating} ★ (${business.reviews})` : "—"}</span></td>
        </tr>
    )
}

export default BusinessCard