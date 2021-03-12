---
title: "Verify a Seal"
metaTitle: "Verify data with a Cryptowerk Seal -Cryptowerk Tutorials"
metaDescription: "Verify data with a Cryptowerk Seal - Tutorials"
---

In this tutorial we will give you a quick example on how to verify data using a Cryptowerk Seal. To verify data via the Cryptowerk Horizon API you can simply use the `/verifyseal` call.

You will need the hash of the data you want to verify plus the Seal.
The parameter verifyDocHashes expects the hash. If there are more than one hash being verified in a call a comma separated list of hashes should be sent.
The parameter ***seals*** expects a JSON array, i.e. ‘[{...}]’ when there are more than one seal being sent. If you are verifying one hash then one Seal as an object is ok ‘{…}’. To start the verification process you will need the previously issued Seal, which looks as follows and is found in the `/getseal` response body:

```
 {
        "documentInfo": {
          "submittedAt": 1603323008105
        },
        "proofs": [
          {
            "bundleMethod": "BALANCED_MERKLE_TREE",
            "operations": [
              {
                "blockChainId": "0xfcad1fa0c355545facec93c9767026fdd2f58eef04f6448a190def986d0d54e9",
                "instanceName": "4",
                "insertedIntoBlockchainAt": 1603323061947,
                "opcode": "BLOCKCHAIN",
                "blockchainGeneralName": "Ethereum"
              },
              {
                "docHash": "1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014",
                "opcode": "DOC_SHA256"
              },
              {
                "opcode": "PREPEND_THEN_SHA256",
                "hash": "e05032bfd7311200cc18a467498409fc42a1080204d3363a8102c74a1b1a5462"
              },
              {
                "opcode": "ANCHOR_SHA256",
                "hash": "c73ffc4707f9c578d5b6ce9310a562acf5294509158702967d76549f608c721e"
              }
            ]
          },
          {
            "bundleMethod": "BALANCED_MERKLE_TREE",
            "operations": [
              {
                "blockChainId": "2c6bf1766cc19ac3c2760fe54a512016632a52b705bacaefdfb523a09502600b",
                "instanceName": "test",
                "insertedIntoBlockchainAt": 1603323481889,
                "opcode": "BLOCKCHAIN",
                "blockchainGeneralName": "Bitcoin"
              },
              {
                "docHash": "1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014",
                "opcode": "DOC_SHA256"
              },
              {
                "opcode": "APPEND_THEN_SHA256",
                "hash": "2221111111111111111111111111111111111111111111111111111111111111"
              },
              {
                "opcode": "APPEND_THEN_SHA256",
                "hash": "c2c4078885cdd970b3b04e665018d3ed066484f45c779f008f2b962c0b3d38d7"
              },
              {
                "opcode": "PREPEND_THEN_SHA256",
                "hash": "7cd4000d4185ec2cd45308e79ef00bd4a5d6ebdec7f5e68e31656bdb38e3b120"
              },
              {
                "opcode": "APPEND_THEN_SHA256",
                "hash": "ed348f0bf378f938b46c583369b1d3f77cb296fceb39993454b4b8ff5b8320b3"
              },
              {
                "opcode": "ANCHOR_SHA256",
                "hash": "50ee00328ea293f7dd679949eea694a2f30efd67d82fe102ab5b13960a98b25c"
              }
            ]
          }
        ],
        "version": 8,
        "isComplete": true
      }
```

... as well as the hash of the data you would like to verify. In this case the data hash is ***1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014***.

The command to call the `/verifyseal` call looks like this:
```
verifyDocHashes=1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014\
&seals={"documentInfo":{"submittedAt":1603323008105},"proofs":[{"bundleMethod":"BALANCED_MERKLE_TREE","operations":[{"blockChainId":"0xfcad1fa0c355545facec93c9767026fdd2f58eef04f6448a190def986d0d54e9","instanceName":"4","insertedIntoBlockchainAt":1603323061947,"opcode":"BLOCKCHAIN","blockchainGeneralName":"Ethereum"},{"docHash":"1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014","opcode":"DOC_SHA256"},{"opcode":"PREPEND_THEN_SHA256","hash":"e05032bfd7311200cc18a467498409fc42a1080204d3363a8102c74a1b1a5462"},{"opcode":"ANCHOR_SHA256","hash":"c73ffc4707f9c578d5b6ce9310a562acf5294509158702967d76549f608c721e"}]},{"bundleMethod":"BALANCED_MERKLE_TREE","operations":[{"blockChainId":"2c6bf1766cc19ac3c2760fe54a512016632a52b705bacaefdfb523a09502600b","instanceName":"test","insertedIntoBlockchainAt":1603323481889,"opcode":"BLOCKCHAIN","blockchainGeneralName":"Bitcoin"},{"docHash":"1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014","opcode":"DOC_SHA256"},{"opcode":"APPEND_THEN_SHA256","hash":"2221111111111111111111111111111111111111111111111111111111111111"},{"opcode":"APPEND_THEN_SHA256","hash":"c2c4078885cdd970b3b04e665018d3ed066484f45c779f008f2b962c0b3d38d7"},{"opcode":"PREPEND_THEN_SHA256","hash":"7cd4000d4185ec2cd45308e79ef00bd4a5d6ebdec7f5e68e31656bdb38e3b120"},{"opcode":"APPEND_THEN_SHA256","hash":"ed348f0bf378f938b46c583369b1d3f77cb296fceb39993454b4b8ff5b8320b3"},{"opcode":"ANCHOR_SHA256","hash":"50ee00328ea293f7dd679949eea694a2f30efd67d82fe102ab5b13960a98b25c"}]}],"version":8,"isComplete":true}'\
 $server/API/v8/verifyseal
```

