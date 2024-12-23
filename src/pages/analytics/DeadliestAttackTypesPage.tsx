import React, { useState } from 'react';
import ChartComponent from '../../components/ChartComponent';
import FilterPanel from '../../components/FilterPanel';
import { BASE_URL } from '../../services/api';

const DeadliestAttackTypesPage = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string | string[] }>({});

  const handleDataFetched = (data: any, selectedFilters: { [key: string]: string | string[] }) => {
    const filteredData = data.filter((item: any) => {
      return Object.keys(selectedFilters).every(key => {
        const filter = selectedFilters[key];
        return Array.isArray(filter) ? 
          (filter.length === 0 || filter.includes(item._id)) :
          (filter === '' || filter === item._id);
      });
    });

    setChartData({
      labels: filteredData.map((item: any) => item._id),
      datasets: [{
        label: 'Total Casualties',
        data: filteredData.map((item: any) => item.totalCasualties),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    });
  };

  return (
    <div>
      <FilterPanel
        endpoint={`${BASE_URL}analysis/deadliest-attack-types`}
        filters={[
          { label: 'Attack Types', field: 'attacktype1_txt', type: 'dropdown', multiSelect: true },
        ]}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        onDataFetched={handleDataFetched}
      />
      
      {chartData && <ChartComponent type="bar" data={chartData} />}
    </div>
  );
};

export default DeadliestAttackTypesPage;