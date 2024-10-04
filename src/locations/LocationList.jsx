// src/locations/LocationList.jsx
import { useState, useEffect } from "react";
import LocationDetails from "./LocationDetails";
import LocationForm from "./LocationForm"; // Import LocationForm

export default function LocationList(props) {
  const { locations } = props;

  return (
    <div>
      {locations.length > 0 ? (
        <ul>
          {locations.map((location) => (
            <li key={location.id}>
              <LocationDetails location={location} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching locations found.</p>
      )}
    </div>
  );
}