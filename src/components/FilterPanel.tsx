import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { registerIcons } from '@fluentui/react/lib/Styling';
import { Checkmark12Regular } from '@fluentui/react-icons';
import { Dropdown, IDropdownOption, PrimaryButton, Stack, Text, TextField, Checkbox,} from '@fluentui/react';

interface FilterPanelProps {
  endpoint: string;
  filters: { label: string; field: string; type: 'dropdown' | 'text' | 'checkbox'; multiSelect?: boolean }[];
  onDataFetched: (data: any, selectedFilters: { [key: string]: string[] | string }) => void;
  selectedFilters: { [key: string]: string[] | string };
  setSelectedFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string[] | string }>>;
}
initializeIcons();
registerIcons({
  icons: {
    checkmark: <Checkmark12Regular />
  }
});
const FilterPanel: React.FC<FilterPanelProps> = ({ endpoint, filters, onDataFetched, selectedFilters, setSelectedFilters }) => {
  const [filterOptions, setFilterOptions] = useState<{ [key: string]: IDropdownOption[] }>({});
  const [disabledFields, setDisabledFields] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    axios.get(endpoint)
      .then(response => {
        const newFilterOptions: { [key: string]: IDropdownOption[] } = {};
        filters.forEach(filter => {
          if (filter.type === 'dropdown') {
            const options = response.data.map((item: any) => ({
              key: item._id,
              text: item._id,
            }));
            newFilterOptions[filter.field] = filter.multiSelect ? options : [{ key: 'all', text: 'All' }, ...options];
          }
        });
        setFilterOptions(newFilterOptions);
      })
      .catch(error => console.error(`Error fetching data from ${endpoint}:`, error));
  }, [endpoint, filters]);

  const handleFilterChange = (field: string, value: string | string[]) => {
    setSelectedFilters(prev => ({ ...prev, [field]: value }));
    if (field === 'year' || field === 'range') {
      const isEmpty = value === '';
      setDisabledFields({
        year: !isEmpty && field !== 'year',
        range: !isEmpty && field !== 'range',
        last5Years: !isEmpty,
        last10Years: !isEmpty,
      });
    }
  };

  const handleCheckboxChange = (field: string, isChecked: boolean) => {
    setSelectedFilters(prev => ({ ...prev, [field]: isChecked ? 'true' : '' }));
    setDisabledFields({
      year: isChecked,
      range: isChecked,
      last5Years: field === 'last10Years' && isChecked,
      last10Years: field === 'last5Years' && isChecked,
    });
  };

  useEffect(() => {
    const allEmpty = Object.values(selectedFilters).every(value => value === '' || (Array.isArray(value) && value.length === 0));
    if (allEmpty) {
      setDisabledFields({
        year: false,
        range: false,
        last5Years: false,
        last10Years: false,
      });
    }
  }, [selectedFilters]);

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();
    Object.keys(selectedFilters).forEach(key => {
      const value = selectedFilters[key];
      if (Array.isArray(value)) {
        if (value.length > 0) {
          queryParams.append(key, value.join(','));
        }
      } else if (value && value !== 'all') {
        queryParams.append(key, value);
      }
    });

    axios.get(`${endpoint}?${queryParams.toString()}`)
      .then(response => {
        onDataFetched(response.data, selectedFilters);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { width: 300, margin: '0 auto', padding: 20 } }}>
      <Text variant="large">Filter Panel</Text>
      {filters.map(filter => (
        filter.type === 'dropdown' ? (
          <Dropdown
            key={filter.field}
            placeholder={`Select ${filter.label}`}
            label={filter.label}
            options={filterOptions[filter.field] || []}
            selectedKey={filter.multiSelect ? undefined : (selectedFilters[filter.field] as string || 'all')}
            selectedKeys={filter.multiSelect ? (selectedFilters[filter.field] as string[]) : undefined}
            onChange={(event, option) => {
              if (!option) return;
              if (filter.multiSelect) {
                const currentSelected = selectedFilters[filter.field] as string[] || [];
                const newSelected = currentSelected.includes(option.key as string)
                  ? currentSelected.filter(key => key !== option.key)
                  : [...currentSelected, option.key as string];
                handleFilterChange(filter.field, newSelected);
              } else {
                handleFilterChange(filter.field, option.key as string);
              }
            }}
            multiSelect={filter.multiSelect}
            disabled={disabledFields[filter.field]}
          />
        ) : filter.type === 'checkbox' ? (
          <Checkbox
            key={filter.field}
            label={filter.label}
            checked={selectedFilters[filter.field] === 'true'}
            onChange={(event, checked) => handleCheckboxChange(filter.field, checked || false)}
            disabled={disabledFields[filter.field]}
          />
        ) : (
          <TextField
            key={filter.field}
            label={filter.label}
            onChange={(event, newValue) => handleFilterChange(filter.field, newValue || '')}
            disabled={disabledFields[filter.field]}
          />
        )
      ))}
      <PrimaryButton text="Submit" onClick={handleSubmit} />
    </Stack>
  );
};

export default FilterPanel;