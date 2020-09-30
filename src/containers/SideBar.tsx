import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SpotifyItem from '../spotify/types/SpotifyItem';

import './SideBar.css';

export default () => {
  const [results, setResults] = useState<Array<SpotifyItem>>([]);

  useEffect(() => {
    axios.get('/playlists').then(({ data }) => {
      setResults(data.items);
    });
  }, []);

  return (
    <div className="gridrow__side-bar">
      <h1>Playlists</h1>
      {results.map(result => (
        <div className="div__playlist">{result.name}</div>
      ))}
    </div>
  );
};
