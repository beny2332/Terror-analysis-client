import { useState, useEffect } from 'react';
import axios from 'axios';
import { IDropdownOption } from '@fluentui/react';

export const useFilterState = (endpoint: string, filters: any[]) => {
  const [filterOptions, setFilterOptions] = useState<{ [key: string]: IDropdownOption[] }>({});
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] | string }>({});
  const [disabledFields, setDisabledFields] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (endpoint.includes('groups-by-year')) {
      return;
    }

    axios.get(endpoint)
      .then(response => {
        const newFilterOptions: { [key: string]: IDropdownOption[] } = {};
        filters.forEach(filter => {
          if (filter.type === 'dropdown') {
            const options = response.data.map((item: any) => ({
              key: item._id,
              text: item._id,
            }));
            newFilterOptions[filter.field] = filter.includeAll 
            ? [{ key: 'all', text: 'All' }, ...options]
            : options;
          }
        });
        setFilterOptions(newFilterOptions);
      })
      .catch(error => console.error(`Error fetching data from ${endpoint}:`, error));
  }, [endpoint, filters]);

  return {
    filterOptions,
    selectedFilters,
    setSelectedFilters,
    disabledFields,
    setDisabledFields
  };
};
