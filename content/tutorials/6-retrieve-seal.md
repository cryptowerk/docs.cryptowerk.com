---
title: "Retrieve Seal - using Verify Call"
metaTitle: "Retrieve Seal - using Verify Call -Cryptowerk Tutorials"
metaDescription: "Retrieve Seal - using Verify Call - Tutorials"
---

The ***verify*** call can be split into two verification methods. To be specific, it is used to 1) check the registration status of a previously registered hash and therewith retrieve the Cryptowerk Seal and 2) verify original data using the Cryptowerk Seal. The second method will be explained in the tutorial ["Verify - with Seal"](https://docs.cryptowerk.com/tutorials/4-verify-with-Seal). In this tutorial we will explain how to use the ***verify*** call with the retrieval ID.

The use of the retrieval ID in the ***verify*** call is mostly used for demo purposes or to retrieve the Seal. The retrieval ID can be seen as a ticket number. With this ticket number you can check if the sent hash is already registered in the blockchain.

If the hash is already registered in the blockchain, you will receive the Cryptowerk Seal in return. Let's look into an example how to verify a previously registered hash.
We assume you have registered the hash into one or two blockchains as follows:
```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "hashes=2c6424d8c837e1ea79a68a2f36eca526192ebd9d9cabe25ee839b67956ff960a" \
$server/API/v8/register
```

You receive the retrieval ID in the response:
```
{
  "maxSupportedAPIVersion": 8,
  "documents": [
    {
      "retrievalId": "ri3218682a19b10803470ca7cea14dc383901a67004080d58de15b004e9d7dd9069"
    }
  ],
  "minSupportedAPIVersion": 1
}
```
Then you verify the previously registered hash with the retrieval ID

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
  --data "retrievalId=ri3218682a19b10803470ca7cea14dc383901a67004080d58de15b004e9d7dd9069" \
  $server/API/v6/verify

```

In the following response you will see that the hash was successfully registered into the Ethereum Blockchain. Therefore, you receive the complete Seal. You retrieve the Seal with the retrieval ID:

```
{
  "maxSupportedAPIVersion": 8,
  "documents": [
    {
      "retrievalId": "ri3218682a19b10803470ca7cea14dc383901a67004080d58de15b004e9d7dd9069",
      "seal": {
        "documentInfo": {
          "submittedAt": 1585340287635
        },
        "proofs": [
          {
            "bundleMethod": "BALANCED_MERKLE_TREE",
            "operations": [
              {
                "blockChainId": "0x54a3ac9dcab7b9a6bd540cf52be8186765d4bbf2ec6500bc61720dd874685483",
                "instanceName": "4",
                "insertedIntoBlockchainAt": 1585340341765,
                "opcode": "BLOCKCHAIN",
                "blockchainGeneralName": "Ethereum"
              },
              {
                "docHash": "d0df495c63ac4d560ab12ce5fa5d78c8e2933905140d3f487c6bb110fb928de0",
                "opcode": "DOC_SHA256"
              },
              {
                "opcode": "ANCHOR_SHA256",
                "hash": "d0df495c63ac4d560ab12ce5fa5d78c8e2933905140d3f487c6bb110fb928de0"
              }
            ]
          }
        ],
        "version": 8,
        "isComplete": true
      },
      "submittedAt": 1585340287635,
      "hasBeenInsertedIntoAtLeastOneBlockchain": true,
      "blockchainRegistrations": [
        {
          "blockChainId": "0x54a3ac9dcab7b9a6bd540cf52be8186765d4bbf2ec6500bc61720dd874685483",
          "insertedIntoBlockchainAt": 1585340341765,
          "blockChainDesc": {
            "instanceName": "4",
            "generalName": "Ethereum"
          },
          "status": {
            "anchorHash": "d0df495c63ac4d560ab12ce5fa5d78c8e2933905140d3f487c6bb110fb928de0"
          }
        }
      ],
      "hasBeenInsertedIntoAllRequestedBlockchains": true
    }
  ],
  "minSupportedAPIVersion": 1
}

```

So now let's look into a case where the Seal is not complete yet. You would receive the following repsonse:
```
{
  "maxSupportedAPIVersion": 8,
  "documents": [
    {
      "retrievalId": "ri3218682a19b10803470ca7cea14dc383901a67004080d58de15b004e9d7dd9069",
      "submittedAt": 1585340845640,
      "hasBeenInsertedIntoAtLeastOneBlockchain": false,
      "blockchainRegistrations": [],
      "hasBeenInsertedIntoAllRequestedBlockchains": false
    }
  ],
  "minSupportedAPIVersion": 1
}
```
The Cryptowerk Seal is complete once the underlying blockchain has accepted the transaction. The timing depends on the heartbeat of the blockchain. The Bitcoin blokchain has a heartbeat of 10 minutes, where the Ethereum blockchain has a heartbeat of 15 seconds. That said, the Seal can be retrieved from the Ethereum blockchain after 15 seconds and from the Bitcoin blockchain after 10 minutes.
In the first case where the hash was successfully registered into the blockchain, you have retrieved the Cryptowerk Seal through the retrieval ID. To automate this process, you can implement the callback function which will deliver the Cryptowerk Seal via e-mail, webhook or MQTT. Learn how to implement callbacks in the ["Register - with Callbacks"](https://docs.cryptowerk.com/tutorials/3-register-with-callbacks) tutorial.


