// src/App.jsx
import { useState, useEffect } from "react";
import LocationList from "./locations/LocationList";
import LocationForm from "./locations/LocationForm";
import { getLocations } from "./locations/locations";
import './App.css';

export default function App() {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingLocation, setEditingLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const fetchedLocations = await getLocations();
        setLocations(fetchedLocations);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteLocation = (id) => {
    const updatedLocations = locations.filter((location) => location.id !== id);
    setLocations(updatedLocations);
  };

  const handleEditLocation = (updatedLocation, id) => {
    const updatedLocations = locations.map((loc) =>
      loc.id === id ? updatedLocation : loc
    );
    setLocations(updatedLocations);
    setEditingLocation(null);
  };

  const handleAddLocation = (newLocation) => {
    const nextId = Math.max(...locations.map((loc) => loc.id)) + 1;
    const newLocations = [...locations, { ...newLocation, id: nextId }];
    setLocations(newLocations);
    setEditingLocation(null);
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
          <div className="search-container">
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
            onEditLocation={handleEdit}
          />
        </div>
        <div className="form-container">
          <h2>Dodaj Lokalizację</h2>
          <LocationForm
            onSubmit={editingLocation ? handleEditLocation : handleAddLocation}
            initialLocation={editingLocation ? locations.find((l) => l.id === editingLocation) : null}
          />
        </div>
      </div>
    </div>
  );
}