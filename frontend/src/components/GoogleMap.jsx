import React, { useState, useEffect } from 'react';
import { APIProvider, Map, InfoWindow, AdvancedMarker } from '@vis.gl/react-google-maps';

// Correct the penguin icon path for production
const penguinIcon = '/penguin.svg'; // Use public path for icons in React
const userLocationIcon = '/user-location.png'; // Different icon for user location

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || null;
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_ID; // Replace 'your-map-id' with the actual Map ID

const PetsMap = () => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        if (API_KEY) {
            console.log('API Key loaded:', API_KEY); // Debugging log
            setIsApiLoaded(true);
        } else {
            console.error('API Key not available'); // Debugging log
        }
    }, [API_KEY]); // Add dependency array to useEffect

    useEffect(() => {
        if (navigator.geolocation) {
            console.log('Getting current location...');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Current position:', { latitude, longitude });
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (geoError) => {
                    console.error('Error getting location:', geoError);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []); // Empty dependency array to run only once on mount

    useEffect(() => {
        if (isApiLoaded) {
            console.log('Google Maps API is loaded'); // Debugging log
        }
    }, [isApiLoaded]);

    // Random markers data
    const markers = [
        { lat: -36.8485, lng: 174.7633, health: 100, strength: 28, happiness: 89 },
        { lat: -36.8585, lng: 174.7633, health: 30, strength: 78, happiness: 28 },
        { lat: -36.8985, lng: 174.7633, health: 50, strength: 58, happiness: 19 },
        { lat: -36.8690, lng: 174.7633, health: 70, strength: 34, happiness: 78 },
    ];

    return (
        <APIProvider apiKey={API_KEY}>
            {isApiLoaded ? (
                <Map
                    style={{ width: '100vw', height: '100vh' }}
                    defaultCenter={{ lat: -36.8485, lng: 174.7633 }}
                    defaultZoom={10}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId={MAP_ID} // Add the Map ID here
                >
                    {currentLocation && (
                        <AdvancedMarker
                            position={currentLocation}
                            onClick={() => setSelectedMarker({ ...currentLocation, isUserLocation: true })}
                        >
                            <img
                                src={userLocationIcon} // Different icon for user location
                                width={40}
                                height={40}
                                style={{ transform: 'translate(-50%, -50%)' }} // Center the icon over the position
                                alt="User Location Icon"
                            />
                        </AdvancedMarker>
                    )}

                    {markers.map((marker, index) => (
                        <AdvancedMarker
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => setSelectedMarker(marker)}
                        >
                            <img
                                src={penguinIcon}
                                width={40}
                                height={40}
                                style={{ transform: 'translate(-50%, -50%)' }} // Center the icon over the position
                                alt="Penguin Icon"
                            />
                        </AdvancedMarker>
                    ))}

                    {selectedMarker && ( // Render InfoWindow only if a marker is selected
                        <InfoWindow
                            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                            onCloseClick={() => setSelectedMarker(null)}
                        >
                            <div>
                                {selectedMarker.isUserLocation ? (
                                    <>
                                        <img src={userLocationIcon} alt='User Location Icon' />
                                        <p>This is your current location</p>
                                    </>
                                ) : (
                                    <>
                                        <img src={penguinIcon} alt='Penguin Icon' />
                                        <p>Health: {selectedMarker.health}</p>
                                        <p>Strength: {selectedMarker.strength}</p>
                                        <p>Happiness: {selectedMarker.happiness}</p>
                                    </>
                                )}
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






