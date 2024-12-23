import { useState } from 'react';
import Map from '../../components/Map';
import FilterPanel from '../../components/FilterPanel';
import { BASE_URL } from '../../services/api';
import { Stack } from '@fluentui/react';
import { getLatitude, getLongitude } from '../../utils/getLatLon'

const HighestCasualtyRegionsPage = () => {
  const [data, setData] = useState<{ lat: number; lng: number; label?: string }[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string | string[] }>({ region: 'all' });

  const handleDataFetched = (data: any, filters: { [key: string]: string | string[] }) => {
    const regions = data.map((region: any) => ({
      lat: getLatitude(region._id), 
      lng: getLongitude(region._id), 
      label: `${region._id}: ${region.avgCasualties.toFixed(2)} average casualties`,
    }));
    setData(regions);
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
      <h1>Highest Casualty Regions</h1>
      <FilterPanel
        endpoint={`${BASE_URL}analysis/highest-casualty-regions`}
        filters={[
          { label: 'Region', field: 'region', type: 'dropdown', multiSelect: false },
        ]}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        onDataFetched={handleDataFetched}
      />
      <Map data={data} />
    </Stack>
  );
};

export default HighestCasualtyRegionsPage;