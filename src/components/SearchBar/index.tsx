import React, { useState } from 'react';
import { SearchBox, ISearchBoxStyles, PrimaryButton, Stack, DetailsList, IColumn, ScrollablePane, Text } from '@fluentui/react';
import axios from 'axios';
import { BASE_URL } from '../../services/api';

interface SearchBarProps {
  onResultsFound: (results: any[]) => void;
}

const createColumn = (key: string, name: string, minWidth: number, maxWidth?: number, isResizable?: boolean): IColumn => ({
  key,
  name,
  fieldName: key,
  minWidth,
  maxWidth: maxWidth || minWidth,
  isResizable,
  onRender: (item) => (
    <div title={item[key]} style={{ 
      textOverflow: 'ellipsis', 
      overflow: 'hidden',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }}>
      {item[key]}
    </div>
  )
});

const SearchBar: React.FC<SearchBarProps> = ({ onResultsFound }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const columns: IColumn[] = [
    createColumn('eventid', 'ID', 50),
    createColumn('iyear', 'Year', 60),
    createColumn('imonth', 'Month', 60),
    createColumn('iday', 'Day', 60),
    createColumn('country_txt', 'Country', 100, 120, true),
    createColumn('region_txt', 'Region', 100, 120, true),
    createColumn('city', 'City', 100, 120, true),
    createColumn('latitude', 'Latitude', 80),
    createColumn('longitude', 'Longitude', 80),
    createColumn('attacktype1_txt', 'Attack Type', 120, 150, true),
    createColumn('targtype1_txt', 'Target Type', 120, 150, true),
    createColumn('target1', 'Target', 120, 150, true),
    createColumn('gname', 'Group Name', 150, 200, true),
    createColumn('weaptype1_txt', 'Weapon Type', 120, 150, true),
    createColumn('nkill', 'Killed', 70),
    createColumn('nwound', 'Wounded', 70),
    createColumn('nperps', 'Perpetrators', 90),
    createColumn('summary', 'Summary', 200, undefined, true)
  ];

  const handleSearch = async () => {
    if (searchTerm.length >= 3) {
      try {
        const response = await axios.get(`${BASE_URL}api/search?term=${searchTerm}`);
        setResults(response.data);
        onResultsFound(response.data);
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const searchBoxStyles: Partial<ISearchBoxStyles> = {
    root: {
      width: 300,
      marginRight: 10,
      zIndex: 1
    }
  };
  const containerStyles = {
    root: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      height: '100%',
      gap: '20px'
    }
  };
  
  const searchAreaStyles = {
    root: {
      display: 'flex',
      padding: '20px',
      backgroundColor: 'white',
      zIndex: 1
    }
  };
  
  const resultsAreaStyles: React.CSSProperties = {
    overflowY: 'auto',
    overflowX: 'auto'
  };

    return (
      <div style={containerStyles.root}>
        <div style={searchAreaStyles.root}>
          <SearchBox
            placeholder="Search events..."
            onChange={(_, newValue) => setSearchTerm(newValue || '')}
            onKeyDown={handleKeyPress}
            styles={searchBoxStyles}
          />
          <PrimaryButton text="Search" onClick={handleSearch} />
        </div>
        <div style={resultsAreaStyles}>
          {results.length > 0 && (
            <DetailsList
              items={results}
              columns={columns}
              setKey="set"
              selectionMode={0}
              compact={true}
            />
          )}
        </div>
      </div>
    );
}
export default SearchBar