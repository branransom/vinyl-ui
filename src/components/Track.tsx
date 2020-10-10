import React from 'react';
import { Link } from 'react-router-dom';

import AlbumCover from './AlbumCover';
import SpotifyItem from '../spotify/types/SpotifyItem';
import Button from './Button';

import './Track.scss';

interface TrackProps {
  handleViewUpdate: (viewName: string) => void;
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

export default ({ handleViewUpdate, item }: TrackProps) => {
  const updateViewToChordChart = () => {
    handleViewUpdate('CHORD_CHART');
  };

  return (
    <div className="track">
      <div className="grid-column__image">
        <AlbumCover id={`${mapAlbumId(item)}`} />
      </div>
      <span className="grid-column__track">{mapTrackName(item)}</span>
      <span className="grid-column__artist">{mapTrackArtist(item)}</span>
      <Button handleClick={updateViewToChordChart} content="CHORD CHART" />
    </div>
  );
};
