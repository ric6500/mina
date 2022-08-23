import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import contract from './my-first-dfinity-app-contract';

const src =
"https://storageapi.fleek.co/8b69b791-a113-4a7f-8d37-f4905b484016-bucket/panasonic-hokkaido-and-tokyo-uhd-(www.demolandia.net).mp4";

function AppLink(app) {
  const handleClick = () => {
    window.open(app.appLink);
  };
  return <button onClick={handleClick}>{app.appName}</button>
//   return (<li
//     key={app.id}
//     className="App-link"
//     href={app.appLink}
//     target="_blank"
//     onClick={event => this.click(event)}
//     rel="noopener noreferrer">
//     {app.appName}
//   </li>
// );
}

class App extends Component {

  state = {
    message: '',
    apps: [],
    value: '',
    appName: '',
    appLink: '',
    id: ""
  };

  async componentDidMount() {
    const apps = await contract.methods.getApps().call();
    this.setState({ apps });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();


    this.setState({ message: 'Waiting on trasaction success...' })

    await contract.methods.enterApp(this.state.appName, this.state.appLink, this.state.id).send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether'),
    });

    this.setState({ message: 'App successfully submitted to the OS!' });
    this.state.value = 0;
  }

  onClick = async (event) => {
    event.preventDefault();

    console.log(Date.now());

    let initialStart = Date.now();


    this.setState({ message: 'Stress test in progress' })

    for(let startValue = 2; startValue < 20000000000; startValue++) {
        //console.log(startValue);
    }

    console.log(Date.now());

    let finalTiming = Date.now() - initialStart;

    console.log(finalTiming);

    this.setState({ message: 'Stress test ended!'});
  };


render() {
  return (
    <div className="App">
      <header className="App-header">
        <hr/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Explore minaOS and use decentralized apps and games everywhere.
        </p>
        <p>
        without worrying about your local hardware, anymore.
        </p>
        <ul>
          {this.state.apps.map((app) => <AppLink appName={app.appName} appLink={app.appLink} key={app.id}/>)}
        </ul>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Want to add an app to mina ?</h4>
          <div>
            <label>Amount of ether</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <div>
            <label>Name of the App</label>
            <input
              value={this.state.appName}
              onChange={event => this.setState({ appName: event.target.value })}
            />
          </div>
          <div>
            <label>Link to the App</label>
            <input
              value={this.state.appLink}
              onChange={event => this.setState({ appLink: event.target.value })}
            />
          </div>
          <div>
            <label>Unique ID</label>
            <input
              value={this.state.id}
              onChange={event => this.setState({ id: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready for a stress test?</h4>
        <button onClick={this.onClick}>Start now!</button>
        <h1>{this.state.message}</h1>
        <hr />
        <h4>Decentralized video and images</h4>
        <video controls width="40%">
        <source src={src} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
        <img src = "https://storageapi.fleek.co/8b69b791-a113-4a7f-8d37-f4905b484016-bucket/3b9a1ec7b868b4b107bce28f783fb566.gif" width="40%"></img>
      </header>
    </div>

  );
}
}

export default App;
