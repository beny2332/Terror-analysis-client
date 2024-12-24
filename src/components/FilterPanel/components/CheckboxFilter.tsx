 import { Checkbox } from '@fluentui/react';
// import { CheckmarkRegular } from '@fluentui/react-icons';
// import { registerIcons } from '@fluentui/react/lib/Styling';

// registerIcons({
//   icons: {
//     Checkmark: <CheckmarkRegular />
//   }
// });
// import '../../../utils/icons';

interface CheckboxFilterProps {
  field: string;
  label: string;
  checked: boolean;
  onChange: (field: string, checked: boolean) => void;
  disabled?: boolean;
  onSpecialChange?: (field: string, checked: boolean) => void;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  field,
  label,
  checked,
  onChange,
  disabled,
  onSpecialChange
}) => (
  <Checkbox
    key={field}
    label={label}
    checked={checked}
    onChange={(_, isChecked) => {
      onChange(field, isChecked || false);
      if (onSpecialChange) {
        onSpecialChange(field, isChecked || false);
      }
    }}
    disabled={disabled}
  />
);
