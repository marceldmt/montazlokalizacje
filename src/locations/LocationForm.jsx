// src/locations/LocationForm.jsx
import { useState } from "react";
export default function LocationForm({ onSubmit, initialLocation, onCancel }) {
  const [name, setName] = useState(initialLocation?.name || "");
  const [city, setCity] = useState(initialLocation?.city || "");
  const [address, setAddress] = useState(initialLocation?.address || "");
  const [postcode, setPostcode] = useState(initialLocation?.postcode || "");
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, city, address, postcode });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address" style={{ marginBottom: '1.5rem' }}>Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="postcode">Postcode:</label>
        <input
          type="text"
          id="postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}