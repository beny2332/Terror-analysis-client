import React, { useState } from 'react';
import {
  Hamburger,
  NavDrawer,
  NavItem,
  NavCategory,
  NavCategoryItem,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { pages } from '../pages/routes';
import { bundleIcon, DataArea20Filled, DataArea20Regular, Map20Filled, Map20Regular } from '@fluentui/react-icons';

const AnalyticsIcon = bundleIcon(DataArea20Filled, DataArea20Regular);
const MapsIcon = bundleIcon(Map20Filled, Map20Regular);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openBtn = (
    <Hamburger
      style={{ padding: '1em 2em' }}
      onClick={() => setIsOpen(!isOpen)}
    />
  );

  const analyticsPages = pages.filter(page => 
    ['deadliestAttackTypesPage', 'incidentTrendsPage', 'groupsByYearPage'].includes(page.path)
  );

  const otherPages = pages.filter(page => 
    !['deadliestAttackTypesPage', 'incidentTrendsPage', 'groupsByYearPage'].includes(page.path)
  );

  return (
    <>
      {!isOpen && openBtn}
      <NavDrawer open={isOpen} size="medium">
        {openBtn}
        <NavCategory value="analytics">
          <NavCategoryItem icon={<AnalyticsIcon />} value="analytics">
            Analytics
          </NavCategoryItem>
          <NavSubItemGroup>
            {analyticsPages.map((page) => (
              <NavSubItem
                key={page.path}
                href={'/' + page.path}
                as="a"
                value={page.path}
              >
                {page.display}
              </NavSubItem>
            ))}
          </NavSubItemGroup>
        </NavCategory>
        <NavCategory value="maps">
          <NavCategoryItem icon={<MapsIcon />} value="maps">
            Maps
          </NavCategoryItem>
          <NavSubItemGroup>
            {otherPages.map((page) => (
              <NavSubItem
                key={page.path}
                href={'/' + page.path}
                as="a"
                value={page.path}
              >
                {page.display}
              </NavSubItem>
            ))}
          </NavSubItemGroup>
        </NavCategory>
      </NavDrawer>
    </>
  );
};

export default Navbar;