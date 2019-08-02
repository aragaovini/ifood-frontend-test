import React from 'react';
import './assets/css/App.css';
import { requireLogin } from './auth/spotify'

class App extends React.Component {
  componentDidMount() {
    requireLogin()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Spotifood
        </header>
      </div>
    );
  }
}

export default App;
