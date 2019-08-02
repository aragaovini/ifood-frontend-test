import React from 'react';
import './assets/css/App.css';
import { getFeaturedPlaylist } from './services'

class App extends React.Component {
  state = {
    playlists: []
  }

  async getPlaylist() {
    try {
      const { data } = await getFeaturedPlaylist()
      this.setState({
        playlists: data.playlists.items
      })
    } catch(error) {
      console.error('Unable to get featured playlist')
    }
  }

  componentDidMount() {
    this.getPlaylist()
  }

  render() {
    const { playlists } = this.state
    return (
      <div className="App">
        <header className="App-header">
          Spotifood
          <div>
            { playlists && playlists.map(playlist => <h3>{playlist.name}</h3>) }
          </div>
        </header>
        
      </div>
    );
  }
}

export default App;
