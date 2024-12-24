import React from 'react';
import { Stack, Text } from '@fluentui/react';
import { pages } from '../../pages/routes';
import { useLocation } from 'react-router-dom';
import { useStyles } from './PageLayout.styles.ts';


interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1); 
  const pageTitle = pages.find(p => p.path === currentPath)?.display;
  const classes = useStyles();
  return (
    <>
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}}>
      <Text as="h1" className={classes.mainHeader}>{pageTitle}</Text>
      {children}
    </Stack>
    </>
  );
};

export default PageLayout;
