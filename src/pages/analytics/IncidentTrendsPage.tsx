import React, { useState } from 'react';
import ChartComponent from '../../components/ChartComponent';
import FilterPanel from '../../components/FilterPanel';
import { BASE_URL } from '../../services/api';

const IncidentTrendsPage = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string | string[] }>({});

  const handleDataFetched = (data: any, selectedFilters: { [key: string]: string | string[] }) => {
    const filteredData = data.filter((item: any) => {
      return Object.keys(selectedFilters).every(key => {
        const filterValue = selectedFilters[key];
        if (!filterValue) return true;
        if (key === 'range' && typeof filterValue === 'string') {
          const [startYear, endYear] = filterValue.split('-').map(Number);
          return item._id.year >= startYear && item._id.year <= endYear;
        }
        if (key === 'last5Years' || key === 'last10Years') {
          const currentYear = new Date().getFullYear();
          const yearsAgo = key === 'last5Years' ? 5 : 10;
          return item._id.year >= currentYear - yearsAgo;
        }
        return item._id.year === Number(filterValue);
      });
    });

    setChartData({
      labels: filteredData.map((item: any) => `${item._id.month}-${item._id.year}`),
      datasets: [{
        label: 'Incident Count',
        data: filteredData.map((item: any) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    });
  };

  return (
    <div>
      <FilterPanel
        endpoint={`${BASE_URL}analysis/incident-trends`}
        filters={[
          { label: 'Year', field: 'year', type: 'text' },
          { label: 'Range (e.g., 2015-2017)', field: 'range', type: 'text' },
          { label: 'Last 5 Years', field: 'last5Years', type: 'checkbox' },
          { label: 'Last 10 Years', field: 'last10Years', type: 'checkbox' },
        ]}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        onDataFetched={handleDataFetched}
      />
      
      {chartData && <ChartComponent type="line" data={chartData} />}
    </div>
  );
};
export default IncidentTrendsPage;