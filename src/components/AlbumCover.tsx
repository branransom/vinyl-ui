import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './AlbumCover.css';

interface AlbumCoverProps {
  id: string;
}

const AlbumCover = ({ id }: AlbumCoverProps) => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const response = await axios.get(`http://localhost:4000/albums/${id}`);

      setImageURL(
        response.data.images.find(
          (image: { height: number; width: number }) =>
            image.height === 64 && image.width === 64
        ).url
      );
    };

    fetchImage();
  }, [id]);

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
