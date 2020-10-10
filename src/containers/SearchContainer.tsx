import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import SearchBar from '../components/SearchBar';
import Track from '../components/Track';

import './SearchContainer.css';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface SearchContainerProps {
  handleSearch: (tracks: Array<any>) => void;
  tracks: Array<any>;
}

export default (props: SearchContainerProps) => {
  const { tracks = [], handleSearch } = props;

  const [value, setValue] = useState('');

  const setResultsWhenUserStopsTyping = useCallback(
    debounce(async searchValue => {
      const { data } = await axios.get(
        `/search?q=${searchValue}&type=track&limit=10`
      );

      handleSearch(data.tracks.items);
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
      <div className="div__header">
        <span className="div__header--track">TITLE</span>
        <span className="div__header--artist">ARTIST</span>
      </div>
      <div className="div__search-results">
        {tracks.map(track => (
          <Track item={track} />
        ))}
      </div>
    </div>
  );
};
