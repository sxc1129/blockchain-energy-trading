cd Project

cd blockchain-energy-trading  

cd fabric-dev-servers/

./stopFabric.sh

./teardownFabric.sh

docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)