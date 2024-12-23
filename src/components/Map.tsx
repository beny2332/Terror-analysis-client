import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  data: { lat: number; lng: number; label?: string }[];
}

const Map: React.FC<MapProps> = ({ data }) => {
  useEffect(() => {
    if (data.length === 0) return;

    const map = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers = data.map(point => 
      L.marker([point.lat, point.lng])
        .addTo(map)
        .bindPopup(point.label || 'No label')
    );

    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds());

    return () => {
      map.remove();
    };
  }, [data]);
  return <div id="map" style={{ height: '90vh', width: '90vw' }} />;
};

export default Map;