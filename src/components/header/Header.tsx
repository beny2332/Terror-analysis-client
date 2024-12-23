import React from 'react';
import { Stack, Text } from '@fluentui/react';
import { useStyles } from './Header.styles';

const Header = () => {
  const classes = useStyles();

  return (
    <Stack className={classes.header}>
      <Text className={classes.title}>Terror Analysis Dashboard</Text>
    </Stack>
  );
};

export default Header;
