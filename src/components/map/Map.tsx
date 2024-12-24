import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  data: { lat: number; lng: number; label?: string }[];
  onMapClick?: (point: { lat: number; lng: number }) => void;
}

const Map: React.FC<MapProps> = ({ data, onMapClick }) => {
  useEffect(() => {
    if (data.length === 0) return;

    const map = L.map('map').setView([33.8735578, 35.86379], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (onMapClick) {
      map.on('click', (e: L.LeafletMouseEvent) => {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      });
    }

    const markers = data.map(point => 
      L.marker([point.lat, point.lng])
        .addTo(map)
        .bindPopup(point.label || 'No label')
    );

    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds(), {
      //  padding: [100, 100],
       maxZoom: 3
    });

    return () => {
      map.remove();
    };
  }, [data]);
  return <div id="map" style={{ height: '90vh', width: '90vw' }} />;
};

export default Map;
