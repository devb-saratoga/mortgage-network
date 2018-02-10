# com.devb.mortgage
# Selling homes the {"Blockchain": "DLT"} way

Read the introduction here at https://www.devb.com/devbpaper-blockchain.php

#### Install the business application
Download the Mortgage-Network application from github

$ cd ~/fabric-tools
$ curl -LJO https://github.com/snoborder/mortgage-network/archive/master.zip
$ mv mortgage-network-master.zip mortgage-network.zip
$ unzip mortgage-network.zip

#### Start Hyperledger Fabric
$ ./startFabric.sh
$ ./createPeerAdminCard.sh
$ cd mortgage-network

$ composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName mortgage-network
$ composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile
$ composer card import --file networkadmin.card
$ composer network ping --card admin@mortgage-network
$ composer-rest-server (enter admin@mortgage-network)

#### Restarting
$ composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile mortgage-network@0.0.1.bna --file networkadmin.card
$ composer network ping --card admin@mortgage-network
$ composer-rest-server -c admin@mortgage-network -n never -w true

Congratulations
