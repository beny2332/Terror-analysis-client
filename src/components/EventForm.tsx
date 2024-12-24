import React, { useState } from 'react';
import { TextField, PrimaryButton } from '@fluentui/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const EventForm = () => {
  const [formData, setFormData] = useState({
    iyear: '',
    imonth: '',
    iday: '',
    country_txt: '',
    region_txt: '',
    city: '',
    latitude: '',
    longitude: '',
    attacktype1_txt: '',
    targtype1_txt: '',
    target1: '',
    gname: '',
    weaptype1_txt: '',
    nkill: '',
    nwound: '',
    nperps: '',
    summary: '',
  });

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const name = (event.target as HTMLInputElement | HTMLTextAreaElement).name;
    setFormData({ ...formData, [name]: newValue || '' });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e: { latlng: { lat: number; lng: number } }) {
        setFormData({
          ...formData,
          latitude: e.latlng.lat.toString(),
          longitude: e.latlng.lng.toString(),
        });
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return formData.latitude && formData.longitude ? (
      <Marker position={[parseFloat(formData.latitude), parseFloat(formData.longitude)]} />
    ) : null;
  };

  return (
    <div>
      <TextField label="Year" name="iyear" type="number" value={formData.iyear} onChange={handleChange} />
      <TextField label="Month" name="imonth" type="number" value={formData.imonth} onChange={handleChange} />
      <TextField label="Day" name="iday" type="number" value={formData.iday} onChange={handleChange} />
      <TextField label="Country" name="country_txt" value={formData.country_txt} onChange={handleChange} />
      <TextField label="Region" name="region_txt" value={formData.region_txt} onChange={handleChange} />
      <TextField label="City" name="city" value={formData.city} onChange={handleChange} />
      <TextField label="Latitude" name="latitude" type="number" value={formData.latitude} onChange={handleChange} />
      <TextField label="Longitude" name="longitude" type="number" value={formData.longitude} onChange={handleChange} />
      <TextField label="Attack Type" name="attacktype1_txt" value={formData.attacktype1_txt} onChange={handleChange} />
      <TextField label="Target Type" name="targtype1_txt" value={formData.targtype1_txt} onChange={handleChange} />
      <TextField label="Target" name="target1" value={formData.target1} onChange={handleChange} />
      <TextField label="Group Name" name="gname" value={formData.gname} onChange={handleChange} />
      <TextField label="Weapon Type" name="weaptype1_txt" value={formData.weaptype1_txt} onChange={handleChange} />
      <TextField label="Number Killed" name="nkill" type="number" value={formData.nkill} onChange={handleChange} />
      <TextField label="Number Wounded" name="nwound" type="number" value={formData.nwound} onChange={handleChange} />
      <TextField label="Number of Perpetrators" name="nperps" type="number" value={formData.nperps} onChange={handleChange} />
      <TextField label="Summary" name="summary" multiline rows={4} value={formData.summary} onChange={handleChange} />
      <PrimaryButton text="Submit" onClick={handleSubmit} />
      <MapContainer  style={{ height: '400px', marginTop: '20px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};export default EventForm;