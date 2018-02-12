# Selling homes the {"Blockchain": "DLT"} way

UML Design of the Ledger Model

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

#### Use Cases
Seller Joh Doe owns a Condo on a lake property. Listing agent Jane Smith creates the initial listing of the property.
Potential Buyer is Rod Stewart.

##### Persons
PS001 - Seller - John Doe
PS002 - Listing Agent - Jane Smith
PS003 - Buyer - Rod Stewart

##### Party
PT001 - Party of Rod Stewart

##### PropertyHome
H001 - Condo on Lake

##### Transaction (CreateULDD)
U001 

## Data and Posts
#### Create the Seller, Listing Agent and Buyer

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "com.devb.mortgage.Person", \ 
   "personId": "PS001", \ 
   "personRoleType": "SELLER", \ 
   "governmentId": "string", \ 
   "firstName": "John", \ 
   "lastName": "Doe" \ 
 }' 'http://localhost:3000/api/Person'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "com.devb.mortgage.Person", \ 
   "personId": "PS002", \ 
   "personRoleType": "LISTING_AGENT", \ 
   "governmentId": "string", \ 
   "firstName": "Jane", \ 
   "lastName": "Smith" \ 
 }' 'http://localhost:3000/api/Person'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "com.devb.mortgage.Person", \ 
   "personId": "PS003", \ 
   "personRoleType": "BUYER", \ 
   "governmentId": "string", \ 
   "firstName": "Rod", \ 
   "lastName": "Stewart" \ 
 }' 'http://localhost:3000/api/Person'

Data:
{
  "$class": "com.devb.mortgage.Person",
  "personId": "PS003",
  "personRoleType": "BUYER",
  "governmentId": "string",
  "firstName": "Rod",
  "lastName": "Stewart"
}

#### Create the Party
Data:
{
  "$class": "com.devb.mortgage.Party",
  "partyId": "PT001",
  "persons": ["resource:com.devb.mortgage.Person#P003"
  ],
  "contactPoint": [
    {
      "$class": "com.devb.mortgage.ContactPoint",
      "contactId": "CT001",
      "contactPoint": "string",
      "id": "string"
    }
  ],
  "name": "string",
  "address": [
    {
      "$class": "com.devb.mortgage.Address",
      "addressId": "string",
      "addressLine1": "string",
      "addressLine2": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string",
      "id": "string"
    }
  ],
  "role": "ASSET_OWNER",
  "taxIdentifier": "string"
}

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "com.devb.mortgage.Party", \ 
   "partyId": "PT001", \ 
   "persons": ["resource:com.devb.mortgage.Person#P003" \ 
   ], \ 
   "contactPoint": [ \ 
     { \ 
       "$class": "com.devb.mortgage.ContactPoint", \ 
       "contactId": "CT001", \ 
       "contactPoint": "string", \ 
       "id": "string" \ 
     } \ 
   ], \ 
   "name": "string", \ 
   "address": [ \ 
     { \ 
       "$class": "com.devb.mortgage.Address", \ 
       "addressId": "string", \ 
       "addressLine1": "string", \ 
       "addressLine2": "string", \ 
       "city": "string", \ 
       "state": "string", \ 
       "postalCode": "string", \ 
       "id": "string" \ 
     } \ 
   ], \ 
   "role": "ASSET_OWNER", \ 
   "taxIdentifier": "string" \ 
 }' 'http://localhost:3000/api/Party'

#### Create the Property

