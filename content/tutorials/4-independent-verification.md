---
title: "Independent verification"
metaTitle: "Sealing With Callbacks -Cryptowerk Tutorials"
metaDescription: "Cryptowerk Sealing With Callbacks - Tutorials"
---

## Can I independently verify Seals without Cryptowerk?

Yes, you can, just yourself, in particular without requiring anything from Cryptowerk, for as long as at least one of the blockchain(s) exist.

The flow of registering data works like this:
Example case: You have a (potentially confidential) document. You want to be able to prove to any third party that this document existed at a certain time and hasn't been altered. For instance, your document is the text "Life is beautiful." (without any newline at the end).

You create a cryptographic hash of your document. You can pick any hash algorithm you like and any tool or method of how to produce it. Let's say you pick SHA-256, you use command line tools, and you happen to run those on a Mac. To get the hash you would do
```
echo -n "Life is beautiful." | shasum -a 256 or echo -n "Life is beautiful." | openssl sha256 The result is 2c6424d8c837e1ea79a68a2f36eca526192ebd9d9cabe25ee839b67956ff960a.
```
That's the hexadecimal notation for 32 bytes of data.

Please note that, (a) this effectively anonymizes your data. Given only the hash, you cannot deduce the original document. (b) You don't need any keys, neither public nor private. No key management required. (c) It is computationally infeasible (read "impossible") to construct another document that yields the same hash. For instance, a document that would say "Life is not beautiful."

Technical detail: (a) actually assumes that there is sufficient entropy in the original document. Otherwise you could try to guess it and check whether the hash matches your guess. You can easily solve that by adding random contents, usually called a nonce. For instance, "Life is beautiful. (Please ignore this number: 787729283.)" The document semantically still says the same. However, an attacker would need to know or guess this random number, which is not possible if you don't publish the number and make it long enough.

You register the hash in one or multiple blockchains by calling our API

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" --data "hashes=2c6424d8c837e1ea79a68a2f36eca526192ebd9d9cabe25ee839b67956ff960a" $server/API/v6/register You get server, apiKey and apiCred from us. Also, on request you can choose which blockchains you want your document to be registered in. We support several public and private blockchains. You can register many hashes in the same API call. Just separate them by a comma like this: curl -sS --header "X-ApiKey: $apiKey $apiCred" --data "hashes=1111111111111111111111111111111111111111111111111111111111111111,2222222222222222222222222222222222222222222222222222222222222222,3333333333333333333333333333333333333333333333333333333333333333" $server/API/v6/register
```

Note that you didn't provide us with the actual document, just its hash. So, we don't know it. So, we can't leak it nor can it be stolen from us. It never leaves your computer. No trust into any security measures is required.

The API responds:

```
{
   "maxSupportedAPIVersion": 6,
   "documents": [
     {
       "retrievalId": "ri22218341d127a2e12eb4d6bcf17464cd1d8170516d15a1d225db62643f339bdeddd7c69"
     }
   ],
   "minSupportedAPIVersion": 1
 }
