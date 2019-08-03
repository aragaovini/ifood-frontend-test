import React from 'react';
import './assets/css/App.css';
import { getFeaturedPlaylist } from './services/spotify'
import getFilters from './services/filters'

class App extends React.Component {
  state = {
    playlists: [],
    filters: []
  }

  async getPlaylist() {
    try {
      const { data: { playlists } } = await getFeaturedPlaylist()
      this.setState({
        playlists: playlists.items
      })
    } catch(error) {
      console.error('Unable to get featured playlist')
    }
  }

  async getFilters() {
    try {
      const { data: { filters } } = await getFilters()
      this.setState({
        filters
      })
    } catch(error) {
      console.error('Unable to get filters')
    }
  }

  componentDidMount() {
    this.getPlaylist()
    this.getFilters()
  }

  render() {
    const { playlists, filters } = this.state
    return (
      <div className="App">
        <header className="App-header">
          Spotifood
          <div>Filters: { filters && filters.map(filter => (<h1>{ filter.name }</h1>)) }</div>
          <div>
            { playlists && playlists.map(playlist => <h3>{playlist.name}</h3>) }
          </div>
        </header>
        
      </div>
    );
  }
}

export default App;
