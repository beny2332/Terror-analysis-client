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
import { bundleIcon, DataArea20Filled, DataArea20Regular, Map20Filled, Map20Regular, Home20Filled, Home20Regular } from '@fluentui/react-icons';

const AnalyticsIcon = bundleIcon(DataArea20Filled, DataArea20Regular);
const MapsIcon = bundleIcon(Map20Filled, Map20Regular);
const HomeIcon = bundleIcon(Home20Filled, Home20Regular); 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openBtn = (
    <Hamburger
      style={{ padding: '1em 2em' }}
      onClick={() => setIsOpen(!isOpen)}
    />
  );

  const homePage = pages.find(page => page.path === "/");
  const analyticsPages = pages.filter(page => page.category === "analytics");
  const mapPages = pages.filter(page => page.category === "maps");

  return (
    <>
      {!isOpen && openBtn}
      <NavDrawer open={isOpen} size="medium">
        {openBtn}
        <NavItem href="/" as="a" value="home" icon={<HomeIcon/>}>
          Home
        </NavItem>
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
            {mapPages.map((page) => (
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