import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import contract from './mina-main-contract';
import apps_list from './apps_list.json';
import uploadFileContract from './UploadFile'
import ipfs from './ipfs';
import fleek from '@fleekhq/fleek-storage-js';

const src =
"https://storageapi.fleek.co/8b69b791-a113-4a7f-8d37-f4905b484016-bucket/panasonic-hokkaido-and-tokyo-uhd-(www.demolandia.net).mp4";

const apiKey = "GU9hDwtm3QcMl+JQBgLfpA==";
const apiSecret = "WRSsCMrzf8SK3MVqEP1zZ2Ok3mg/IiI02ZeBcXn75uU=";


function AppLink(app) {
  const handleClick = () => {
    window.open(app.url);
  };
  return(
    <div style={{
        display: 'inline-grid',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <div style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
      <img src={app.logo_url} height="60px" width="60px"/>

      <button style={{
          minWidth: "200px",
          maxWidth: "300px",
          height: "60px",
        }} onClick={handleClick}>{app.name}

        </button>
        </div>
        <label style={{
            maxWidth: "250px",
            maxHeight: "300px",
            minWidth: "150px",
            minHeight: "20px",
            fontSize: "17px",
            overflow: "hidden",
            textOverflow: "clip",
            textAlign: "left",
            marginTop: "10px",
            marginBottom: "20px",
            marginLeft: "10px",
            marginRight: "10px"
          }} >
          {app.description}
        </label>
      </div>
    );
}

function AppStructure(app) {
  const handleClick = () => {
    window.open(app.appLink);
  };
  return <button style={{
          maxWidth: "300px",
          maxHeight: "100px",
          minWidth: "200px",
          minHeight: "60px"
        }} onClick={handleClick}>{app.appName}

        </button>
}

function FileStructure(url) {
  const handleClick = () => {
    window.open(url);
  };
  return <button style={{
          width: "40%",
          maxHeight: "100px",
          minHeight: "60px",
          color: "blue"
        }} onClick={handleClick}>{url.replace("https://storageapi.fleek.co/8b69b791-a113-4a7f-8d37-f4905b484016-bucket/mina/","")}

        </button>
}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: "",
      apps: [],
      accounts: [],
      value: "",
      appName: "",
      appLink: "",
      id: "",
      files: [],
      buffers: [],
      file: ""
    };
    this.captureFile = this.captureFile.bind(this);
    this.onSubmitFile = this.onSubmitFile.bind(this);
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const apps = await contract.methods.getApps().call();

    const files = await fleek.listFiles({
        apiKey: apiKey,
        apiSecret: apiSecret,
        prefix: 'mina',
        getOptions: [
          'bucket',
          'key',
          'hash',
          'publicUrl'
        ],
      });

    console.log(files);

    this.setState({ apps: apps, accounts: accounts, files: files});
  };

  onSubmit = async (event) => {
    event.preventDefault();


    this.setState({ message: 'Waiting on trasaction success...' })

    await contract.methods.enterApp(this.state.appName, this.state.appLink, this.state.id).send({
      from: this.state.accounts[0],
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

    for(let startValue = 2; startValue < 2000000000; startValue++) {
        //console.log(startValue);
    }

    console.log(Date.now());

    let finalTiming = Date.now() - initialStart;

    console.log(finalTiming);

    this.setState({ message: 'Stress test ended!!!'});
  };

  captureFile(event) {
      event.preventDefault()
      const files = event.target.files

      console.log(files[0])

      this.setState({ file: files[0]})

    };

    onSubmitFile(event) {
      event.preventDefault()

      const input = {
          apiKey: apiKey,
          apiSecret: apiSecret,
          key: `mina/${this.state.file['name']}`,
          data: this.state.file,
      };

      fleek.upload(input).then((r) => {

          console.log(r);

          fleek.listFiles({
              apiKey: apiKey,
              apiSecret: apiSecret,
              prefix: 'mina',
              getOptions: [
                'bucket',
                'key',
                'hash',
                'publicUrl'
              ],
            }).then((r) => {
              this.setState({ files: r})
            });

      });
    };

getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

isImage(url) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

isVideo(url) {
  return /^https?:\/\/.+\.(avi|mov|mp4|flv)$/.test(url);
}

isFile(url) {
  return /^https?:\/\/.+\.(pdf|doc|html|txt)$/.test(url);
}

imageOrVideo(file) {

  if (this.isVideo(file['publicUrl'])) {
    return <video controls width="40%">
    <source src={file['publicUrl']} type="video/mp4" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  } else if (this.isFile(file['publicUrl'])) {
    return FileStructure(file['publicUrl'])
  }

  return <img src={`${file['publicUrl']}`} width="40%"></img>
}


render() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{this.state.accounts[0]}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}>
          explore minaOS and use decentralized apps and games everywhere.
        </p>
        <p style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}>
        without worrying about your local hardware, anymore.
        </p>
        <hr style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        height: '30px'
      }}/>
        <ul>
          {apps_list.map((app) => <AppLink name={app.name} url={app.url} logo_url={app.logo_url} description={app.description} key={Math.random()}/>)}
        </ul>
        <hr style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        height: '30px'
      }}/>
        <ul>
          {this.state.apps.map((app) => <AppStructure appName={app.appName} appLink={app.appLink} key={Math.random()}/>)}
        </ul>
        <hr style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        height: '30px'
      }}/>
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
        <hr style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        height: '30px'
      }}/>
        <h4>Ready for a stress test?</h4>
        <button onClick={this.onClick}>Start now!</button>
        <h1>{this.state.message}</h1>
        <hr style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        height: '30px'
      }}/>
        <h3>Upload Files, Images and Videos on the decentralised storage </h3>
        <form onSubmit={this.onSubmitFile}>
          <input type='file' multiple="multiple" onChange={this.captureFile}/>
          <input type='submit' />
        </form>
        <hr style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        height: '30px'
      }}/>
        <ul style={{listStyle: "none", padding: 0}}>
          {this.state.files.map((file) => <li key={Math.random()}> {this.imageOrVideo(file)}</li>) }
        </ul>

        </header>
    </div>

  );
}
}

export default App;
