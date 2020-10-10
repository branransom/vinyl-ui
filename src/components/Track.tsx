import React from 'react';

import AlbumCover from './AlbumCover';
import SpotifyItem from '../spotify/types/SpotifyItem';
import './Track.css';

interface TrackProps {
  item: SpotifyItem;
}

const mapTrackName = (item: SpotifyItem) => {
  return item.name;
};

const mapTrackArtist = (item: SpotifyItem) => {
  return item.artists[0].name;
};

const mapAlbumId = (item: SpotifyItem) => {
  return item.album.id;
};

export default ({ item }: TrackProps) => {
  return (
    <div className="track">
      <div className="grid-column__image">
        <AlbumCover id={`${mapAlbumId(item)}`} />
      </div>
      <span className="grid-column__track">{mapTrackName(item)}</span>
      <span className="grid-column__artist">{mapTrackArtist(item)}</span>
    </div>
  );
};
