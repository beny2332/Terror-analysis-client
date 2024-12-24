import React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';

interface DropdownFilterProps {
  field: string;
  label: string;
  options: IDropdownOption[];
  selectedValue: string[] | string;
  onChange: (field: string, value: string | string[]) => void;
  multiSelect?: boolean;
  disabled?: boolean;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  field,
  label,
  options,
  selectedValue,
  onChange,
  multiSelect,
  disabled
}) => (
  <Dropdown
    key={field}
    placeholder={`Select ${label}`}
    label={label}
    options={options}
    selectedKey={multiSelect ? undefined : (selectedValue as string || 'all')}
    selectedKeys={multiSelect ? (selectedValue as string[]) : undefined}
    onChange={(_, option) => {
      if (!option) return;
      if (multiSelect) {
        const currentSelected = selectedValue as string[] || [];
        const newSelected = currentSelected.includes(option.key as string)
          ? currentSelected.filter(key => key !== option.key)
          : [...currentSelected, option.key as string];
        onChange(field, newSelected);
      } else {
        onChange(field, option.key as string);
      }
    }}
    multiSelect={multiSelect}
    disabled={disabled}
  />
);
