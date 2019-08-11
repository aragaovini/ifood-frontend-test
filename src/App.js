import React from 'react';
import './assets/css/App.css';
import { getFeaturedPlaylist } from './services/spotify';
import getFilters from './services/filters';
import List from './components/List/List';
import Filter from './components/Filter/Filter';
import Loader from './components/Loader/Loader';
import { Toast } from 'react-bootstrap';

class App extends React.Component {
  state = {
    playlists: [],
    filters: [],
    query: {},
    offset: 0,
    limit: 0,
    total: 0,
    intervalUpatePlaylists: () => {},
    errorMessage: '',
    isLoading: false
  };

  showToast = errorMessage => {
    this.setState({ errorMessage }, () => {
      setTimeout(() => {
        this.setState({ errorMessage: '' });
      }, 5000);
    });
  };

  async getData() {
    try {
      this.setState({ isLoading: true });
      const {
        data: { filters }
      } = await getFilters();
      await this.getPlaylists();

      this.setState({
        filters,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false });
      this.showToast('Unable to get data to show spotify playlist');
    }
  }

  handleFieldsValues(field, value) {
    this.setState(
      {
        query: {
          ...this.state.query,
          [field]: value
        }
      },
      () => {
        this.getPlaylists();
      }
    );
  }

  async handlePagination(offset) {
    this.getPlaylists(offset);
  }

  handleInterval() {
    const { intervalUpatePlaylists } = this.state;
    clearInterval(intervalUpatePlaylists);
    return setInterval(() => {
      this.getPlaylists();
    }, 30000);
  }

  getPlaylists(offset = 0) {
    return new Promise(async (accept, reject) => {
      try {
        let { query, isLoading } = this.state;

        if (!isLoading) this.setState({ isLoading: true });

        query = { ...query, offset };
        const {
          data: { playlists }
        } = await getFeaturedPlaylist(query);
        const intervalMethod = this.handleInterval();

        this.setState(
          {
            playlists: playlists.items,
            limit: query.limit,
            total: playlists.total,
            offset: query.offset,
            intervalUpatePlaylists: intervalMethod,
            isLoading: false
          },
          () => {
            accept();
          }
        );
      } catch (error) {
        this.showToast(`Unable to get playlists: ${error.message || error}`);
        this.setState({ isLoading: false });
        reject(error);
      }
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const {
      playlists,
      filters,
      limit,
      total,
      offset,
      errorMessage,
      isLoading
    } = this.state;
    return (
      <div className="App">
        {isLoading && <Loader />}
        <header className="App-header">
          <h1>Spotifood</h1>
          <Filter
            filters={filters}
            handleFieldsChange={(field, value) =>
              this.handleFieldsValues(field, value)
            }
          />
          <div>
            <List
              limit={limit}
              total={total}
              offset={offset}
              items={playlists}
              handlePageChange={offset => this.handlePagination(offset)}
            />
          </div>
        </header>
        <Toast className="toast-message" show={!!errorMessage}>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default App;
