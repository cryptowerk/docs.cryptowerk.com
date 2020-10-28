---
title: "Verify a Seal"
metaTitle: "Verify data with a Cryptowerk Seal -Cryptowerk Tutorials"
metaDescription: "Verify data with a Cryptowerk Seal - Tutorials"
---

In this tutorial we will give you a quick example on how to verify data using a Cryptowerk Seal. To verify data via the Cryptowerk Horizon API you can simply use the `/verifyseal` call.

You will need the hash of the data you want to verify plus the Seal.
The paramater verifyDocHashes expects the hash.
The parameter ***seals*** expects a JSON array, i.e. ‘[{...}]’ not just ‘{…}’. To start the verification process you will need the previously issued Seal, which looks as follow:

```
"seal": {
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

... as well as the hash od the data you would like to verify. In this case the data hash is ***1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014***.

The command to call the `/verifyseal` call looks like this:
```
verifyDocHashes=1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014&seals={"documentInfo":{"submittedAt":1603323008105},"proofs":[{"bundleMethod":"BALANCED_MERKLE_TREE","operations":[{"blockChainId":"0xfcad1fa0c355545facec93c9767026fdd2f58eef04f6448a190def986d0d54e9","instanceName":"4","insertedIntoBlockchainAt":1603323061947,"opcode":"BLOCKCHAIN","blockchainGeneralName":"Ethereum"},{"docHash":"1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014","opcode":"DOC_SHA256"},{"opcode":"PREPEND_THEN_SHA256","hash":"e05032bfd7311200cc18a467498409fc42a1080204d3363a8102c74a1b1a5462"},{"opcode":"ANCHOR_SHA256","hash":"c73ffc4707f9c578d5b6ce9310a562acf5294509158702967d76549f608c721e"}]},{"bundleMethod":"BALANCED_MERKLE_TREE","operations":[{"blockChainId":"2c6bf1766cc19ac3c2760fe54a512016632a52b705bacaefdfb523a09502600b","instanceName":"test","insertedIntoBlockchainAt":1603323481889,"opcode":"BLOCKCHAIN","blockchainGeneralName":"Bitcoin"},{"docHash":"1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014","opcode":"DOC_SHA256"},{"opcode":"APPEND_THEN_SHA256","hash":"2221111111111111111111111111111111111111111111111111111111111111"},{"opcode":"APPEND_THEN_SHA256","hash":"c2c4078885cdd970b3b04e665018d3ed066484f45c779f008f2b962c0b3d38d7"},{"opcode":"PREPEND_THEN_SHA256","hash":"7cd4000d4185ec2cd45308e79ef00bd4a5d6ebdec7f5e68e31656bdb38e3b120"},{"opcode":"APPEND_THEN_SHA256","hash":"ed348f0bf378f938b46c583369b1d3f77cb296fceb39993454b4b8ff5b8320b3"},{"opcode":"ANCHOR_SHA256","hash":"50ee00328ea293f7dd679949eea694a2f30efd67d82fe102ab5b13960a98b25c"}]}],"version":8,"isComplete":true}' $server/API/v8/verifyseal
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
## JSON example 

Using JSON:
```
cat <<'EOT' >/tmp/postBody.$$.json
{ "provideInstructions":true,
  "verifyDocHashes":["1111111111111111111111111111111111111111111111111111111111111111"],
  "seals":[[
  {
    "bundleMethod": "BALANCED_MERKLE_TREE",
    "operations": [
      {
        "lookupInfo": "17",
        "opcode": "DOCUMENTINFO",
        "submittedAt": 1564454366050
      },
      {
        "blockChainId": "0x6a98749ff3eca810881b842e09cedfcabc478a6994661d1e534b6f31299bfe5b",
        "instanceName": "4",
        "insertedIntoBlockchainAt": 1564454401831,
        "opcode": "BLOCKCHAIN",
        "blockchainGeneralName": "Ethereum"
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
        "hash": "b4604b44fdbc2ea9d3b7387d9dcd43a8603c6194b6a4bcf7465829d46aa56359"
      },
      {
        "opcode": "ANCHOR_SHA256",
        "hash": "a77bb697d9d9acb10cbd8703426b977efa92b09d83ab676a2d4a7353c06fb8fb"
      }
    ],
    "version": 7
  },
  {
    "bundleMethod": "BALANCED_MERKLE_TREE",
    "operations": [
      {
        "lookupInfo": "17",
        "opcode": "DOCUMENTINFO",
        "submittedAt": 1564454366050
      },
      {
        "blockChainId": "c68aeb69229ff9abd3d4be5dcdeca189a01f32d1c9796312abf7015db44ae7d8",
        "instanceName": "test",
        "insertedIntoBlockchainAt": 1564454461407,
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
        "opcode": "PREPEND_THEN_SHA256",
        "hash": "6320d917a7f53e68af0a0ffd694bcdcd8503536b704062426f6ddfd93ea8a75f"
      },
      {
        "opcode": "APPEND_THEN_SHA256",
        "hash": "6c772afc0a4714ee4b0640c2f1b32af84e43e7b728772507d6279b40a86a940f"
      },
      {
        "opcode": "ANCHOR_SHA256",
        "hash": "dff9de70ea8f8319ff2babb0e8142988509413e9451f3e287224d6390c3d6d1a"
      }
    ],
    "version": 7
  }
]] }
```
EOT
```
curl -sS --header "X-ApiKey: TskZZ8Zc2QzE3G/lxvUnWPKMk27Ucd1tm9K+YSPXWww= vV+2buaDD5aAcCQxCtk4WRJs+yK/BewThR1qUXikdJo=" --header "Content-Type: application/json" --data @/tmp/postBody.$$.json https://developers.cryptowerk.com/platform/API/v6/verify | jq
```