If the data verification is successful, the API response will look like this:

```
{
  "maxSupportedAPIVersion": 8,
  "minSupportedAPIVersion": 1,
  "verificationResults": [
    {
      "proofs": [
        {
          "sources": [
            {
              "name": "AnchorInStamp"
            },
            {
              "blockchain": {
                "instanceName": "4",
                "txId": "0xfcad1fa0c355545facec93c9767026fdd2f58eef04f6448a190def986d0d54e9",
                "generalName": "Ethereum"
              },
              "name": "InMemoryBCLookupService"
            }
          ],
          "verified": true,
          "additionalInfo": "Registered in blockchain Ethereum.4 using TxId or Id 0xfcad1fa0c355545facec93c9767026fdd2f58eef04f6448a190def986d0d54e9 at 2020-10-21 23:31:01 UTC\n"
        },
        {
          "sources": [
            {
              "name": "AnchorInStamp"
            },
            {
              "blockchain": {
                "instanceName": "test",
                "txId": "2c6bf1766cc19ac3c2760fe54a512016632a52b705bacaefdfb523a09502600b",
                "generalName": "Bitcoin"
              },
              "name": "InMemoryBCLookupService"
            }
          ],
          "verified": true,
          "additionalInfo": "Registered in blockchain Bitcoin.test using TxId or Id 2c6bf1766cc19ac3c2760fe54a512016632a52b705bacaefdfb523a09502600b at 2020-10-21 23:38:01 UTC\n"
        }
      ],
      "verified": true,
      "isComplete": true
    }
  ]
}
```

## Manipulated verification

In case the data hash was manipulated, the API provides following response:

```
{
  "maxSupportedAPIVersion": 8,
  "minSupportedAPIVersion": 1,
  "verificationResults": [
    {
      "proofs": [
        {
          "sources": [],
          "verified": false,
          "additionalInfo": "Registered in blockchain Ethereum.4 using TxId or Id 0xfcad1fa0c355545facec93c9767026fdd2f58eef04f6448a190def986d0d54e9 at 2020-10-21 23:31:01 UTC\nVerification failed due to: Original document hash does not equal document hash contained in Seal."
        },
        {
          "sources": [],
          "verified": false,
          "additionalInfo": "Registered in blockchain Bitcoin.test using TxId or Id 2c6bf1766cc19ac3c2760fe54a512016632a52b705bacaefdfb523a09502600b at 2020-10-21 23:38:01 UTC\nVerification failed due to: Original document hash does not equal document hash contained in Seal."
        }
      ],
      "verified": false,
      "isComplete": true
    }
  ]
}
```

Let's have a look at another case, where the Seal is manipulated and a fake hash was insert into the Seal. The `/verifyseal` call will response as follows:

```
{
  "maxSupportedAPIVersion": 8,
  "minSupportedAPIVersion": 1,
  "verificationResults": [
    {
      "proofs": [
        {
          "sources": [],
          "verified": false,
          "additionalInfo": "Registered in blockchain Ethereum.4 using TxId or Id 0xfcad1fa0c355545facec93c9767026fdd2f58eef04f6448a190def986d0d54e9 at 2020-10-21 23:31:01 UTC\nVerification failed due to: Calculated anchor does not equal stored anchor in Seal."
        },
        {
          "sources": [],
          "verified": false,
          "additionalInfo": "Registered in blockchain Bitcoin.test using TxId or Id 2c6bf1766cc19ac3c2760fe54a512016632a52b705bacaefdfb523a09502600b at 2020-10-21 23:38:01 UTC\nVerification failed due to: Original document hash does not equal document hash contained in Seal."
        }
      ],
      "verified": false,
      "isComplete": true
    }
  ]
}
```