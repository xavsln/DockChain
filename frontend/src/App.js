import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";

import boatRegistryContract from "./ethereum/BoatRegistry.js";
import mooringbuoy from "./images/mooring-buoy.png";
import { HARDHAT_NETWORK_SUPPORTED_HARDFORKS } from "hardhat/internal/constants";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState("");

  const [getRegisteredUsersError, setGetRegisteredUsersError] = useState("");
  const [getRegisteredUsersSuccess, setGetRegisteredUsersSuccess] =
    useState("");
  const [transactionData, setTransactionData] = useState("");

  /* Create an instance of the contract */
  const [svContract, setSvContract] = useState("");

  /* Create a state variable that stores the contractVariable */
  const [contractVariable, setContractVariable] = useState([]);
  // const [newContractStringVariable, setNewContractStringVariable] =
  //   useState("");
  const [newBoatName, setNewBoatName] = useState("");
  const [newBoatNationalId, setNewBoatNationalId] = useState("");
  const [newBoatType, setNewBoatType] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  // ***************************************************************
  // Functions related to wallet connections
  // ***************************************************************
  const connectWallet = async () => {
    alert("This should open your wallet");
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        /* get accounts */
        const accounts = await provider.send("eth_requestAccounts", []);

        /* get signer */
        setSigner(provider.getSigner());

        /* local contract instance */
        setSvContract(boatRegistryContract(provider));

        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        /* get accounts */
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length > 0) {
          /* get signer */
          setSigner(provider.getSigner());

          /* local contract instance */
          setSvContract(boatRegistryContract(provider));

          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  // ***************************************************************
  // Function called when user clicks on "GET REGISTERD BOATS"
  // ***************************************************************
  const getRegisteredUsersHandler = async () => {
    alert(
      "You should see the list of registered boats in the form of a table below"
    );

    setGetRegisteredUsersError("");
    setGetRegisteredUsersSuccess("");

    try {
      // call the myVariable() getter function in the Smart Contract
      const resp = await svContract.getAllListedBoatsData();
      console.log("Hello from 119");
      // const resp = await svContract.availableMooringSlots();

      console.log("Resp: ", resp);

      // console.log("Resp type: ", typeof resp);

      // console.log("Resp [0]: ", resp[0]);
      // console.log("Resp [0]: ", resp[0].userName, resp[0].userLocation);

      // console.log("Resp [1]: ", resp[1]);
      // console.log("Resp [1]: ", resp[1].userName, resp[1].userLocation);

      resp.map((boat) => console.log(boat.boatName));
      resp.map((boat) => console.log(boat.isOnMooringList));

      setContractVariable(resp);

      console.log("contractVariable: ", contractVariable);

      contractVariable.map((boat) => console.log(boat));
      contractVariable.map((boat) =>
        console.log(boat.boatName, boat.boatNationalId)
      );

      setGetRegisteredUsersSuccess(
        "Operation succeeded - Boat list was returned"
      );
      setTransactionData(resp.hash);
    } catch (err) {
      console.error(err.message);
      setGetRegisteredUsersError(err.message);
    }
  };

  // ***************************************************************
  // Function called when user clicks on "REGISTER NEW BOAT"
  // ***************************************************************
  const registerNewBoatHandler = async () => {
    alert(
      `This will register "${newBoatName}" with national Id: "${newBoatNationalId}" and boat type: "${newBoatType}" `
    );

    try {
      const svContractWithSigner = svContract.connect(signer);

      // call the modifyMyVariable() function in the Smart Contract along with the newContractVariable value
      const resp = await svContractWithSigner.addBoatRegistrationRequest(
        newBoatName,
        newBoatNationalId,
        newBoatType
      );

      console.log(resp);
      setGetRegisteredUsersSuccess(
        "Operation succeeded - New boat was registered"
      );
      setTransactionData(resp.hash);
    } catch (err) {
      console.error(err.message);
      setGetRegisteredUsersError(err.message);
    }
  };

  return (
    <div>
      <nav className='navbar'>
        <div className='container'>
          <div className='navbar-brand'>
            <h1 className='navbar-item is-size-2 has-text-weight-bold'>
              DockChain &#9875;
            </h1>
          </div>
          <div id='navbarMenu' className='navbar-menu'>
            <div className='navbar-end is-align-items-center py-3'>
              <button
                className='button is-white connect-wallet'
                onClick={connectWallet}
              >
                <span className='is-link has-text-weight-bold'>
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className='hero is-fullheight'>
        <div className='register-hero-body'>
          <div className='container has-text-centered main-content'>
            <h1 className='title is-1'>
              Boat Mooring Registration made thanks to Blockchain technology
            </h1>
            <h1 className='title is-3 mb-6'>
              This simple dApp allows boat owners to:
            </h1>
            <div className='mx-5'>
              <h5>
                <ol>
                  <li className='is-size-4 mb-3'>
                    Get access to a list of registered boats stored on a Smart
                    Contract on Goerli Ethereum testnet
                    (0x60022bb86fb92ffbfecffbc96cde3b9888ee889d)
                  </li>
                  <li className='is-size-4'>
                    Register a new boat in order to request a dock slip or a
                    mooring buoy.
                    {/* <img src={mooringbuoy} /> */}
                  </li>
                </ol>
              </h5>
            </div>

            <br></br>
            <a
              href='https://goerli.etherscan.io/address/0x60022bb86fb92ffbfecffbc96cde3b9888ee889d'
              target='_blank'
            >
              Check deployed Smart Contract on Goerli (address:
              0x60022bb86fb92ffbfecffbc96cde3b9888ee889d)
            </a>

            {/* Display the result of the transaction, success or error */}
            <div className='mt-5'>
              {getRegisteredUsersError && (
                <div className='withdraw-error'> {getRegisteredUsersError}</div>
              )}
              {getRegisteredUsersSuccess && (
                <div className='withdraw-success'>
                  {" "}
                  {getRegisteredUsersSuccess}
                </div>
              )}
              {"   "}
            </div>
            <div className='box address-box'>
              <div className='columns'>
                <div className='column is-three-fifths'>
                  <input
                    className='input is-medium'
                    type='text'
                    placeholder='Enter your wallet address (0x...)'
                    defaultValue={walletAddress}
                  />
                </div>
                <div className='column'>
                  <button
                    className='button is-link is-medium is-fullwidth'
                    onClick={getRegisteredUsersHandler}
                    disabled={walletAddress ? false : true}
                  >
                    GET REGISTERED BOATS
                  </button>
                </div>
              </div>

              <div className='columns'>
                <div className='column is-three-fifths'>
                  {/* User to input boat name */}
                  <input
                    id='boatname'
                    className='input is-medium mb-1'
                    type='text'
                    placeholder='Enter the name of the boat'
                    onChange={(e) => setNewBoatName(e.target.value)}
                    value={newBoatName}
                  />
                  {/* User to input boat national id number*/}
                  <input
                    id='boatNationalId'
                    className='input is-medium mb-1'
                    type='text'
                    placeholder='Enter the boat national id number'
                    onChange={(e) => setNewBoatNationalId(e.target.value)}
                    value={newBoatNationalId}
                  />
                  {/* User to input boat type (sailboat or motorboat*/}
                  <div className='radio-btns control mt-2'>
                    <label className='radio'>
                      <input
                        id='boatType'
                        type='radio'
                        name='answer'
                        value='0'
                        onChange={(e) =>
                          parseInt(setNewBoatType(e.target.value))
                        }
                      />
                      <span id='boatTypeDescription'>Sailboat</span>
                    </label>
                    <label className='radio'>
                      <input
                        id='boatTypeRadio'
                        type='radio'
                        name='answer'
                        value='1'
                        onChange={(e) => setNewBoatType(e.target.value)}
                      />
                      <span id='boatTypeDescription'>Motorboat</span>
                    </label>
                  </div>
                </div>

                {/* </div> */}
                <div className='column'>
                  <button
                    className='button is-link is-medium is-fullwidth'
                    onClick={registerNewBoatHandler}
                    disabled={walletAddress ? false : true}
                  >
                    REGISTER A NEW BOAT
                  </button>
                </div>
              </div>

              <article className='panel is-grey-darker'>
                <p className='panel-heading'>Transaction Data</p>
                <div className='panel-block'>
                  {/* <p>transaction data</p> */}
                  <p>
                    {transactionData
                      ? `Transaction hash: ${transactionData}`
                      : "--"}
                  </p>
                </div>
              </article>

              {/* Table output */}

              <article className='panel is-grey-darker'>
                <p className='panel-heading'>
                  Table output of data from Smart Contract
                </p>
                <div className='panel-block'>
                  <table className='table is-fullwidth is-striped'>
                    <thead>
                      <tr>
                        <th>
                          <abbr>Position</abbr>
                        </th>
                        <th>
                          <abbr>Boat name</abbr>
                        </th>
                        <th>
                          <abbr>Boat National Id</abbr>
                        </th>
                        <th>
                          <abbr>Boat Type</abbr>
                        </th>
                        <th>
                          <abbr>Status</abbr>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* Loop through the users array */}
                      {contractVariable.map((boat, index) => (
                        <tr key={index + 1}>
                          <td className='has-text-left'>{index + 1}</td>
                          <td className='has-text-left'>{boat.boatName}</td>
                          <td className='has-text-left'>
                            {boat.boatNationalId}
                          </td>
                          <td className='has-text-left'>
                            {boat.boatType == 0 ? (
                              <p>&#9973;</p>
                            ) : (
                              <p>&#128676;</p>
                            )}
                          </td>
                          <td className='has-text-left'>
                            {boat.isOnMooringList ? (
                              <p>&#x2705; Mooring approved</p>
                            ) : (
                              <p>&#8987; On waitlist</p>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
