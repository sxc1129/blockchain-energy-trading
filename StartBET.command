cd Project

cd blockchain-energy-trading

export FABRIC_VERSION=hlfv12

cd fabric-dev-servers/

./startFabric.sh

cd ../
npm install

composer network install --card PeerAdmin@hlfv1 --archiveFile blockchain-energy-trading@0.0.2.bna

composer network start --networkName blockchain-energy-trading --networkVersion 0.0.2 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@blockchain-energy-trading

composer-rest-server -c admin@blockchain-energy-trading -n never -u true -w true

