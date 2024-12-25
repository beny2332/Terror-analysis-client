import React, { useState } from 'react';
import SearchBar from '../components/SearchBar/index';
import PageLayout from '../components/pageLayout/PageLayout';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results as never[]);
  };

  return (
    <PageLayout>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <SearchBar onResultsFound={handleSearchResults} />
      </div>
    </PageLayout>
  );
};

export default SearchPage;
