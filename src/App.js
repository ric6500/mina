import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const src =
"https://storageapi.fleek.co/8b69b791-a113-4a7f-8d37-f4905b484016-bucket/panasonic-hokkaido-and-tokyo-uhd-(www.demolandia.net).mp4";

class App extends Component {


render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <video controls width="100%">
      <source src={src} type="video/mp4" />
      Sorry, your browser doesn't support embedded videos.
    </video>
      </header>
    </div>
  );
}
}

export default App;