returns

```
{
  "maxSupportedAPIVersion": 7,

  "minSupportedAPIVersion": 1,

  "verificationResults": [

    {

      "instructions": "Document lookup info=17\nDocument submitted at=Tue Jul 30 02:39:26 UTC 2019\nRegistered in blockchain Ethereum.4 using TxId or Id 0x6a98749ff3eca810881b842e09cedfcabc478a6994661d1e534b6f31299bfe5b at 2019-07-30 02:40:01 UTC\nCheck that hash in Seal 1111111111111111111111111111111111111111111111111111111111111111 equals actual document hash 1111111111111111111111111111111111111111111111111111111111111111.\nAppend 2222222222222222222222222222222222222222222222222222222222222222 and hash it, resulting in 5189c77d29fe5d546a045ec46986852785fea5c13ac7da9c115ff5fb6edf817c.\nAppend b4604b44fdbc2ea9d3b7387d9dcd43a8603c6194b6a4bcf7465829d46aa56359 and hash it, resulting in a77bb697d9d9acb10cbd8703426b977efa92b09d83ab676a2d4a7353c06fb8fb.\nCheck that provided anchor a77bb697d9d9acb10cbd8703426b977efa92b09d83ab676a2d4a7353c06fb8fb equals calculated anchor a77bb697d9d9acb10cbd8703426b977efa92b09d83ab676a2d4a7353c06fb8fb.\n",

      "sources": [

        {

          "name": "AnchorInStamp"

        },

        {

          "blockchain": {

            "instanceName": "4",

            "txId": "0x6a98749ff3eca810881b842e09cedfcabc478a6994661d1e534b6f31299bfe5b",

            "generalName": "Ethereum"

          },

          "name": "InMemoryBCLookupService"

        }

      ],

      "verified": true,

      "additionalInfo": "Document lookup info=17\nDocument submitted at=Tue Jul 30 02:39:26 UTC 2019\nRegistered in blockchain Ethereum.4 using TxId or Id 0x6a98749ff3eca810881b842e09cedfcabc478a6994661d1e534b6f31299bfe5b at 2019-07-30 02:40:01 UTC\n"

    },

    {

      "instructions": "Document lookup info=17\nDocument submitted at=Tue Jul 30 02:39:26 UTC 2019\nRegistered in blockchain Bitcoin.test using TxId or Id c68aeb69229ff9abd3d4be5dcdeca189a01f32d1c9796312abf7015db44ae7d9 at 2019-07-30 02:41:01 UTC\nCheck that hash in Seal 1111111111111111111111111111111111111111111111111111111111111111 equals actual document hash 1111111111111111111111111111111111111111111111111111111111111111.\nAppend 2222222222222222222222222222222222222222222222222222222222222222 and hash it, resulting in 5189c77d29fe5d546a045ec46986852785fea5c13ac7da9c115ff5fb6edf817c.\nPrepend 6320d917a7f53e68af0a0ffd694bcdcd8503536b704062426f6ddfd93ea8a75f and hash it, resulting in bc7c8cfcbca87f86291efc60f4de971d92289277f94969e8e712ddbf59740e82.\nAppend 6c772afc0a4714ee4b0640c2f1b32af84e43e7b728772507d6279b40a86a940f and hash it, resulting in dff9de70ea8f8319ff2babb0e8142988509413e9451f3e287224d6390c3d6d1a.\nCheck that provided anchor dff9de70ea8f8319ff2babb0e8142988509413e9451f3e287224d6390c3d6d1a equals calculated anchor dff9de70ea8f8319ff2babb0e8142988509413e9451f3e287224d6390c3d6d1a.\n",

      "sources": [

        {

          "name": "AnchorInStamp"

        },

        {

          "blockchain": {

            "instanceName": "test",

            "txId": "c68aeb69229ff9abd3d4be5dcdeca189a01f32d1c9796312abf7015db44ae7d9",

            "generalName": "Bitcoin"

          },

          "name": "InMemoryBCLookupService"

        }

      ],

      "verified": true,

      "additionalInfo": "Document lookup info=17\nDocument submitted at=Tue Jul 30 02:39:26 UTC 2019\nRegistered in blockchain Bitcoin.test using TxId or Id c68aeb69229ff9abd3d4be5dcdeca189a01f32d1c9796312abf7015db44ae7d9 at 2019-07-30 02:41:01 UTC\n"

    }

  ]

}
```
## URL encoding example 

