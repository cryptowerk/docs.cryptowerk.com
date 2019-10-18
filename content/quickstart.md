---
title: "Quick Start"
metaTitle: "Getting Started with Cryptowerk Horizon API"
metaDescription: "Getting Started with Cryptowerk Horizon API"
---
## Overview
Cryptowerk Horizon API writes hashes of data into the Bitcoin and Ethereum blockchain by default. Hashes will be submitted in the `/register` call and the result contains a unique retrieval-ID. Cryptowerk bundles the collected
hashes and creates a single super-hash. This super-hash is then anchored into the blockchains of your choice. After the super-hash has been anchored in one or more blockchains, the retrieval-ID may be exchanged for a Seal. A Seal contains the information necessary to prove that a hash was written to a blockchain.

The flows supported by this API are:

Hash  -->  retrieval-ID  -->  Seal

### What you will need
 - Cryptowerk Horizon API credentials
 - Terminal or Command Prompt access

## Getting Started
### API Key and Credentials
Sign-up or Login via the [Cryptowerk website](https://cryptowerk.com)

Select the **Account menu** and locate the API Key and Secret Credential. Save these two values with a ***space*** in between them. You can only view the credentials once.

 ![get api key image](quickstart-img1.png)

The API Key is visible and can always be looked up in your **Account** info in the **App Console**. Your API Credential is secret and may only be accessed once.

## Hash The data
A cryptographic hash is like a fingerprint. It is a mathematical algorithm that takes data of any size turns it into a unique fixed size string of values. Cryptowerk uses these so called hashes to create **Seals** for digital assets.
Open a command line terminal

```
echo -n "simple text" | shasum -a 256
```
Create a Hash:
```
2609c7c28788898a337c063ff1c3b92275832bddeda014a790d109fad3ba85e2
```
You most likely want to hash a document. To hash a document/file try this:
```
openssl dgst -sha256 <filename>
```
## Call Register API with Hashes
Using the values from step 1 and 2 open a terminal and enter
```
curl -sS \
--header "X-ApiKey: +jR2fbECXo7rDIRrPL9otvIkn54G7+kF9b1LvNe/kOg= wZ2vV5kYfDGEFsyXVZwSHBjN1TfzQovZE340hnsCRWk=" \
--data "hashes=2609c7c28788898a337c063ff1c3b92275832bddeda014a790d109fad3ba85e2" \
https://developers.cryptowerk.com/platform/API/v8/register
```
The retrieval-ID for each hash can be found in the response JSON of a successful `/register` call.
```
{
  "maxSupportedAPIVersion":8,
  "documents":[
    {"retrievalId":"ri323399645982466fe76eb43010c7f5572c4182e711bfae9f8db9b2407f85a648c"}
    ],
  "minSupportedAPIVersion":1
}
```
There are several approaches to retrieve the Seal but here we will focus on the simplest.

## Polling for Seal
Call `/verify` and provide the retrieval-ID(s) then check for the return value.

```
curl -sS \
--header "X-ApiKey: +jR2fbECXo7rDIRrPL9otvIkn54G7+kF9b1LvNe/kOg= wZ2vV5kYfDGEFsyXVZwSHBjN1TfzQovZE340hnsCRWk=" \
--data "retrievalId=ri323399645982466fe76eb43010c7f5572c4182e711bfae9f8db9b2407f85a648c" \
https://developers.cryptowerk.com/platform/API/v8/verify
```
For each retrieval-ID (i.e. each hash) a Seal is returned in the response JSON of a successful `/verify` call. A Seal contains Proofs. A Proof is a set of instructions for calculating and locating the anchor-hash that was  written as a transaction in a block of a blockchain. There is a Proof for each blockchain that gets written to. A Seal may contain one or more Proofs depending on the number of blockchains you are writing to and the exact timing of each confirmation.
```
{
  "maxSupportedAPIVersion": 8,
  "documents": [{
    "retrievalId": "ri323399645982466fe76eb43010c7f5572c4182e711bfae9f8db9b2407f85a648c",
    "seal": {
      "documentInfo": {
        "submittedAt": 1570585798468
      },
      "proofs": [{
        "bundleMethod": "BALANCED_MERKLE_TREE",
        "operations": [{
          "blockChainId": "0x7f435eb59c1ece1d938cf9572c485a6e7208267b972c4a504945485951041443",
          "instanceName": "4",
          "insertedIntoBlockchainAt": 1570585861800,
          "opcode": "BLOCKCHAIN",
          "blockchainGeneralName": "Ethereum"
        }, {
          "docHash": "2609c7c28788898a337c063ff1c3b92275832bddeda014a790d109fad3ba85e2",
          "opcode": "DOC_SHA256"
        }, {
          "opcode": "APPEND_THEN_SHA256",
          "hash": "9c81d330a82cc58dafdab97093d841f5fa8f92d77eac54d0f1a23b22c2d187a3"
        }, {
          "opcode": "ANCHOR_SHA256",
          "hash": "51fba877fcf44c28a44d81358e27425c06253964813b5277a183f894de5df22f"
        }]
      }],
      "version": 8,
      "isComplete": false
    },
    "submittedAt": 1570585798468,
    "hasBeenInsertedIntoAtLeastOneBlockchain": true,
    "blockchainRegistrations": [{
      "blockChainId": "0x7f435eb59c1ece1d938cf9572c485a6e7208267b972c4a504945485951041443",
      "insertedIntoBlockchainAt": 1570585861800,
      "blockChainDesc": {
        "instanceName": "4",
        "generalName": "Ethereum"
      },
      "status": {
        "anchorHash": "51fba877fcf44c28a44d81358e27425c06253964813b5277a183f894de5df22f"
      }
    }],
    "hasBeenInsertedIntoAllRequestedBlockchains": false
  }],
  "minSupportedAPIVersion": 1
}
```
Above you will notice this Seal contains one Proof for the Ethereum blockchain. You may also notice that not all the requested blockchains have been written to yet. Blockchains often have different heartbeats at which they write and confirm transactions and blocks. Re-Polling the API `/verify` call will return the Seal with all the Proofs that have been confirmed at that time of the API call.
