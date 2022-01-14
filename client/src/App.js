// Truffle
import MarriageRegistry from "./contracts/MarriageRegistry.json";
import useWeb3 from "./useWeb3";
// React components
import React, { Component } from "react";
import { Container, UncontrolledTooltip } from "reactstrap";
import { RegistryForm } from "./components/RegistryForm";
import { LandingView } from "./components/LandingView";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    spouse1Name: null,
    spouse1Vow: null,
    spouse2Name: null,
    spouse2Vow: null,
    formGood: null,
    newMarriageCertificateAddress: null,
  };

  connect = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await useWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("accounts logged: ", accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MarriageRegistry.networks[networkId];

      const instance = new web3.eth.Contract(
        MarriageRegistry.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load Web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  // Send a transaction to blockchain to call createMarriage function and
  // get new marriage certificate's address
  createMarriageCertificate = async () => {
    let _newMarriageCertificateAddress = null;
    const now = new Date();
    const timestamp = Math.round(now.getTime() / 1000);
    const {
      accounts,
      contract,
      spouse1Name,
      spouse1Vow,
      spouse2Name,
      spouse2Vow,
    } = this.state;

    await contract.methods
      .createMarriage(
        spouse1Name,
        spouse1Vow,
        spouse2Name,
        spouse2Vow,
        timestamp
      )
      .send({ from: accounts[0] })
      // .then((result) => (_newMarriageCertificateAddress = result))
      .then((result) => {
        this.setState({
          newMarriageCertificateAddress:
            result.events.ContractCreated.returnValues.contractAddress,
        });
      })
      .catch((e) => {
        this.setState({ newMarriageCertificateAddress: null });
        alert('Transaction failed. You likely declined the transaction.');
        console.log("e:", e);
      });

    // Set state with new certificate's address
    // this.setState({
    //   newMarriageCertificateAddress:
    //     _newMarriageCertificateAddress.events.ContractCreated.returnValues
    //       .contractAddress,
    // });
  };

  letsgetmarried = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      this.createMarriageCertificate();
      this.setState({ newMarriageCertificateAddress: "" }); // Temporarily set state to show spinner
    } else {
      alert("Please make sure all fields are filled out.");
    }
  };

  handleSpouseInfoChange = (field, value) => {
    if (field === "spouse1Name") {
      this.setState({ spouse1Name: value });
    } else if (field === "spouse1Vow") {
      this.setState({ spouse1Vow: value });
    } else if (field === "spouse2Name") {
      this.setState({ spouse2Name: value });
    } else if (field === "spouse2Vow") {
      this.setState({ spouse2Vow: value });
    }
  };

  isInputEmpty = (input) => {
    if (!input || input === "") {
      return true;
    } else {
      return false;
    }
  };

  validateForm = () => {
    const _s1Name = this.state.spouse1Name;
    const _s1Vow = this.state.spouse1Vow;
    const _s2Name = this.state.spouse2Name;
    const _s2Vow = this.state.spouse2Vow;

    if (
      this.isInputEmpty(_s1Name) ||
      this.isInputEmpty(_s1Vow) ||
      this.isInputEmpty(_s2Name) ||
      this.isInputEmpty(_s2Vow)
    ) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className="App">
        <LandingView />
        <div className="section">
          <Container>
            <div className="text-center">
              {this.state.web3 ? (
                <div className="text-center">
                  <div className="ml-auto mr-auto my-3">
                    <img
                      alt="ConstitutionDAO_logo"
                      className="img-circle img-no-padding img-responsive"
                      src={require("./assets/img/GN_UVm3d_400x400.jpg")}
                      style={{ width: "100px" }}
                    />
                    <p>
                      This PEOPLE <strong>{this.state.accounts[0]}</strong> will
                      initiate the marriage.
                    </p>
                  </div>
                  <button
                    id="btn_connected"
                    className="btn-round btn btn-neutral"
                  >
                    Connected
                  </button>
                  {` `}
                  <UncontrolledTooltip
                    placement="bottom"
                    target="btn_connected"
                    delay={0}
                  >
                    Use Metamask to disconnect
                  </UncontrolledTooltip>
                </div>
              ) : (
                <div>
                  <h2 className="title">Connect to Metamask to get started</h2>
                  <button
                    className="btn-round btn btn-danger"
                    onClick={this.connect}
                  >
                    Connect
                  </button>
                </div>
              )}
            </div>
            <div className="my-5"></div>

            <RegistryForm
              isConnected={this.state.web3 ? true : false}
              isBtnClicked={
                this.state.newMarriageCertificateAddress === "" ? true : false
              }
              onSpouseInfoChange={(field, value) =>
                this.handleSpouseInfoChange(field, value)
              }
              onButtonClick={(e) => this.letsgetmarried(e)}
            />
            {this.state.newMarriageCertificateAddress ? (
              <div>
                <div className="my-3"></div>
                <div className="text-center">
                  <p>Congratulations! your marriage certificate is now live on the blockchain!</p>
                  <a href={"https://testnet.bscscan.com/address/"+this.state.newMarriageCertificateAddress} target="_blank" rel="noopener noreferrer">{this.state.newMarriageCertificateAddress}</a>
                </div>
              </div>
            ) : (
              <div />
            )}
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
