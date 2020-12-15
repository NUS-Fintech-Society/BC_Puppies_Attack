import React, { Component } from "react";
import getWeb3 from "./getWeb3";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

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

      console.log(networkId);
      this.setState({ web3, accounts });
    } catch (error) {
      // Catch any errors for any of the above operations.
      this.setState({ isError: true });
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        {!this.state.web3 || this.state.isError === true 
          ? <ErrorPage />
          : <HomePage />}
      </div>
    )
  }
}

export default App;
