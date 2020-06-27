import React from 'react';
import axios from 'axios';
import './AlbumCover.css';

class AlbumCover extends React.Component {
  state = {
    imageURL: '',
  };

  async componentDidMount() {
    const { id } = this.props;

    const response = await axios.get(`http://localhost:3000/albums/${id}`);

    this.setState({
      imageURL: response.data.images.find(
        image => image.height === 300 && image.width === 300
      ).url,
    });
  }

  render() {
    if (!this.state.imageURL) {
      return <div className="album-cover"></div>;
    }

    return (
      <div className="album-cover">
        <img src={this.state.imageURL} />
      </div>
    );
  }
}

export default AlbumCover;
