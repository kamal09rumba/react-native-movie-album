import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import AlbumDetail from './AlbumDetail';
import data from './data/movies.json';

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: data,
      isLoading: true,
    };
  }

  // helper function to render album details
  renderAlbums() {
    return this.state.movies.map((movie) => (
      <AlbumDetail key={movie.id} movie={movie} />
    ));
  }

  render() {
    return <ScrollView>{this.renderAlbums()}</ScrollView>;
  }
}

export default AlbumList;
