import React from 'react';
import { Stack, Text, PrimaryButton } from '@fluentui/react';
import axios from 'axios';
import { DropdownFilter } from './components/DropdownFilter';
import { TextFilter } from './components/TextFilter';
import { CheckboxFilter } from './components/CheckboxFilter';
import { useFilterState } from './hooks/useFilterState';
import { useStyles } from './FilterPanel.styles';
import { AutocompleteFilter } from './components/AutocompleteFilter'

interface FilterPanelProps {
  endpoint: string;
  filters: { label: string; field: string; type: 'dropdown' | 'text' | 'checkbox' | 'autocomplete'; multiSelect?: boolean, includeAll?: boolean; }[];
  onDataFetched: (data: any, selectedFilters: { [key: string]: string[] | string }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ endpoint, filters, onDataFetched }) => {
  const classes = useStyles();
  const { filterOptions, selectedFilters, setSelectedFilters, disabledFields, setDisabledFields } = useFilterState(endpoint, filters);

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

  const handleSpecialChange = (field: string, isChecked: boolean) => {
    setSelectedFilters(prev => ({ ...prev, [field]: isChecked ? 'true' : '' }));
    setDisabledFields({
      year: isChecked,
      range: isChecked,
      last5Years: field === 'last10Years' && isChecked,
      last10Years: field === 'last5Years' && isChecked,
    });
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();
    const currentYear = new Date().getFullYear();

    Object.entries(selectedFilters).forEach(([key, value]) => {
    if (key === 'last5Years' && value === 'true') {
      queryParams.append('range', `${currentYear - 5}-${currentYear}`);
    } else if (key === 'last10Years' && value === 'true') {
      queryParams.append('range', `${currentYear - 10}-${currentYear}`);
    } else if (Array.isArray(value)) {
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
    <Stack className={classes.root}>
      <Stack className={classes.filterContainer}>
        {filters.map(filter => {
          switch (filter.type) {
            case 'dropdown':
              return (
                <DropdownFilter
                  key={filter.field}
                  field={filter.field}
                  label={filter.label}
                  options={filterOptions[filter.field] || []}
                  selectedValue={selectedFilters[filter.field]}
                  onChange={handleFilterChange}
                  multiSelect={filter.multiSelect}
                  disabled={disabledFields[filter.field]}
                />
              );
            case 'text':
              return (
                <TextFilter
                  key={filter.field}
                  field={filter.field}
                  label={filter.label}
                  onChange={handleFilterChange}
                  disabled={disabledFields[filter.field]}
                />
              );
            case 'checkbox':
              return (
                <CheckboxFilter
                  key={filter.field}
                  field={filter.field}
                  label={filter.label}
                  checked={selectedFilters[filter.field] === 'true'}
                  onChange={(field, checked) => handleFilterChange(field, checked ? 'true' : '')}
                  onSpecialChange={handleSpecialChange}
                  disabled={disabledFields[filter.field]}
                />
              );
            case 'autocomplete':
              return (
                <AutocompleteFilter
                  key={filter.field}
                  field={filter.field}
                  label={filter.label}
                  onChange={handleFilterChange}
                  disabled={disabledFields[filter.field]}
                />
              );
            default:
              return null;
          }
        })}
        <PrimaryButton text="Submit" onClick={handleSubmit} />
      </Stack>
    </Stack>
  );
};

export default FilterPanel;
