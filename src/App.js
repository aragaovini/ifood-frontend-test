import React from 'react';
import './assets/css/App.css';
import { getFeaturedPlaylist } from './services/spotify'
import getFilters from './services/filters'
import List from './components/List'

class App extends React.Component {
  state = {
    playlists: [],
    filters: []
  }

  async getData() {
    try {
      const { data: { filters } } = await getFilters()
      const { data: { playlists: { items } } } = await getFeaturedPlaylist()

      this.setState({
        filters,
        playlists: items
      })
    } catch (error) {
      console.error('Unable to get data to show spotify playlist')
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { playlists, filters } = this.state
    return (
      <div className="App">
        <header className="App-header">
          Spotifood
          <div>Filters: { filters && filters.map(filter => (<h1>{ filter.name }</h1>)) }</div>
          <div>
            <List items={playlists} />
          </div>
        </header>
        
      </div>
    );
  }
}

export default App;
