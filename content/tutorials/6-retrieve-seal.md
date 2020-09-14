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

In the following response you will see that the hash was successfully registered into the Ethereum and Bitcoin test blockchain. Therefore, you receive the complete Seal. You retrieve the Seal with the retrieval ID:

```
{
  "maxSupportedAPIVersion": 8,
  "documents": [
    {
      "retrievalId": "ri3218682a19b10803470ca7cea14dc383901a67004080d58de15b004e9d7dd9069",
      "seal": {
        "documentInfo": {
          "submittedAt": 1600118846324
        },
        "proofs": [
          {
            "bundleMethod": "BALANCED_MERKLE_TREE",
            "operations": [
              {
                "blockChainId": "0xb14f989ba3dde08f369f745fb60c8d85cea3e057456656e3e2c557abc0fea108",
                "instanceName": "4",
                "insertedIntoBlockchainAt": 1600118882447,
                "opcode": "BLOCKCHAIN",
                "blockchainGeneralName": "Ethereum"
              },
              {
                "docHash": "1111111111111111111111111111111111111111111111111111111111111111",
                "opcode": "DOC_SHA256"
              },
              {
                "opcode": "PREPEND_THEN_SHA256",
                "hash": "da84a30507b5a4ab52adc5160bd559f6166cd1759fb891e220ffbc3d080ac17f"
              },
              {
                "opcode": "APPEND_THEN_SHA256",
                "hash": "87f410f2f152cab3aaa1251fc6c7b2a8b0350c5c25d42085ad2370a1b0395c6d"
              },
              {
                "opcode": "ANCHOR_SHA256",
                "hash": "a979848a0ef458f410912a8701e87c4fbd94e96f3f5a94ef0f0333fc135eaee7"
              }
            ]
          },
          {
            "bundleMethod": "BALANCED_MERKLE_TREE",
            "operations": [
              {
                "blockChainId": "efbef23bb924d0b465b29eb8706ef39979b4ad8bf180fe26f15a4ee1ebf9b1e3",
                "instanceName": "test",
                "insertedIntoBlockchainAt": 1600119061320,
                "opcode": "BLOCKCHAIN",
                "blockchainGeneralName": "Bitcoin"
              },
              {
                "docHash": "1111111111111111111111111111111111111111111111111111111111111111",
                "opcode": "DOC_SHA256"
              },
              {
                "opcode": "APPEND_THEN_SHA256",
                "hash": "2222222222222222222222222222222222222222222222222222222222222222"
              },
              {
                "opcode": "APPEND_THEN_SHA256",
                "hash": "68fbc715094d3d1f70130484033534b9f648d849fa3496176b1341e3e78c45df"
              },
              {
                "opcode": "PREPEND_THEN_SHA256",
                "hash": "619d37789f881b22e8c0cdcd8566eb0b16678f4e1d50b9e8f812c78b87cac3ac"
              },
              {
                "opcode": "ANCHOR_SHA256",
                "hash": "0a5f88072e952879383ff1a7bd342ccd6d938ff1709febb1a5717c029a19474b"
              }
            ]
          }
        ],
        "version": 8,
        "isComplete": true
      },
      "submittedAt": 1600118846324,
      "hasBeenInsertedIntoAtLeastOneBlockchain": true,
      "blockchainRegistrations": [
        {
          "blockChainId": "0xb14f989ba3dde08f369f745fb60c8d85cea3e057456656e3e2c557abc0fea108",
          "insertedIntoBlockchainAt": 1600118882447,
          "blockChainDesc": {
            "instanceName": "4",
            "generalName": "Ethereum"
          },
          "bcExplorerUrls": [
            "http://rinkeby.etherscan.io/tx/0xb14f989ba3dde08f369f745fb60c8d85cea3e057456656e3e2c557abc0fea108"
          ],
          "status": {
            "atLeastThisNumberOfConfirmations": 340,
            "isConsideredFinal": true,
            "anchorHash": "535701a979848a0ef458f410912a8701e87c4fbd94e96f3f5a94ef0f0333fc135eaee7"
          }
        },
        {
          "blockChainId": "efbef23bb924d0b465b29eb8706ef39979b4ad8bf180fe26f15a4ee1ebf9b1e3",
          "insertedIntoBlockchainAt": 1600119061320,
          "blockChainDesc": {
            "instanceName": "test",
            "generalName": "Bitcoin"
          },
          "bcExplorerUrls": [
            "https://www.blockchain.com/btc-testnet/tx/efbef23bb924d0b465b29eb8706ef39979b4ad8bf180fe26f15a4ee1ebf9b1e3",
            "https://live.blockcypher.com/btc-testnet/tx/efbef23bb924d0b465b29eb8706ef39979b4ad8bf180fe26f15a4ee1ebf9b1e3",
            "https://blockstream.info/testnet/tx/efbef23bb924d0b465b29eb8706ef39979b4ad8bf180fe26f15a4ee1ebf9b1e3"
          ],
          "status": {
            "atLeastThisNumberOfConfirmations": 7,
            "isConsideredFinal": true,
            "anchorHash": "5357010a5f88072e952879383ff1a7bd342ccd6d938ff1709febb1a5717c029a19474b"
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

All instructions displayed below *blockchainRegistrations* provide information on how the Cryptowerk Seal could be found in a third party blockchain explorer *bcExplorerUrls*, by how many blocks the transaction is confirmed *"atLeastThisNumberOfConfirmations": 340*, if the Seal is considered final *"isConsideredFinal": true*, and under which *"anchorHash": "535701a979848a0ef458f410912a8701e87c4fbd94e96f3f5a94ef0f0333fc135eaee7"* you could find the transaction in the respective blockchain. 

In the first case where the hash was successfully registered into the blockchain, you have retrieved the Cryptowerk Seal through the retrieval ID. To automate this process, you can implement the callback function which will deliver the Cryptowerk Seal via e-mail, webhook or MQTT. Learn how to implement callbacks in the ["Register - with Callbacks"](https://docs.cryptowerk.com/tutorials/3-register-with-callbacks) tutorial.



