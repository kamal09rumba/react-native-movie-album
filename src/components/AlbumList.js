import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({
          movies: jsonData.movies,
        });
      })
      .then((error) => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
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
