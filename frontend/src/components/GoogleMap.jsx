import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker, InfoWindow, AdvancedMarker } from '@vis.gl/react-google-maps';

// Correct the penguin icon path for production
const penguinIcon = '/penguin.svg'; // Use public path for icons in React

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const PetsMap = () => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isApiLoaded, setIsApiLoaded] = useState(false);

    useEffect(() => {
        // Check if the Google Maps API has loaded
        const interval = setInterval(() => {
            if (window.google && window.google.maps) {
                setIsApiLoaded(true);
                clearInterval(interval); // Clear the interval once the API is loaded
            }
        }, 100);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Random markers data
    const markers = [
        { lat: -36.8285, lng: 174.7633, health: 100, strength: 28, happiness: 89 },
        { lat: -36.8585, lng: 174.7633, health: 30, strength: 78, happiness: 28 },
        { lat: -36.8985, lng: 174.7633, health: 50, strength: 58, happiness: 19 },
        { lat: -36.8690, lng: 174.7633, health: 70, strength: 34, happiness: 78 },
    ];

    return (
        <APIProvider apiKey={API_KEY}>
            {isApiLoaded ? ( // Ensure API is loaded
                <Map
                    style={{ width: '100vw', height: '100vh' }}
                    defaultCenter={{ lat: -36.8485, lng: 174.7633 }}
                    defaultZoom={10}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: penguinIcon,
                                scaledSize: new window.google.maps.Size(40, 40), // Size of the icon
                            }}
                            onClick={() => setSelectedMarker(marker)}
                        />
                    ))}

                    {selectedMarker && ( // Render InfoWindow only if a marker is selected
                        <InfoWindow
                            position={{ lat: selectedMarker.lat + 0.008, lng: selectedMarker.lng + 0.001 }}
                            onCloseClick={() => setSelectedMarker(null)}
                        >
                            <div>
                                <img src='/penguin.svg' alt='Penguin Icon' />
                                <p>Health: {selectedMarker.health}</p>
                                <p>Strength: {selectedMarker.strength}</p>
                                <p>Happiness: {selectedMarker.happiness}</p>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            ) : (
                <div style={loadingStyle}>Loading Google Maps...</div>
            )}
        </APIProvider>
    );
};

// CSS styles for the loading message
const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '2em',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
    fontFamily: 'Arial, sans-serif'
};

export default PetsMap;




