# Introduction

This project aims at helping boat owners to register for a Docking slip or Mooring buoy thanks to the blockchain.

Boat owners can make a request for a mooring slot at a marina using the DockChain dApp.
In case a mooring slot is available then the registered boat will be added to the moored list.
Otherwise the boat will be added to the wait list.

At anytime the moored list and wait list are accessible.

# Main functionalities

1. Add a boat mooring registration (**addBoatRegistrationRequest** function)
2. Get a specific boat registration data (**getBoatRegistrationRequestData** function)
3. Get a list of all moored boats (**getAllMooredBoatsData** function)
4. Get a list of all wait listed boats (**getAllWaitlistedBoatsData** function)
5. Get a list of all registered boats (**getAllListedBoatsData** function)

# Tech stack

This project makes use of Hardhat Dev Environment.

# Other

Key components include:

- **contracts** folder where BoatRegistry.sol contract can be found
- **scripts** folder (TBD)
- **test** folder (TBD)

# Main commands

```shell
npx hardhat run scripts/deploy.js
npx hardhat test (note: no test implemented at this stage)
```

# Deployed contract address

Contract on Goerli testnet can be found at the following address: 0x60022bb86fb92ffbfecffbc96cde3b9888ee889d
https://goerli.etherscan.io/address/0x60022bb86fb92ffbfecffbc96cde3b9888ee889d
