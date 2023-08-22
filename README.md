![My Image](dapp-screenshot_DockChain.png)

---

# introduction

This **FullStack project** was developed as my **final project** in the frame of the **Alchemy University Ethereum Developer Bootcamp**.

This dApp aims at helping boat owners to register for a Docking slip or Mooring buoy thanks to the blockchain.

**Boat owners can make a request for a mooring slot at a marina using the DockChain dApp.**
In case a mooring slot is available then the registered boat will be added to the moored list.
Otherwise the boat will be added to the wait list.

At anytime the moored list and wait list are accessible.

## dApp structure

This FullStack dApp includes:

1. a **backend** part related to the Smart Contract development of the project based on **Solidity**
2. a **frontend / UI** part based on **React** that allows to interact with the deployed Smart Contract (on Goerli)

## Main tools / framework used

- Hardhat Development Environment
- Alchemy API
- React

# To use the dApp locally from Hardhat

_Note: you need first to make sure that the address set in BoatRegistry.js is the one where Smart Contract will be deployed on local node network_

## Launch the local blockchain

Launch a terminal session, then:

- `cd backend`
- `npx hardhat node`

## Deploy the Smart contract on the local Blockchain

In another terminal window:

- `cd backend`
- `npx hardhat run scripts/deploy.js --network localhost`

The Smart Contract should be deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3

## Launch the React Frontend part of the project

In another terminal window:

- `cd frontend`
- `npm start`

This should open Chrome.

# To use the dApp with deployed Smart Contract on Goerli

_Note: you need first to make sure that the address set in BoatRegistry.js is the one where Smart Contract deployed on local Goerli._

A deployed version of the Smart Contract is already deployed on Goerli Ethereum Testnet at the following address:

0xaF8943C1Dc55a5Dc675510Aa187435E55e74A355

Check on Etherscan (Goerli) for details.

Then you just need to launch the React Frontend part as described above.