Using URL encoding:

```
curl -sS --header "X-ApiKey: TskZZ8Zc2QzE3G/lxvUnWPKMk27Ucd1tm9K+YSPXWww= vV+2buaDD5aAcCQxCtk4WRJs+yK/BewThR1qUXikdJo=" --data "provideInstructions=true&verifyDocHashes=1111111111111111111111111111111111111111111111111111111111111111&seals=%7B%0A%20%20%22bundleMethod%22%3A%20%22BALANCED_MERKLE_TREE%22%2C%0A%20%20%22operations%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22lookupInfo%22%3A%20%2217%22%2C%0A%20%20%20%20%20%20%22opcode%22%3A%20%22DOCUMENTINFO%22%2C%0A%20%20%20%20%20%20%22submittedAt%22%3A%201564454366050%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22blockChainId%22%3A%20%220x6a98749ff3eca810881b842e09cedfcabc478a6994661d1e534b6f31299bfe5b%22%2C%0A%20%20%20%20%20%20%22instanceName%22%3A%20%224%22%2C%0A%20%20%20%20%20%20%22insertedIntoBlockchainAt%22%3A%201564454401831%2C%0A%20%20%20%20%20%20%22opcode%22%3A%20%22BLOCKCHAIN%22%2C%0A%20%20%20%20%20%20%22blockchainGeneralName%22%3A%20%22Ethereum%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22docHash%22%3A%20%221111111111111111111111111111111111111111111111111111111111111111%22%2C%0A%20%20%20%20%20%20%22opcode%22%3A%20%22DOC_SHA256%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22opcode%22%3A%20%22APPEND_THEN_SHA256%22%2C%0A%20%20%20%20%20%20%22hash%22%3A%20%222222222222222222222222222222222222222222222222222222222222222222%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22opcode%22%3A%20%22APPEND_THEN_SHA256%22%2C%0A%20%20%20%20%20%20%22hash%22%3A%20%22b4604b44fdbc2ea9d3b7387d9dcd43a8603c6194b6a4bcf7465829d46aa56359%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22opcode%22%3A%20%22ANCHOR_SHA256%22%2C%0A%20%20%20%20%20%20%22hash%22%3A%20%22a77bb697d9d9acb10cbd8703426b977efa92b09d83ab676a2d4a7353c06fb8fb%22%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22version%22%3A%207%0A%7D" https://developers.cryptowerk.com/platform/API/v6/verify | jq
```


returns

```  
{

  "maxSupportedAPIVersion": 7,

  "minSupportedAPIVersion": 1,

  "verificationResults": [

    {

      "instructions": "Document lookup info=17\nDocument submitted at=Tue Jul 30 02:39:26 UTC 2019\nRegistered in blockchain Ethereum.4 using TxId or Id 0x6a98749ff3eca810881b842e09cedfcabc478a6994661d1e534b6f31299bfe5b at 2019-07-30 02:40:01 UTC\nCheck that hash in Seal 1111111111111111111111111111111111111111111111111111111111111111 equals actual document hash 1111111111111111111111111111111111111111111111111111111111111111.\nAppend 2222222222222222222222222222222222222222222222222222222222222222 and hash it, resulting in 5189c77d29fe5d546a045ec46986852785fea5c13ac7da9c115ff5fb6edf817c.\nAppend b4604b44fdbc2ea9d3b7387d9dcd43a8603c6194b6a4bcf7465829d46aa56359 and hash it, resulting in a77bb697d9d9acb10cbd8703426b977efa92b09d83ab676a2d4a7353c06fb8fb.\nCheck that provided anchor a77bb697d9d9acb10cbd8703426b977efa92b09d83ab676a2d4a7353c06fb8fb equals calculated anchor a77bb697d9d9acb10cbd8703426b977efa92b09d83ab676a2d4a7353c06fb8fb.\n",

      "sources": [

        {

          "name": "AnchorInStamp"

        },

        {

          "blockchain": {

            "instanceName": "4",

            "txId": "0x6a98749ff3eca810881b842e09cedfcabc478a6994661d1e534b6f31299bfe5b",

            "generalName": "Ethereum"

          },

          "name": "InMemoryBCLookupService"

        }

      ],

      "verified": true,

      "additionalInfo": "Document lookup info=17\nDocument submitted at=Tue Jul 30 02:39:26 UTC 2019\nRegistered in blockchain Ethereum.4 using TxId or Id 0x6a98749ff3eca810881b842e09cedfcabc478a6994661d1e534b6f31299bfe5b at 2019-07-30 02:40:01 UTC\n"

    }

  ]

}
```

It is important to add in the first example: "Content-type: application/json”.  

When you copy the Seal with the information you have received in the callback, make sure you are copying starting from the first square brackets.  
