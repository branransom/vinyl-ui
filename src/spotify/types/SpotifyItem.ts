type SpotifyImage = {
  height: number;
  width: number;
  url: string;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyItem = {
  album: {
    id: string;
    name: string;
    images: Array<SpotifyImage>;
  };
  artists: Array<SpotifyArtist>;
  duration_ms: number;
  id: string;
  name: string;
};

export default SpotifyItem;
