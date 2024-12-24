import React from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { registerIcons } from '@fluentui/react/lib/Styling';
import { ChevronDownRegular, CheckmarkRegular } from '@fluentui/react-icons';

initializeIcons();
registerIcons({
  icons: {
    chevrondown: React.createElement(ChevronDownRegular),
    CheckMark: React.createElement(CheckmarkRegular)
  }
});
