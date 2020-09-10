import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import SpotifyItem from '../spotify/types/SpotifyItem';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<Array<SpotifyItem>>([]);

  useEffect(() => {
    const getResults = async () => {
      const { data } = await axios.get(`/search?q=${value}&type=track`);

      setResults(data.tracks.items);
    };

    if (value !== '') {
      getResults();
    }
  }, [value]);

  const handleChange = (event: InputEvent) => {
    setValue(event.target.value);
  };

  return (
    <>
      <SearchBar handleChange={handleChange} value={value} />
      {results.map(result => (
        <SearchResult item={result} />
      ))}
    </>
  );
};
