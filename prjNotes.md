# TO DO LIST

[ ] - Add some specific requirement (such as check that the national id entered is unic etc...)

[X] - Each time a boat is registered then reduce the number of slot availaible

[X] - Update the createRequest to implement the following logic :
if some space available, send boatData to the mooredList
if no space available, send boatData to the waitingList

[X] - Add a variable "bool isOnMooringList" (during registration process, if some slot is available then the isOnMooringList will be assigned true, otherwise it will be assigned false)

[X] - Update the contract name to BoatRegistry (the idea is to create another one that would be for Marina operator and would be named MooringRegistry)

[X] - Replace "Docking Slips" by "mooring slots" (both spot and slot can be used (no clear difference)

# LOG LIST

- 20230803 - Smart Contract deployed to Goerli testnet at the following address: 0x60022bb86fb92ffbfecffbc96cde3b9888ee889d
  https://goerli.etherscan.io/address/0x60022bb86fb92ffbfecffbc96cde3b9888ee889d
