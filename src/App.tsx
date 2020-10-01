import React, { useState } from 'react';

import SearchContainer from './containers/SearchContainer';
import SideBar from './containers/SideBar';
import SpotifyItem from './spotify/types/SpotifyItem';

import './App.css';

const App = () => {
  const [tracks, setTracks] = useState<Array<SpotifyItem>>([]);

  const updateContent = (_tracks: any) => {
    setTracks(_tracks);
  };

  return (
    <div className="container">
      <SideBar handleClick={updateContent} />
      <SearchContainer handleSearch={updateContent} tracks={tracks} />
    </div>
  );
};

export default App;
