import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChordSheetJS from 'chordsheetjs';

import SearchContainer from './containers/SearchContainer';
import SideBar from './containers/SideBar';
import SpotifyItem from './spotify/types/SpotifyItem';

import './App.scss';

const chordSheet = `
{title: Let it be}
{artist: The Beatles}
{Chorus}

Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be
[C]Whisper words of [G]wisdom, let it [F]be [C/E] [Dm] [C]`.substring(1);

const parser = new ChordSheetJS.ChordProParser();
const song = parser.parse(chordSheet);

const formatter = new ChordSheetJS.HtmlTableFormatter();
const disp = formatter.format(song);

const App = () => {
  const [tracks, setTracks] = useState<Array<SpotifyItem>>([]);
  const [view, setView] = useState<string>('TRACKS'); // make this an enum

  const updateContent = (_tracks: any) => {
    setTracks(_tracks);
  };

  const updateView = (_view: any) => {
    setView(_view);
  };

  return (
    <div className="container">
      <SideBar handleClick={updateContent} />
      {view === 'TRACKS' ? (
        <SearchContainer
          handleSearch={updateContent}
          tracks={tracks}
          handleViewUpdate={updateView}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: disp }} />
      )}
    </div>
  );
};

export default App;
