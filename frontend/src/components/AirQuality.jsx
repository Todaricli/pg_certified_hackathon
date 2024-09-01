import React, { useState, useEffect } from 'react';

const AirQuality = () => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const fetchAirQuality = async (latitude, longitude) => {
      const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
      console.log('Fetching air quality data with:', { latitude, longitude });

      try {
        const response = await fetch(
          `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              location: {
                latitude: latitude,
                longitude: longitude,
              },
            }),
          }
        );

        console.log('API Response:', response);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Received air quality data:', data);
        setAirQualityData(data);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
        setError('Failed to fetch air quality data');
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        console.log('Getting current location...');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Current position:', { latitude, longitude });
            setLocation({ latitude, longitude });
            fetchAirQuality(latitude, longitude);
          },
          (geoError) => {
            console.error('Error getting location:', geoError);
            setError('Failed to get your location');
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  console.log('Current location:', location);
  console.log('Air Quality Data:', airQualityData);

  if (error) {
    return <div>{error}</div>;
  }

  if (!airQualityData) {
    return <div>Loading air quality data...</div>;
  }

  // Extract the AQI data from the indexes array
  const aqiData = airQualityData.indexes?.[0];

  return (
    <div>
      <h2>Air Quality Index (AQI): {aqiData?.aqi}</h2>
      <p>Display Value: {aqiData?.aqiDisplay}</p>
      <p>Category: {aqiData?.category}</p>
      <p>Dominant Pollutant: {aqiData?.dominantPollutant}</p>
      <p>Color Representation: rgb({Math.round(aqiData?.color.red * 255)}, {Math.round(aqiData?.color.green * 255)}, {Math.round(aqiData?.color.blue * 255)})</p>
      <p>Display Name: {aqiData?.displayName}</p>
    </div>
  );
};

export default AirQuality;
