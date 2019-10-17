---
title: "Verify Data with verifyDocHashes"
metaTitle: "Sealing With Callbacks -Cryptowerk Tutorials"
metaDescription: "Cryptowerk Sealing With Callbacks - Tutorials"
---

In this tutorial we will give you a quick example on how to verify data using the second group of operations – verification of issued seal.

Your API call looks mostly ok. It’s just that the parameter ***seals*** expects a JSON array, i.e. ‘[{...}]’ not just ‘{…}’. Please use the two following examples as a reference:


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

Or using URL encoding:

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
