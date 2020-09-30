import React from 'react';

import AlbumCover from './AlbumCover';
import SpotifyItem from '../spotify/types/SpotifyItem';
import './SearchResult.css';

interface SearchResultProps {
  item: SpotifyItem;
}

const mapTrackName = (item: SpotifyItem) => {
  return item.name;
};

const mapAlbumId = (item: SpotifyItem) => {
  return item.album.id;
};

export default ({ item }: SearchResultProps) => {
  return (
    <div className="search-result">
      <div className="grid-column__image">
        <AlbumCover id={`${mapAlbumId(item)}`} />
      </div>
      <span className="grid-column__text">{mapTrackName(item)}</span>
    </div>
  );
};
