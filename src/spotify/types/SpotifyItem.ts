type SpotifyImage = {
  height: number;
  width: number;
  url: string;
};

type SpotifyItem = {
  album: {
    id: string;
    name: string;
    images: Array<SpotifyImage>;
  };
  duration_ms: number;
  id: string;
  name: string;
};

export default SpotifyItem;
