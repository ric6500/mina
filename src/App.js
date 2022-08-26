import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import web3 from './web3';
import contract from './mina-main-contract';
import apps_list from './apps_list.json';

const src =
"https://storageapi.fleek.co/8b69b791-a113-4a7f-8d37-f4905b484016-bucket/panasonic-hokkaido-and-tokyo-uhd-(www.demolandia.net).mp4";


const Web3 = require("web3");

const web3 = new Web3(
new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/a5e20b2382fd40fa8a43f6c7d250008c"
  )
);


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


class App extends Component {

  state = {
    message: "",
    apps: [],
    account: "",
    value: "",
    appName: "",
    appLink: "",
    id: "",
  };

  async componentDidMount() {
    const apps = await contract.methods.getApps().call();
   // Creating a signing account from a private key
   const signer = web3.eth.accounts.privateKeyToAccount(
     "f40e45631216e41e764dc642abc38eabfc4bdd7674234f8d5354b7c11a48b5e2"
   );
   web3.eth.accounts.wallet.add(signer);

   this.setState({ apps: apps, account: signer.address});
  };

  onSubmit = async (event) => {
    event.preventDefault();


    this.setState({ message: 'Waiting on trasaction success...' })

    const signer = web3.eth.accounts.privateKeyToAccount(
      "f40e45631216e41e764dc642abc38eabfc4bdd7674234f8d5354b7c11a48b5e2"
    );

    web3.eth.accounts.wallet.add(signer);

    const tx = {
      from: signer.address,
      to: "0x7A6C29615eCF83B892FCcF3905799d2d9B738f91",
      value: web3.utils.toWei(this.state.value, 'ether'),
      gas: "100000",
      nonce: web3.eth.getTransactionCount(signer.address),
      chain: "rinkeby",
      hardfork: "london",
    };


    // const receipt = await tx.send({
    //   from: this.state.account,
    //   gas: await tx.estimateGas(),
    // })
    // .once("transactionHash", (txhash) => {
    //   console.log(`Mining transaction ...`);
    //   console.log(`https://rinkeby.etherscan.io/tx/${txhash}`);
    // });

    console.log(web3.eth.accounts);

    const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey)
    console.log("Raw transaction data: " + signedTx.rawTransaction)


    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

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


render() {
  return (
    <div className="App">
      <header className="App-header">
        <hr/>
        <p>{this.state.account}</p>
        <hr/>
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
        <hr/>
        <ul>
          {apps_list.map((app) => <AppLink name={app.name} url={app.url} key={app.name} logo_url={app.logo_url} description={app.description}/>)}
        </ul>
        <hr/>
        <ul>
          {this.state.apps.map((app) => <AppStructure appName={app.appName} appLink={app.appLink} key={app.id}/>)}
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
        <h4>Video and images on decentralised storage</h4>
        <hr />
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