```
You now have a ticket ("ri2...") which you can use in subsequent API calls. If you submitted multiple hashes, you get one retrievalId per hash.

After some time, when the blockchain(s) have accepted your document, you can retrieve the mathematical proof of it having been registered from the API. Say, you wanted to use Ethereum and Bitcoin and after some 30 sec to run this:
```
curl -sS --header "X-ApiKey: $apiKey $apiCred" --data "retrievalId=ri22218341d127a2e12eb4d6bcf17464cd1d8170516d15a1d225db62643f339bdeddd7c69" $server/API/v6/verify
```
It responds with:
```
{
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

1.  It tells you that Ethereum accepted your document. That's because Ethereum's heartbeat is about 15 seconds long. Bitcoin's heartbeat clocks at around 10 minutes.
So, it shouldn't surprise that your document has arrived in Ethereum already but not yet in Bitcoin.
That's why the API says "hasBeenInsertedIntoAllRequestedBlockchains": false. More on that later.
2. In documents.seals[0] you now find the seal, the mathematical proof with which you can prove 30 years later that life was beautiful 30 years ago.
Note that the blockchain not only guarantees that the document wasn't altered but also provides a globally agreed on timestamp when it was registered.
3. So, 30 years later, you take the document that you want to verify, i.e. "Life is beautiful." and - again, like back then - calculate the hash:  echo -n "Life is beautiful." | shasum -a 256
which returns 2c6424d8c837e1ea79a68a2f36eca526192ebd9d9cabe25ee839b67956ff960a.
That's the same number as in documents.seals[0].operations["opcode": "DOC_SHA256"]. So far ok. But that's not connected to the blockchain yet.
4. To verify the unbreakable link from your document and its hash to the blockchain you follow a path of hash operations, as outlined in the seal:
You prepend '5189c77d29fe5d546a045ec46986852785fea5c13ac7da9c115ff5fb6edf817c' and hash again, i.e.
echo
``` "5189c77d29fe5d546a045ec46986852785fea5c13ac7da9c115ff5fb6edf817c2c6424d8c837e1ea79a68a2f36eca526192ebd9d9cabe25ee839b67956ff960a" | xxd -p -r | shasum -a 256
  (Note: xxd turns the hexadecimal text into actual bytes.)
  yields 9613cbf8f7c8e6ad01ec02ea5b0d8c44f059e559dfe144df6e66ad611063e073, to which you append bbe5b9c5d7dd278e842a45ba7f34bd1ccc41e5bd353665e2686bcd13ade8c1aa and hash:
  echo "9613cbf8f7c8e6ad01ec02ea5b0d8c44f059e559dfe144df6e66ad611063e073bbe5b9c5d7dd278e842a45ba7f34bd1ccc41e5bd353665e2686bcd13ade8c1aa" | xxd -p -r | shasum -a 256
  returns c323a6ef1e835dc088e62e7582bbb75dcb0c3ef8c9ebe764c4e691e910e561d5. Which also is noted in documents.seals[0].operations["opcode": "ANCHOR_SHA256"]
  ```
  Again, ok and nice, but no proof yet.
5. The seal also tells you that Ethereum blockchain transaction 0xcb47fc2b7167bf76cb503c14893cff30a1bff5917604c65209cceb45816898e6
is supposed to contain that very hash you just calculated.
Let's check that by using any public and independent blockchain explorer and point your web browser at, say,
  https://rinkeby.etherscan.io/tx/0xcb47fc2b7167bf76cb503c14893cff30a1bff5917604c65209cceb45816898e6
6. It shows that the blockchain contains the value
  "0x535701c323a6ef1e835dc088e62e7582bbb75dcb0c3ef8c9ebe764c4e691e910e561d5"
That's 0x5357 for the letters 'S' and 'W' for SealWitness in ASCII code - which is Cryptowerk's tag -, 01 for the version number 1, and the hash c323...
It's identical to what we calculated. That proves that at the time of the hash's arrival in the blockchain (Nov-29-2018 01:32:14 AM +UTC) the statement actually was "Life is beautiful."
7. Now, after some minutes, we ask the API again and check whether it also arrived in Bitcoin, which has a 10 minute heartbeat:
```
  curl -sS --header "X-ApiKey: $apiKey $apiCred" --data "retrievalId=ri22218341d127a2e12eb4d6bcf17464cd1d8170516d15a1d225db62643f339bdeddd7c69" $server/API/v6/verify
-----
```
```
curl.
 {
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
                "blockChainId": "9bf8b6439722c7177e9cbffcee09c34a4422c9ded539176e0ed842592959b926",
                "instanceName": "test",
                "insertedIntoBlockchainAt": 1543455713337,
                "opcode": "BLOCKCHAIN",
                "blockchainGeneralName": "Bitcoin"
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
                "hash": "54e73447450fc73339f859a657e16983731cc10547293047f84b41967f7fe326"
              },
              {
                "opcode": "APPEND_THEN_SHA256",
                "hash": "f3484d13201e6a27a81c54af94cc1b56f32809b0a9d20cb69f24bde97f21be48"
              },
              {
                "opcode": "ANCHOR_SHA256",
                "hash": "bb0771641502c93f9572138bdddec61fdfc5f8a5350667a54e0132e43da87863"
              }
            ],
            "version": 7
          },
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
        "sealsAreComplete": true,
        "blockchainRegistrations": [
          {
            "blockChainId": "9bf8b6439722c7177e9cbffcee09c34a4422c9ded539176e0ed842592959b926",
            "insertedIntoBlockchainAt": 1543455713337,
            "blockChainDesc": {
              "instanceName": "test",
              "generalName": "Bitcoin"
            },
            "status": {
              "atLeastThisNumberOfConfirmations": 1,
              "isConsideredFinal": false
            }
          },
          {
            "blockChainId": "0xcb47fc2b7167bf76cb503c14893cff30a1bff5917604c65209cceb45816898e6",
            "insertedIntoBlockchainAt": 1543455127403,
            "blockChainDesc": {
              "instanceName": "4",
              "generalName": "Ethereum"
            },
            "status": {
              "atLeastThisNumberOfConfirmations": 51,
              "isConsideredFinal": true
            }
          }
        ],
        "hasBeenInsertedIntoAllRequestedBlockchains": true
      }
    ],
    "minSupportedAPIVersion": 1
  }
  ```
  -----
8. And yes, it's now anchored in both Ethereum and Bitcoin. It also says "hasBeenInsertedIntoAllRequestedBlockchains": true.
9. By the way, instead of asking the API you can tell the API at registration time that it should notify you through an http callback and tell you about any arrival in any blockchain(s).

Now you know and can prove to anyone, without Cryptowerk, just by remembering the seal that you got at registration time, that life is beautiful.
There are two more options you have:

1. You let us verify the seal through our API. That's convenient but you would  need to trust us. So, you might want to manually check some sample from time to time, say, every 100000 documents. That way you can be certain that we do the right thing.

2. You use software on your own computer to do the same as you did manually above.
  While you might want to write that little piece of software yourself, we actually provide you with the source code to do exactly that. It's called the "starter pack" and can be found here:
 https://developers.cryptowerk.com/platform/assets/starterpack.zip

3. unpack the zip file and the example above can be verified running     
   java -cp com.cryptowerk.sw.test.APIClientExample.jar com.cryptowerk.sw.test.SealVerifier 0x2c6424d8c837e1ea79a68a2f36eca526192ebd9d9cabe25ee839b67956ff960a @example-seals/faq-example.txt 0x535701c323a6ef1e835dc088e62e7582bbb75dcb0c3ef8c9ebe764c4e691e910e561d5
 which then confirms:
   Your document has been successfully verified.
   Document submitted at=Wed Nov 28 17:31:46 PST 2018
   Registered in blockchain Ethereum.4 using TxId or Id 0xcb47fc2b7167bf76cb503c14893cff30a1bff5917604c65209cceb45816898e6 at 2018-11-28 17:32:07 PST

In summary, you just made that crucial step that permits you - when it comes to digital data - to replace trust
