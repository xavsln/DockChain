// ***********************************************************************
// Create an instance of our Contract so we can interact with this object
// ***********************************************************************

import { ethers } from "ethers";

const abiBoatRegistryContract = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "MooringListBoatNationalIdList",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "WaitingListBoatNationalIdList",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_boatName", type: "string" },
      { internalType: "string", name: "_boatNationalId", type: "string" },
      {
        internalType: "enum BoatRegistry.BoatTypeChoices",
        name: "_boatType",
        type: "uint8",
      },
    ],
    name: "addBoatRegistrationRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "availableMooringSlots",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "boatDataList",
    outputs: [
      {
        internalType: "uint256",
        name: "boatRegistrationRequestId",
        type: "uint256",
      },
      {
        internalType: "enum BoatRegistry.BoatTypeChoices",
        name: "boatType",
        type: "uint8",
      },
      { internalType: "string", name: "boatName", type: "string" },
      { internalType: "string", name: "boatNationalId", type: "string" },
      { internalType: "bool", name: "isOnMooringList", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "boatNationalIdList",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllListedBoatsData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "boatRegistrationRequestId",
            type: "uint256",
          },
          {
            internalType: "enum BoatRegistry.BoatTypeChoices",
            name: "boatType",
            type: "uint8",
          },
          { internalType: "string", name: "boatName", type: "string" },
          { internalType: "string", name: "boatNationalId", type: "string" },
          { internalType: "bool", name: "isOnMooringList", type: "bool" },
        ],
        internalType: "struct BoatRegistry.BoatData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllMooredBoatsData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "boatRegistrationRequestId",
            type: "uint256",
          },
          {
            internalType: "enum BoatRegistry.BoatTypeChoices",
            name: "boatType",
            type: "uint8",
          },
          { internalType: "string", name: "boatName", type: "string" },
          { internalType: "string", name: "boatNationalId", type: "string" },
          { internalType: "bool", name: "isOnMooringList", type: "bool" },
        ],
        internalType: "struct BoatRegistry.BoatData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllWaitlistedBoatsData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "boatRegistrationRequestId",
            type: "uint256",
          },
          {
            internalType: "enum BoatRegistry.BoatTypeChoices",
            name: "boatType",
            type: "uint8",
          },
          { internalType: "string", name: "boatName", type: "string" },
          { internalType: "string", name: "boatNationalId", type: "string" },
          { internalType: "bool", name: "isOnMooringList", type: "bool" },
        ],
        internalType: "struct BoatRegistry.BoatData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_boatNationalId", type: "string" },
    ],
    name: "getBoatRegistrationRequestData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "boatRegistrationRequestId",
            type: "uint256",
          },
          {
            internalType: "enum BoatRegistry.BoatTypeChoices",
            name: "boatType",
            type: "uint8",
          },
          { internalType: "string", name: "boatName", type: "string" },
          { internalType: "string", name: "boatNationalId", type: "string" },
          { internalType: "bool", name: "isOnMooringList", type: "bool" },
        ],
        internalType: "struct BoatRegistry.BoatData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marinaTotalMooringSlots",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalRegistrationRequestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

// A function that will return an instance of the Smart Contract
// Address can be updated to interact either with the local Hardhat network (dev purpose)
// The deployed address on Hardhat dev environment can be seen after deploying on Hardhat `% npx hardhat run scripts/deploy.js`: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// or the address of the Smart Contract deployed in Goerli Testnet: 0x60022bb86fb92ffbfecffbc96cde3b9888ee889d
const boatRegistryContract = (provider) => {
  return new ethers.Contract(
    // "0x60022bb86fb92ffbfecffbc96cde3b9888ee889d",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abiBoatRegistryContract,
    provider
  );
};

export default boatRegistryContract;
