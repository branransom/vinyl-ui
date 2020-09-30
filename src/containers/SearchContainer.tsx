import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import SpotifyItem from '../spotify/types/SpotifyItem';

import './SearchContainer.css';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<Array<SpotifyItem>>([]);

  const setResultsWhenUserStopsTyping = useCallback(
    debounce(async searchValue => {
      const { data } = await axios.get(
        `/search?q=${searchValue}&type=track&limit=10`
      );

      setResults(data.tracks.items);
    }, 1000),
    []
  );

  useEffect(() => {
    if (value !== '') {
      setResultsWhenUserStopsTyping(value);
    }
  }, [value]);

  const handleChange = (event: InputEvent) => {
    setValue(event.target.value);
  };

  return (
    <div className="div__search-container">
      <div className="div__search-bar">
        <SearchBar handleChange={handleChange} value={value} />
      </div>
      <div className="div__search-results">
        {results.map(result => (
          <SearchResult item={result} />
        ))}
      </div>
    </div>
  );
};
