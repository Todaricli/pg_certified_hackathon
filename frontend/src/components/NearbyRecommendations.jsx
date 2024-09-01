import React, { useState } from 'react';
import useGoogleMaps from '../hooks/useGoogleMaps';

const NearbyRecommendations = () => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const { loaded, error } = useGoogleMaps(GOOGLE_MAPS_API_KEY);
  
  const [places, setPlaces] = useState([]);
  const [checkedInPlaces, setCheckedInPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNearbyPlaces = () => {
    if (!loaded) {
      console.error('Google Maps API is not loaded yet.');
      return;
    }

    if (navigator.geolocation) {
      setLoading(true);
      console.log('Attempting to fetch current position...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Current position:', { latitude, longitude });
          const location = new window.google.maps.LatLng(latitude, longitude);

          const request = {
            location: location,
            radius: '1000',
            type: ['gym', 'park', 'restaurant'],
            keyword: ['healthy', 'exercise', '']
          };

          console.log('Places API request:', request);

          const service = new window.google.maps.places.PlacesService(document.createElement('div'));
          service.nearbySearch(request, (results, status) => {
            setLoading(false);
            console.log('Places API response status:', status);
            console.log('Places API response results:', results);

            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setPlaces(results);
              console.log('Fetched places:', results);
            } else {
              console.error('Places API request failed:', status);
            }
          });
        },
        (geoError) => {
          setLoading(false);
          console.error('Geolocation error:', geoError);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleCheckIn = (place) => {
    if (checkedInPlaces.includes(place.place_id)) {
      alert('You have already checked in at this location.');
      return;
    }

    // Here, you would typically verify the user's visit, possibly with Google Maps or manual check-in
    setCheckedInPlaces([...checkedInPlaces, place.place_id]);

    // Reward system: Update your pet's stats here
    // e.g., boostPetHappiness();

    alert(`Checked in at ${place.name}! Your pet's happiness has increased!`);
  };

  if (error) {
    return <div style={styles.error}>Error loading Google Maps: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Nearby Health Spots</h2>
      <button
        onClick={fetchNearbyPlaces}
        style={styles.button}
        disabled={loading || !loaded}
      >
        {loading ? 'Loading...' : 'Find Nearby Health Spots'}
      </button>
      {!loaded && <p>Loading Google Maps...</p>}
      <ul style={styles.list}>
        {places.map((place) => (
          <li key={place.place_id} style={styles.listItem}>
            <div>
              <strong>{place.name}</strong> - {place.vicinity}
            </div>
            <button
              onClick={() => handleCheckIn(place)}
              style={{
                ...styles.checkInButton,
                backgroundColor: checkedInPlaces.includes(place.place_id) ? '#aaa' : '#34A853',
                cursor: checkedInPlaces.includes(place.place_id) ? 'not-allowed' : 'pointer',
              }}
              disabled={checkedInPlaces.includes(place.place_id)}
            >
              {checkedInPlaces.includes(place.place_id) ? 'Checked-In' : 'Check-In'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Simple inline styles for better presentation
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4285F4',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '20px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  checkInButton: {
    padding: '5px 10px',
    backgroundColor: '#34A853',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  rewardMessage: {
    marginTop: '20px',
    color: '#34A853',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    padding: '20px',
    textAlign: 'center',
  },
};

export default NearbyRecommendations;
