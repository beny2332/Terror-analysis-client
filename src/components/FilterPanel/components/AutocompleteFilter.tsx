import React, { useState, useEffect } from 'react';
import { ComboBox, IComboBoxOption } from '@fluentui/react';
import axios from 'axios';
import { BASE_URL } from '../../../services/api';

interface AutocompleteFilterProps {
  field: string;
  label: string;
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

export const AutocompleteFilter: React.FC<AutocompleteFilterProps> = ({
  field,
  label,
  onChange,
  disabled
}) => {
  const [options, setOptions] = useState<IComboBoxOption[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText.length >= 2) {
      fetchSuggestions(searchText);
    }
  }, [searchText]);

  const fetchSuggestions = async (searchText: string) => {
    try {
      console.log('Fetching suggestions for:', searchText);
      const response = await axios.get(`${BASE_URL}relationships/groups/search?term=${searchText}`);
      console.log('Received suggestions:', response.data);

      const suggestions = response.data.map((item: any) => ({
        key: item.group,
        text: item.group
      }));
      console.log('Processed suggestions:', suggestions);

      setOptions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const onInputChange = (newValue?: string) => {
    setSearchText(newValue || '');
    if (newValue && newValue.length >= 2) {
      fetchSuggestions(newValue);
    }
  };

  return (
    <ComboBox
      label={label}
      allowFreeform
      autoComplete="on"
      options={options}
      onChange={(_, option) => {
        if (option) {
          onChange(field, option.key as string);
          setSearchText(option.text); // Update the searchText state with the selected option
        }
      }}
      onInputValueChange={(newValue: string) => onInputChange(newValue)}
      text={searchText}
      disabled={disabled}
      openOnKeyboardFocus

    />
  );
};