import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from '../../components/Map';
import FilterPanel from '../../components/FilterPanel';
import { BASE_URL } from '../../services/api';
import { Stack } from '@fluentui/react';
import { getLatitude, getLongitude } from '../../utils/getLatLon'

const DeadliestRegionsPage = () => {
  const [data, setData] = useState<{ lat: number; lng: number; label?: string }[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string | string[] }>({});

  const handleDataFetched = (data: any, filters: { [key: string]: string | string[] }) => {
    const regions = data.map((region: any) => ({
      lat: getLatitude(region._id), 
      lng: getLongitude(region._id), 
      label: `${region._id}: ${region.totalCasualties} casualties`,
    }));
    setData(regions);
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
      <h1>Deadliest Regions</h1>
      <FilterPanel
        endpoint={`${BASE_URL}relationships/deadliest-regions`}
        filters={[
          { label: 'Group Name', field: 'gname', type: 'text' },
        ]}
        onDataFetched={handleDataFetched}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <Map data={data} />
    </Stack>
  );
};

export default DeadliestRegionsPage;