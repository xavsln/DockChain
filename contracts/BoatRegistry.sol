// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract BoatRegistry {

    constructor() {   
    }

    enum BoatTypeChoices { sailboat, motorboat }

    struct BoatData {
        uint256 boatRegistrationRequestId;
        BoatTypeChoices boatType;
        string boatName;
        // string boatModel;
        string boatNationalId;

        // fixed16x2 boatLength; // 2 decimals
        // fixed16x2 boatWidth; // 2 decimals
        // uint256 boatWeigth;
        // uint256 boatEnginePower;

        // string boatOwnerName;
        // address boatOwner;
        bool isOnMooringList;
    }

    // A variable that will be used to assign registration IDs automatically
    // We may also use some external library to assign a unique ID for each request
    uint256 nextBoatRegistrationRequestId = 1;

    // A mapping that stores all the registered boats data
    // This maps the boats data with the boatNationalId
    mapping(string => BoatData) public boatDataList;

    // An Array that stores all boats national Ids
    string[] public boatNationalIdList; // Stores the Ids of all registered boats

    // Arrays that store boats national Ids either in a "Mooring List" or in a "Waiting List" depending on slot availability
    string[] public MooringListBoatNationalIdList;  // Stores the Ids of boats on the mooring list
    string[] public WaitingListBoatNationalIdList;  // Stores the Ids of boats on the waiting list


    uint256 public marinaTotalMooringSlots = 2; // Marina Full Capacity
    uint256 public totalRegistrationRequestCount; // A counter to check the number of request made
    int256 public availableMooringSlots =  int256(marinaTotalMooringSlots); // Marina available slots or missing slots


    // ==================
    // A setter function that allows to create a mooring slot request
    // . If some slot is available then the boatData will be added to the mooringList
    // . If no slot is available then the boatData will be added to the waitingList
    // ==================
    
    function addBoatRegistrationRequest (string memory _boatName, string memory _boatNationalId, BoatTypeChoices _boatType) public {
        bool _isOnMooringList;

        // Check if mooring slots are available, if yes, push boatData to boatMooringList, if no, push to boatWaitingList
        if (availableMooringSlots > 0) {
            MooringListBoatNationalIdList.push(_boatNationalId);
            _isOnMooringList = true;

        } else {
            WaitingListBoatNationalIdList.push(_boatNationalId);
        }

        availableMooringSlots -= 1; // Decrease the number of available slots by 1

        // Add boat data to the registry
        BoatData memory newBoat = BoatData(nextBoatRegistrationRequestId, _boatType, _boatName, _boatNationalId, _isOnMooringList);
        boatDataList[_boatNationalId] = newBoat;    // store the entered boat data into the boatDataList mapping
        nextBoatRegistrationRequestId++;
        boatNationalIdList.push(_boatNationalId); // push the boat unic national Id into the boatNationalIdList Array
        
        totalRegistrationRequestCount = boatNationalIdList.length;  // A counter to track all boats actually registered

    }


    // ==================
    // A getter function that shows the details of a specific request by boatNationalId
    // ==================

    function getBoatRegistrationRequestData(string memory _boatNationalId) public view returns (BoatData memory) {
        BoatData storage boat = boatDataList[_boatNationalId];
        // return boat.boatName;
        return boat;
    }


    // ==================
    // A getter function that returns an Array of all **moored boats**
    // ==================

    function getAllMooredBoatsData() public view returns (BoatData[] memory) {
        uint256 MooringListBoatNationalIdListCount = MooringListBoatNationalIdList.length;

        BoatData[] memory allMooredBoatData = new BoatData[](MooringListBoatNationalIdListCount);   // Create an array of moored boats

        for (uint256 i = 0; i < MooringListBoatNationalIdListCount; i++) {
            allMooredBoatData[i] = boatDataList[MooringListBoatNationalIdList[i]];
        }

        return allMooredBoatData;
    }


    // ==================
    // A getter function that returns an Array of **waitlisted boats**
    // ==================

    function getAllWaitlistedBoatsData() public view returns (BoatData[] memory) {
        uint256 WaitingListBoatNationalIdListCount = WaitingListBoatNationalIdList.length;

        BoatData[] memory allWaitlistedBoatData = new BoatData[](WaitingListBoatNationalIdListCount);   // Create an array of wait listed boats

        for (uint256 i = 0; i < WaitingListBoatNationalIdListCount; i++) {
            allWaitlistedBoatData[i] = boatDataList[WaitingListBoatNationalIdList[i]];
        }

        return allWaitlistedBoatData;
    }

    // ==================
    // A getter function that returns an Array of **all listed boats**
    // ==================

    function getAllListedBoatsData() public view returns (BoatData[] memory) {
        uint256 allListedBoatNationalIdListCount = boatNationalIdList.length;

        BoatData[] memory allListedBoatData = new BoatData[](allListedBoatNationalIdListCount);   // Create an array **allListedBoatData** of all listed boats

        for (uint256 i = 0; i < allListedBoatNationalIdListCount; i++) {
            allListedBoatData[i] = boatDataList[boatNationalIdList[i]];
        }

        return allListedBoatData;

    }

}



// **********
// TO DO LIST
// **********

// [ ] - Add some specific requirement (such as check that the national id entered is unic etc...)

// [X] - Each time a boat is registered then reduce the number of slot availaible

// [X] - Update the createRequest to implement the following logic : 
//      if some space available, send boatData to the mooredList
//      if no space available, send boatData to the waitingList

// [X] - Add a variable "bool isOnMooringList" (during registration process, if some slot is available then the isOnMooringList will be assigned true, otherwise it will be assigned false)

// [X] - Update the contract name to BoatRegistry (the idea is to create another one that would be for Marina operator and would be named MooringRegistry)

// [X] - Replace "Docking Slips" by "mooring slots" (both spot and slot can be used (no clear difference)



// **********
// LOG LIST
// **********

// 20230803 -   Smart Contract deployed to Goerli testnet at the following address: 0x60022bb86fb92ffbfecffbc96cde3b9888ee889d
//              https://goerli.etherscan.io/address/0x60022bb86fb92ffbfecffbc96cde3b9888ee889d



