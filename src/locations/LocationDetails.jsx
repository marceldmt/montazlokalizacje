// src/locations/LocationDetails.jsx
export default function LocationDetails({ location }) {
  return (
    <div>
      <h3>{location.name}</h3>
      <p>
        {location.address} <br /> {/* Display the address */}
        {location.city}, {location.postcode} <br /> {/* Display the city and postcode */}
      </p>
    </div>
  );
}