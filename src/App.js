import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const src =
"https://storageapi.fleek.co/8b69b791-a113-4a7f-8d37-f4905b484016-bucket/panasonic-hokkaido-and-tokyo-uhd-(www.demolandia.net).mp4";

class App extends Component {

  state = {
    message: ''
  };

  onClick = async (event) => {
    event.preventDefault();

    console.log(Date.now());

    let initialStart = Date.now();


    this.setState({ message: 'Stress test in progress' })

    for(let startValue = 2; startValue < 2000000000; startValue++) {
        //console.log(startValue);
    }

    console.log(Date.now());

    let finalTiming = Date.now() - initialStart;

    console.log(finalTiming);

    this.setState({ message: 'Stress test ended in!'});
  };


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
          href="https://web.basemark.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h4>Ready for a stress test?</h4>
        <button onClick={this.onClick}>Start now!</button>
        <h1>{this.state.message}</h1>
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
