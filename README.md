# Blockchain energy trading network for MSc project.
This is the MSc project submitted to the department of Electronic, Electrical and Systems Engineering, University of Birmingham. It is further developed from [Decentralized Energy with Hyperledger Composer](https://github.com/IBM/Decentralized-Energy-Composer).
Sanyapon Chanpasertsak, 1841454

# Running the blockchain network
## Installing pre-requisite
- Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12
- [Docker](https://www.docker.com/) (Version 17.03 or higher)
- [npm](https://www.npmjs.com/)  (v5.x)
- [Node](https://nodejs.org/en/) (version 8.9 or higher - note version 9 is not supported)
  * to install specific Node version you can use [nvm](https://davidwalsh.name/nvm)
- [Hyperledger Composer](https://hyperledger.github.io/composer/v0.19/installing/development-tools.html)
  * to install composer cli
    `npm install -g composer-cli@0.20`
  * to install composer-rest-server
    `npm install -g composer-rest-server@0.20`
  * to install generator-hyperledger-composer
    `npm install -g generator-hyperledger-composer@0.20`
    
## Steps 
## 1. Clone this repository
Clone the `blockchain-energy-trading code` locally. Then change the directory to blockchain-energy-trading.
In a terminal, run:
```
git clone https://github.com/sxc1129/blockchain-energy-trading
cd blockchain-energy-trading
```

## 2. Set up Hyperledger Fabric
These commands will kill and remove all running containers, and should remove all previously created Hyperledger Fabric chaincode images:
```none
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
```
Set the fabric version to v1.2:
```
export FABRIC_VERSION=hlfv12
```
All the scripts will be in the directory `/fabric-tools`.  Start fabric and create peer admin card:
```
cd fabric-dev-servers/
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```

## 3. Generate the Business Network Archive
Next generate the Business Network Archive (.bna) file from the root directory:
```
cd ../
npm install
```

## 4. Deploy to Fabric
First, install the business network:
```
composer network install --card PeerAdmin@hlfv1 --archiveFile blockchain-energy-trading@0.0.2.bna
```
Start the business network:
```
composer network start --networkName blockchain-energy-trading --networkVersion 0.0.2 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```
Import the network administrator identity as a usable business network card:
```
composer card import --file networkadmin.card
```
Check that the business network has been deployed successfully, run the following command to ping the network:
```
composer network ping --card admin@blockchain-energy-trading
```

## 5. Run the application
In this project, it can be run by using either REST API or Angular-app
Hyperledger Composer REST API:
```
composer-rest-server -c admin@blockchain-energy-trading -n never -u true -w true
```
The REST server will run at `http://localhost:3000/explorer/`.
Or running at Angular-app:
```
cd angular-app/
npm start
```
Angular-app will run at: `http://localhost:4200` 

## 6. Stop the Fabric
Change the directory to fabric-dev-servers, then stop and tear down Fabric
```
cd ../
cd fabric-dev-servers/
./stopFabric.sh
./teardownFabric.sh
```
