// src/App.jsx
import { useState, useEffect } from "react";
import LocationList from "./locations/LocationList";
import LocationForm from "./locations/LocationForm";
import locationsData from "./locations/locations";

export default function App() {
  const [locations, setLocations] = useState(locationsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingLocation, setEditingLocation] = useState(null); // State for editing location ID

  const handleDeleteLocation = (id) => {
    const updatedLocations = locations.filter((location) => location.id !== id);
    setLocations(updatedLocations);
  };

  const handleEditLocation = (updatedLocation, id) => {
    const updatedLocations = locations.map((loc) =>
      loc.id === id ? updatedLocation : loc
    );
    setLocations(updatedLocations);
    setEditingLocation(null); // Reset editingLocation
  };

  const handleAddLocation = (newLocation) => {
    const nextId = Math.max(...locations.map((loc) => loc.id)) + 1;
    const newLocations = [...locations, { ...newLocation, id: nextId }];
    setLocations(newLocations);
    setEditingLocation(null); // Reset editingLocation
  };

  const handleEdit = (id) => {
    setEditingLocation(id);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Lokalizacje</h1>
      </div> 
      <div className="content">
        <div className="location-list-container">
          <div className="search-container"> {/* Move search bar within the container */}
            <input
              type="text"
              placeholder="Szukaj lokalizacji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <LocationList
            locations={locations.filter((location) =>
              location.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            onDeleteLocation={handleDeleteLocation}
            onEditLocation={handleEdit} // Pass handleEdit
          />
        </div>
        <div className="form-container">
          <h2>Dodaj Lokalizację</h2> {/* Add title to the form */}
          <LocationForm
            onSubmit={editingLocation ? handleEditLocation : handleAddLocation}
            initialLocation={editingLocation ? locations.find((l) => l.id === editingLocation) : null}
          />
        </div>
      </div>
    </div>
  );
}