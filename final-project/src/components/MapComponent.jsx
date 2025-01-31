import React, { useEffect, useRef } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only if it hasn't been initialized yet
      mapRef.current = L.map('map');

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Get the current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current.setView([latitude, longitude], 13);

          L.marker([latitude, longitude]).addTo(mapRef.current)
            .bindPopup('<b>Your current location</b>')
            .openPopup();
        },
        (error) => {
          console.error(error);
          // Set default view if location access is denied
          mapRef.current.setView([51.505, -0.09], 13);
          L.marker([51.505, -0.09]).addTo(mapRef.current)
            .bindPopup('<b>Default location</b>')
            .openPopup();
        }
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

export default MapComponent;
