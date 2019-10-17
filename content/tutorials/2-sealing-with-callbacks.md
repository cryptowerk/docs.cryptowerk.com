---
title: "Sealing With Callbacks"
metaTitle: "Sealing With Callbacks -Cryptowerk Tutorials"
metaDescription: "Cryptowerk Sealing With Callbacks - Tutorials"
---

## Receive Seal via Callbacks
When implementing callbacks, you will receive Seals in callbacks with a small time difference. This is based on the heartbeat each blockchain has. An example: the callback you receive can tell you that Ethereum accepted your document but Bitcoin not yet. That's because Ethereum's heartbeat is about 15 seconds long. Bitcoin's heartbeat clocks at around 10 minutes. So, it shouldn't surprise you that your document has arrived in Ethereum already but not yet in Bitcoin. That's why the API says "hasBeenInsertedIntoAllRequestedBlockchains": false

```
"maxSupportedAPIVersion": 6,
"documents": [
  {
    "retrievalId": "ri22218341d127a2e12eb4d6bcf17464cd1d8170516d15a1d225db62643f339bdeddd7c69",
    "seals": [
      {
        "bundleMethod": "BALANCED_MERKLE_TREE",
        "operations": [
          {
            "opcode": "DOCUMENTINFO",
            "submittedAt": 1543455106015
          },
          {
            "blockChainId": "0xcb47fc2b7167bf76cb503c14893cff30a1bff5917604c65209cceb45816898e6",
            "instanceName": "4",
            "insertedIntoBlockchainAt": 1543455127403,
            "opcode": "BLOCKCHAIN",
            "blockchainGeneralName": "Ethereum"
          },
          {
            "docHash": "2c6424d8c837e1ea79a68a2f36eca526192ebd9d9cabe25ee839b67956ff960a",
            "opcode": "DOC_SHA256"
          },
          {
            "opcode": "PREPEND_THEN_SHA256",
            "hash": "5189c77d29fe5d546a045ec46986852785fea5c13ac7da9c115ff5fb6edf817c"
          },
          {
            "opcode": "APPEND_THEN_SHA256",
            "hash": "bbe5b9c5d7dd278e842a45ba7f34bd1ccc41e5bd353665e2686bcd13ade8c1aa"
          },
          {
            "opcode": "ANCHOR_SHA256",
            "hash": "c323a6ef1e835dc088e62e7582bbb75dcb0c3ef8c9ebe764c4e691e910e561d5"
          }
        ],
        "version": 7
      }
    ],
    "submittedAt": 1543455106015,
    "hasBeenInsertedIntoAtLeastOneBlockchain": true,
    "sealsAreComplete": false,
    "blockchainRegistrations": [
      {
        "blockChainId": "0xcb47fc2b7167bf76cb503c14893cff30a1bff5917604c65209cceb45816898e6",
        "insertedIntoBlockchainAt": 1543455127403,
        "blockChainDesc": {
          "instanceName": "4",
          "generalName": "Ethereum"
        },
        "status": {
          "atLeastThisNumberOfConfirmations": 0,
          "isConsideredFinal": false
        }
      }
    ],
    "hasBeenInsertedIntoAllRequestedBlockchains": false
  }
],
"minSupportedAPIVersion": 1
}
```

If you have registered hashes into Ethereum and Bitcoin blockchain at the same time, you will receive a second callback after approx. 10 minutes that confirms the registration of the hash in the Bitcoin blockchain.
```
...
"status": {
  "atLeastThisNumberOfConfirmations": 51,
  "isConsideredFinal": true
}
}
],
"hasBeenInsertedIntoAllRequestedBlockchains": true
}
```


## Receive one or multiple Callbacks
 Callbacks can include a mix of different hashes. Also, if different hashes are submitted with a small time difference, they come back through one callback together. This behavior is intentional.

 The idea behind is that it should make no difference for the callback endpoint's implementation whether it receives one, two, or more Seals. But it should be much faster to call one callback with 1000 seals than performing 1000 callback invocations with one Seal each. That is true for both the caller and the callee's side.

 So, we do some preprocessing on our side to put as many Seals into a callback as we can to improve performance. If however, for some reason, you want to have a separate callback for each set of registered hashes using the same endpoint (which we don't recommend), then you can make the URLs look different to enforce such a behavior, for instance by adding an artificial query parameter with a different value for each time. I.e., 'keepthemapart' (or whatever name you want)
```
curl -sS --header "X-ApiKey: $apiKey $apiCred" --data "hashes=1111111111111111111111111111111111111111111111111111111111111111&lookupInfos=23&callback=$(urlEncode "http:jsonplain:${webhook}?keepthemapart=1")" $server/API/v8/register
then curl -sS --header "X-ApiKey: $apiKey $apiCred" --data "hashes=1111111111111111111111111111111111111111111111111111111111111111&lookupInfos=23&callback=$(urlEncode "http:jsonplain:${webhook}?keepthemapart=2")" $server/API/v8/register
```
with this example it would then not call your endpoint once with two seals but twice with one seal each.
