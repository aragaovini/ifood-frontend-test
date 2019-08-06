import React from 'react';
import './assets/css/App.css';
import { getFeaturedPlaylist } from './services/spotify'
import getFilters from './services/filters'
import List from './components/List'
import Filter from './components/Filter/Filter'

class App extends React.Component {
  state = {
    playlists: [],
    filters: [],
    query: {}
  }

  async getData() {
    try {
      const { data: { filters } } = await getFilters()
      const { data: { playlists: { items } } } = await getFeaturedPlaylist()

      let query = {}

      this.setState({
        filters,
        playlists: items,
        query
      })
    } catch (error) {
      console.error('Unable to get data to show spotify playlist')
    }
  }

  handleFieldsValues(field, value) {
    this.setState({
      query: {
        ...this.state.query,
        [field]:value
      }
    }, () => {
      this.getFilteredPlaylists()
    })
  }

  async getFilteredPlaylists() {
    try {
      const { query } = this.state
      const { data: { playlists: { items } } } = await getFeaturedPlaylist(query)
      this.setState({
        playlists: items
      })
    } catch(error) {
      console.error(`Enable to get filtered playlists`)
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
          <Filter filters={filters} handleFieldsChange={(field, value) => this.handleFieldsValues(field, value)}/>
          <div>
            <List items={playlists} />
          </div>
        </header>
        
      </div>
    );
  }
}

export default App;
