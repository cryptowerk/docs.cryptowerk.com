---
title: "Verifying Data Integrity"
metaTitle: "FAQ - Verifying Data Integrity"
metaDescription: "Cryptowerk FAQ - Verifying Data Integrity"
---
## What is the process for validating sealed data with Cryptowerk?

You can use the verify API call in your application to allow you or any third party to check registration status of previously registered hashes or verify a previously issued seal.

## Is Cryptowerk’s verification API open source?

No. That said, you can also verify your data by directly querying the blockchains on which the super-hash is stored without using the Cryptowerk Seal API.

## What is a hash function?

A hash is a fixed-size alphanumeric string. The string is called the hash value. Often also seen as a “copy” or “fingerprint” of the original data. Most often a 256 SHA 32-bit algorithm is used which is almost a standard to generate such hashes.

## Which hash algorithms do you support?

We recommend the use of SHA-256 (Secure Hashing Algorithm) to generate hashes but also support hashes created by a compatible hashing utility.

## How do I hash my customers’ data before I send it to Cryptowerk?

There are a variety of open source and public hashing utilities available, including this simple upload-based one. Cryptowerk does not take a stance on which ones to specifically recommend.

## I want to release an open source product that leverages the Cryptowerk service. Can I do that?

The Cryptowerk Horizon API is designed and available as a REST API that can be called from within custom or commercial software applications (on-premise or cloud). Those applications can be proprietary, commercial, or open source. Customers don’t have access to the underlying Cryptowerk Seal code, but rather write to the API based on our easy-to-use documentation.

## What is the process for validating sealed data with Cryptowerk?

You can use the verify API call in your application to allow you or any third party to check registration status of previously registered hashes or verify a previously issued seal.

## When you write into multiple blockchains, do I get a Seal for each blockchain?

You will receive one Seal for the hash you have submitted. If the hash is written into several blockchains you will receive one Seal that shows several "proofs". Proofs show in which blockchains the hash was written.

## What does the Seal include?

A Seal contains the information required to prove that a document had been registered in a blockchain. Among other things, it contains a (transaction) identifier in one or multiple blockchains, the hash of a document, the conclusive mathematical proof linking the document to the blockchain demonstrating the document's existence at registration time and it not having been tampered with, the time this document was submitted to the server and the time it was submitted to the blockchain. You will also find the lookupInfo in the Seal, that helps you to look up info in your local database.

## If I lose the Seal, can I restore it from your database?

No. Your application writes your hashes to the Cryptowerk Horizon API, in which they are re-hashed, a hash link is created and written into blockchains. At this point, for greater security, the ticket number, anchor and Seal are removed from the Cryptowerk database, so Cryptowerk no longer has access to your hashes or the Seals.

## If I send a Seal to third parties for later verification, how do they know which original data it is referring to?

The whole purpose of Sealing data is to be able to later verify that data has remained unchanged since a specific time. Therefore, the third party must have access to the original data to be verified, though it doesn’t need to reside in its original location (i.e., it can be emailed or otherwise electronically transmitted to the third party).

## Explain to me how Cryptowerk “queues” my requests?

Hashes are queued on a first-in/first-out basis and submitted to the Cryptowerk Horizon API to be re-hashed and anchored in blockchains on our regular schedule.

## Is Cryptowerk’s verification API open source?

No. That said, you can also verify your data by directly querying the blockchains on which the super-hash is stored without using the Cryptowerk Seal API.

## How can I reset my API key?

Go to the “Account” section in the developer portal, click "Regenerate API Key".

## Can I independently verify seals without Cryptowerk?

Yes, you can. In particular without requiring anything from Cryptowerk, for as long as at least one of the blockchain(s) exist. Please find the whole process in the Cryptowerk's public GitRepository.

## Can I independently verify seals without Cryptowerk?

Yes, you can. In particular without requiring anything from Cryptowerk, for as long as at least one of the blockchain(s) exist. Please find the whole process in the Cryptowerk's public GitRepository.

## If I send a Seal to third parties for later verification, how do they know which original data it is referring to?

The whole purpose of Sealing data is to be able to later verify that data has remained unchanged since a specific time. Therefore, the third party must have access to the original data to be verified, though it doesn’t need to reside in its original location (i.e., it can be emailed or otherwise electronically transmitted to the third party).

## Is Cryptowerk’s verification API open source?

No. That said, you can also verify your data by directly querying the blockchains on which the super-hash is stored without using the Cryptowerk Seal API.
