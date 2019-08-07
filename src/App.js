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
    query: {},
    limit: 0,
    total: 0,
    offset: 0
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
      const { data: { playlists } } = await getFeaturedPlaylist(query)
      this.setState({
        playlists: playlists.items,
        limit: query.limit,
        total: playlists.total
      })
    } catch(error) {
      console.error(`Enable to get filtered playlists`)
    }
  }

  componentDidMount() {
    this.getData()
  }

  handlePagination(offset) {
    this.setState({
      query: {
        ...this.state.query,
        offset
      }
    }, () => this.getFilteredPlaylists())
  }

  render() {
    const { playlists, filters, limit, total } = this.state
    return (
      <div className="App">
        <header className="App-header">
          Spotifood
          <Filter filters={filters} handleFieldsChange={(field, value) => this.handleFieldsValues(field, value)}/>
          <div>
            <List limit={limit} total={total} items={playlists} handlePageChange={(offset) => this.handlePagination(offset)} />
          </div>
        </header>
        
      </div>
    );
  }
}

export default App;
