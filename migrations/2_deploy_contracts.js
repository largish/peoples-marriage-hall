// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage);
// };


const MarriageRegistry = artifacts.require('./MarriageRegistry.sol');

module.exports = function(deployer) {
    deployer.deploy(MarriageRegistry);
}