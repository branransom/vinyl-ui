import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './AlbumCover.css';

interface AlbumCoverProps {
  id: string;
}

const AlbumCover = (props: AlbumCoverProps) => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const { id } = props;

    const fetchImage = async () => {
      const response = await axios.get(`http://localhost:4000/albums/${id}`);

      setImageURL(
        response.data.images.find(
          (image: { height: number; width: number }) =>
            image.height === 300 && image.width === 300
        ).url
      );
    };

    fetchImage();
  }, []);

  if (!imageURL) {
    return <div className="album-cover" />;
  }

  return (
    <div className="album-cover">
      <img alt="album cover" src={imageURL} />
    </div>
  );
};

export default AlbumCover;