Data:
{
  "$class": "com.devb.mortgage.PropertyHome",
  "propertyId": "H001",
  "propertyName": "Great Condo on Lake",
  "propertyType": "CONDOMINIUM",
  "propertyState": "PENDING",
  "isListed": true,
  "listingAgent": "resource:com.devb.mortgage.Person#002",
  "address": "63 Lake Shore Road",
  "city": "Rockaway",
  "state": "NJ",
  "zip": "07866",
  "value": 300000.00,
  "listingStart": "2018-02-12T20:58:19.955Z",
  "listingEnd": "2018-02-12T20:58:19.955Z"
}

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "com.devb.mortgage.PropertyHome", \ 
   "propertyId": "H001", \ 
   "propertyName": "Great Condo on Lake", \ 
   "propertyType": "CONDOMINIUM", \ 
   "propertyState": "PENDING", \ 
   "isListed": true, \ 
   "listingAgent": "resource:com.devb.mortgage.Person#002", \ 
   "address": "63 Lake Shore Road", \ 
   "city": "Rockaway", \ 
   "state": "NJ", \ 
   "zip": "07866", \ 
   "value": 300000.00, \ 
   "listingStart": "2018-02-12T20:58:19.955Z", \ 
   "listingEnd": "2018-02-12T20:58:19.955Z" \ 
 }' 'http://localhost:3000/api/PropertyHome'
 
 #### Fire the transactions (ULDD Document)
 Data:
{
  "$class": "com.devb.mortgage.ULDD30",
  "loanId": "U001",
  "loadIdType": "FHA",
  "aboutVersion": "MISMO 3.0",
  "dealSets": {
    "$class": "com.devb.mortgage.DealSets",
    "dealSetsId": "DLS001",
    "dealSet": {
      "$class": "com.devb.mortgage.DealSet",
      "dealSetId": "DL001",
      "deal": {
        "$class": "com.devb.mortgage.Deal",
        "dealId": "D001",
        "otherAsset": {
          "$class": "com.devb.mortgage.OtherAsset",
          "assetId": "string",
          "assetName": "string",
          "id": "string"
        },
        "collateral": "resource:com.devb.mortgage.PropertyHome#H001",
        "loan": {
          "$class": "com.devb.mortgage.Loan",
          "loanId": "L001",
          "loanType": "ADJUSTMENT",
          "investorFeature": "string",
          "loanComments": "string",
          "loanDetail": "string",
          "loanLevelCredit": "string",
          "loanPrograms": "string",
          "loanState": "NONE",
          "ltv": 0,
          "maturity": "string",
          "mers_registrations": "string",
          "mi_data": "string",
          "modifications": "string",
          "optional_products": "string",
          "payment": 0,
          "prepayment_Penalty": "string",
          "qualification": "string",
          "servicing": "string",
          "termsOfMortgage": "string",
          "underwriting": "string",
          "id": "string"
        },
        "combinedLTV": 0,
        "partyRoles": "resource:com.devb.mortgage.Party#PT001",
        "id": "string"
      },
      "investorFeature": "resource:com.devb.mortgage.Person#PS001",
      "partyRoles": "resource:com.devb.mortgage.Party#PT001",
      "pool": "string",
      "id": "string"
    },
    "partyRoles": "resource:com.devb.mortgage.Party#PT001",
    "ulddGovtMonitoring": {
      "$class": "com.devb.mortgage.ULDDGovernmentMonitoring",
      "ulddGovtId": "string",
      "hmdaEthnicity": "string",
      "hmdaEthnicityOrigin": "string",
      "hmdaRaceDesignation": "string",
      "hmdaRaceDetail": "string",
      "id": "string"
    },
    "id": "string"
  }
}

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "com.devb.mortgage.ULDD30", \ 
   "loanId": "U001", \ 
   "loadIdType": "FHA", \ 
   "aboutVersion": "MISMO 3.0", \ 
   "dealSets": { \ 
     "$class": "com.devb.mortgage.DealSets", \ 
     "dealSetsId": "DLS001", \ 
     "dealSet": { \ 
       "$class": "com.devb.mortgage.DealSet", \ 
       "dealSetId": "DL001", \ 
       "deal": { \ 
         "$class": "com.devb.mortgage.Deal", \ 
         "dealId": "D001", \ 
         "otherAsset": { \ 
           "$class": "com.devb.mortgage.OtherAsset", \ 
           "assetId": "string", \ 
           "assetName": "string", \ 
           "id": "string" \ 
         }, \ 
         "collateral": "resource:com.devb.mortgage.PropertyHome#H001", \ 
         "loan": { \ 
           "$class": "com.devb.mortgage.Loan", \ 
           "loanId": "L001", \ 
           "loanType": "ADJUSTMENT", \ 
           "investorFeature": "string", \ 
           "loanComments": "string", \ 
           "loanDetail": "string", \ 
           "loanLevelCredit": "string", \ 
           "loanPrograms": "string", \ 
           "loanState": "NONE", \ 
           "ltv": 0, \ 
           "maturity": "string", \ 
           "mers_registrations": "string", \ 
           "mi_data": "string", \ 
           "modifications": "string", \ 
           "optional_products": "string", \ 
           "payment": 0, \ 
           "prepayment_Penalty": "string", \ 
           "qualification": "string", \ 
           "servicing": "string", \ 
           "termsOfMortgage": "string", \ 
           "underwriting": "string", \ 
           "id": "string" \ 
         }, \ 
         "combinedLTV": 0, \ 
         "partyRoles": "resource:com.devb.mortgage.Party#PT001", \ 
         "id": "string" \ 
       }, \ 
       "investorFeature": "resource:com.devb.mortgage.Person#PS001", \ 
       "partyRoles": "resource:com.devb.mortgage.Party#PT001", \ 
       "pool": "string", \ 
       "id": "string" \ 
     }, \ 
     "partyRoles": "resource:com.devb.mortgage.Party#PT001", \ 
     "ulddGovtMonitoring": { \ 
       "$class": "com.devb.mortgage.ULDDGovernmentMonitoring", \ 
       "ulddGovtId": "string", \ 
       "hmdaEthnicity": "string", \ 
       "hmdaEthnicityOrigin": "string", \ 
       "hmdaRaceDesignation": "string", \ 
       "hmdaRaceDetail": "string", \ 
       "id": "string" \ 
     }, \ 
     "id": "string" \ 
   } \ 
 }' 'http://localhost:3000/api/ULDD30'

##### Congratulations
