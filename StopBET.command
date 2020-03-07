cd Project

cd Decentralized-Energy-Composer  

cd fabric-dev-servers/

./stopFabric.sh

./teardownFabric.sh

docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)