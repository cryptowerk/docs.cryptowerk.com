---
title: "Bulk Seal"
metaTitle: "Bulk Seal - Cryptowerk Tutorials"
metaDescription: "Bulk Seal - Cryptowerk Tutorials"
---

## Options For Bulk Seals

The following examples are not yet finalized and may be subject to change. Using the Bulk Seal in production might also require an additional license.

### Bulk Seal - One Small Seal Represents A Collection of Hashes

Traditionally a Seal is created for each hash that is registered. A using a Bulk Seal mode one Seal may encapsulate millions of hashes without impacting the size of the Seal itself. This save bandwidth and storage. The Bulk Seal may be used to verify the entire collection of hashes at one time or *any individual hash* that was bundled into the Bulk Seal.

### Registering Hashes and Retrieving a Bulk Seal
When the `/register` method is called there is a parameter called mode which has two options:

- *individualSeal*: Only return individual seals. Every hash that is registered generates a Seal. Those Seals are delivered and must be stored in order to verify the integrity of the data at a later point in time.
- *bulkSeal*:  Return a bulk seal, i.e. multiple hashes are verifiable by a individual Seal that is optimized for throughput, speed of computation, and storage. Instead of requiring 1-2KB storage per Seal for a single hash, a Bulk Seal is about 2KB independent of the number of hashes. 


When a Bulk Seal is registered successfully a 200 response will look similar to this:
```json
{
  "maxSupportedAPIVersion": 8,
  "minSupportedAPIVersion": 1,
  "bulkSeal": {
    "retrievalId": "si12737612",
    "memberRetrievalIdFrom": "ri3m2737612.0",
    "memberRetrievalIdTo": "ri3m2737612.999"
  }
}
```
Notice the retrievalId is accompanied by memberRetrievalIdFrom and memberRetrievalIdTo. In this call there were 1000 hashes registered as an array of hashes. An individual Seal may be retrieved by calling `/getSeal` using the the index location of a hash that was registered. The retrievelId for a Bulk Seal uses dot notation to match the location of the hash in the array of hashes being registered to the retrievalId.
| Index | hash   | retrievalId     |
|-------|--------|-----------------|
| 0     | 1111.. | ri3m2737612.0   |
| 1     | 2222.. | ri3m2737612.1   |
| 2     | 3333.. | ri3m2737612.2   |
| ...   |        |                 |
| 999   | 1000.. | ri3m2737612.999 |

The entire array of hashes in this example is registered and retrievable using a Bulk Seal. The Bulk Seal has a retrievalID of its own, in this case `si12737612` is the Bulk Seal's retrievalID.

When retrieving a Seal via the `/getseal` method, there is a new option called *hashSequenceKnown*. Setting this option to TRUE means that the application already knows the hashes and the order in which they sent in the `/register` call. Selection this will omit the hashes from being returned with the Bulk Seal saving bandwidth and the need to store those values again. If *hashSequenceKnown* is sent to FALSE an encoded string representing the registered hashes and their order will be returned as part of the Bulk Seal in a field called *allHashes*. The encoding format is listed in the field *allHashesEncoding*. For example, here is a partial response to `/getseal`:

```json
{
  "retrievalId": "si12737612",
  "maxSupportedAPIVersion": 8,
  "minSupportedAPIVersion": 1,
  "bulkSeal": {
    "numHashes": 2,
    "hashLength": 32,
    "bundleMethod": "BALANCED_MERKLE_TREE",
    "allHashesEncoding": "base64",
    "allHashes": "EREREREREREREREREREREREREREREREREREREREREREiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiI.....", // Truncated for ease of reading in documenation
    "source": "https://developers.cryptowerk.com/platform",
    "anchorRetrievalId": "ri31651128753549d80cd76288ce1bc4900bc0c15dbe854b83ceb72916f3950b57e",
    "type": "bulk",
    "version": 9,
    "anchorSeal": {
      "documentInfo": {
        "submittedAt": 1617742586382
      },
    ....
  }
```
### Verifying a Bulk Seal

The verification process for a Bulk Seal is similar to verifying a single Seal and document hash. The hash or hashes and the Bulk Seal are needed when calling `/verifyseal`. You may use value returned in the field *allHashes* when the `/getSeal` method is called if you do not already have the hash or all hashes stored. It is important that the hashes are in the correct order if the Bulk Seal does not include the field *allHashes*

If *allHashes* is included in the Bulk Seal then verification of any one hash or several hashes in any order is possible.