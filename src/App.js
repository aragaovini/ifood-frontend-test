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
    mustResetPagination: true,
    intervalUpatePlaylists: () => {}
  }

  async getData() {
    try {
      const { data: { filters } } = await getFilters()
      this.setState({
        filters
      })
      this.getPlaylists()
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
      this.getPlaylists()
    })
  }

  handlePagination(offset) {
    this.getPlaylists(offset)
  }

  async getPlaylists(offset = 0) {
    try {
      let { query, intervalUpatePlaylists } = this.state

      query = { ...query, offset }
      const { data: { playlists } } = await getFeaturedPlaylist(query)
      const mustResetPagination = !playlists.offset

      clearInterval(intervalUpatePlaylists)
      const intervalMethod = setInterval(() => { this.getPlaylists() }, 30000);

      this.setState({
        playlists: playlists.items,
        limit: query.limit,
        total: playlists.total,
        mustResetPagination,
        intervalUpatePlaylists: intervalMethod
      })
    } catch(error) {
      console.error(`Enable to get filtered playlists`)
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { playlists, filters, limit, total, mustResetPagination } = this.state
    return (
      <div className="App">
        <header className="App-header">
          Spotifood
          <Filter 
            filters={filters} 
            handleFieldsChange={(field, value) => this.handleFieldsValues(field, value)}/>
          <div>
            <List 
              limit={limit} 
              total={total} 
              items={playlists}
              mustResetPagination={mustResetPagination}
              handlePageChange={(offset) => this.handlePagination(offset)} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
