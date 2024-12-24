import React from 'react';
import { TextField } from '@fluentui/react';

interface TextFilterProps {
  field: string;
  label: string;
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

export const TextFilter: React.FC<TextFilterProps> = ({
  field,
  label,
  onChange,
  disabled
}) => (
  <TextField
    key={field}
    label={label}
    onChange={(_, newValue) => onChange(field, newValue || '')}
    disabled={disabled}
  />
);
