import React, { Component } from "react";
import getWeb3 from "./getWeb3";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

import Puppy_Attack from "./contracts/Puppy_Attack.json";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, isError: false };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Puppy_Attack.networks[networkId];
      const instance = new web3.eth.Contract(
        Puppy_Attack.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      this.setState({ isError: true });
      console.error(error);
    }
  };

  render() {
    console.log(this.state.accounts);
    console.log(this.state.contract !== null ? this.state.contract.methods : null);
    return (
      <div className="App">
        {!this.state.web3 || this.state.isError === true 
          ? <ErrorPage />
          : <HomePage web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract}/>}
      </div>
    )
  }
}

export default App;
