import { useState, useEffect } from 'react';

const useGoogleMaps = (apiKey) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load the Google Maps script if it's not already loaded
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && window.google.maps) {
        setLoaded(true);
      } else {
        setError('Google Maps SDK loaded but `google.maps` is undefined.');
      }
    };

    script.onerror = () => {
      setError('Failed to load the Google Maps SDK.');
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return { loaded, error };
};

export default useGoogleMaps;
