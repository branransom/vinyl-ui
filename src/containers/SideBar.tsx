import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SpotifyItem from '../spotify/types/SpotifyItem';

import './SideBar.scss';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
type KeyDownEvent = React.KeyboardEvent<HTMLDivElement>;

interface SideBarProps {
  handleClick: (tracks: Array<Object>) => void;
}

export default (props: SideBarProps) => {
  const [results, setResults] = useState<Array<SpotifyItem>>([]);

  useEffect(() => {
    axios.get('/playlists').then(({ data }) => {
      setResults(data.items);
    });
  }, []);

  const handleClick = async (event: ClickEvent | KeyDownEvent) => {
    const playlistId = (event.target as HTMLElement).id;
    const { data } = await axios.get(`/playlists/${playlistId}/tracks`);

    // TODO: Set item type
    props.handleClick(data.items.map((item: any) => item.track));
  };

  return (
    <div className="gridrow__side-bar">
      <h3>PLAYLISTS</h3>
      {results.map(result => (
        <div
          id={result.id}
          className="div__playlist"
          onClick={handleClick}
          onKeyDown={handleClick}
          role="button"
          tabIndex={0}
        >
          {result.name}
        </div>
      ))}
    </div>
  );
};
