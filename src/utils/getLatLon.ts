  export const getLatitude = (regionName: string) => {
    const coordinates: { [key: string]: number } = {
      "Middle East & North Africa": 25.0,
      "South Asia": 20.0,
      "Sub-Saharan Africa": -1.0,
      "Southeast Asia": 10.0,
      "Central America & Caribbean": 15.0,
      "South America": -15.0,
      "Eastern Europe": 50.0,
      "Western Europe": 48.0,
      "East Asia": 35.0,
      "Central Asia": 40.0,
      "North America": 40.0,
      "Australasia & Oceania": -25.0,
    };
    return coordinates[regionName] || 0;
  };

  export const getLongitude = (regionName: string) => {
    const coordinates: { [key: string]: number } = {
      "Middle East & North Africa": 45.0,
      "South Asia": 80.0,
      "Sub-Saharan Africa": 20.0,
      "Southeast Asia": 105.0,
      "Central America & Caribbean": -85.0,
      "South America": -60.0,
      "Eastern Europe": 30.0,
      "Western Europe": 2.0,
      "East Asia": 105.0,
      "Central Asia": 65.0,
      "North America": -100.0,
      "Australasia & Oceania": 135.0,
    };
    return coordinates[regionName] || 0;
  };
