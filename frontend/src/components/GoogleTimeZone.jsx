import React, { useState, useEffect } from 'react';

const GoogleTimeZone = () => {
  const [timeZoneData, setTimeZoneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  useEffect(() => {
    const fetchTimeZoneData = async (latitude, longitude, timestamp) => {
      const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
          setTimeZoneData(data);
        } else {
          setError(`Error: ${data.errorMessage || data.status}`);
        }
      } catch (err) {
        setError(`Error fetching time zone data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    const getLocationAndFetchData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const timestamp = Math.floor(Date.now() / 1000);

            fetchTimeZoneData(latitude, longitude, timestamp);
          },
          (err) => {
            setError(`Error getting location: ${err.message}`);
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getLocationAndFetchData();
  }, [apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (timeZoneData) {
    const { timeZoneId, timeZoneName, rawOffset, dstOffset } = timeZoneData;
    const localTime = new Date(Date.now() + rawOffset * 1000 + dstOffset * 1000).toLocaleString();

    return (
      <div>
        <h2>Time Zone Information</h2>
        <p><strong>Time Zone ID:</strong> {timeZoneId}</p>
        <p><strong>Time Zone Name:</strong> {timeZoneName}</p>
        <p><strong>Raw Offset (seconds):</strong> {rawOffset}</p>
        <p><strong>DST Offset (seconds):</strong> {dstOffset}</p>
        <p><strong>Local Time:</strong> {localTime}</p>
      </div>
    );
  }

  return null;
};

export default GoogleTimeZone;
