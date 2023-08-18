const hre = require("hardhat");

async function main() {
  const boatRegistry = await hre.ethers.deployContract("BoatRegistry");

  await boatRegistry.waitForDeployment();

  console.log(`BoatRegistry deployed to ${boatRegistry.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
