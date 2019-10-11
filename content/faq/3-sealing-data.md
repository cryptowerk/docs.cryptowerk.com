---
title: "Sealing Data"
metaTitle: "FAQ - Sealing Data"
metaDescription: "Cryptowerk FAQ - Sealing Data"
---
## What is “sealing” a document or piece of data?  What does that do for my customers?
The Sealing of a document or other piece of data starts with the creation of the digital equivalent of a fingerprint of that data by creating a hash of the data, using most often a 256 SHA 32-bit algorithm. Just as fingerprints are unique, so hashes are unique to their original data. These hashes are then passed on (through a REST API) to Cryptowerk. For increased security and efficiency, Cryptowerk processes these hashes into bundles and generates a “hash of hashes” (super-hash) which then are stored in the blockchains. For each of the hashes received, Cryptowerk returns a “Seal” back to you. The data is now successfully “sealed”. Such a Seal is specific to each hash and contains information about the hash and the link to the blockchains. Cryptowerk recommends that you store these Seals with your original data.

If you want to proof that the data are still “original”, and not changed, altered or manipulated, then, at any given time in the future, you re-hash the original data and “compare” them with the Seal. Such “comparison” would result in a super-hash which one can or cannot find being stored in the blockchains. In the intended case the super-hash is indeed in the blockchain, one has obtained the proof that the original data has not been tampered with. If the data have been changed or are manipulated, then the re-hashed data, combined with the Seal will not generate a super-hash that was written into the blockchains. Cryptowerk Horizon gives you confidence that the data has not been inadvertently or deliberately been changed.

## What does the Seal include?
A Seal contains the information required to prove that a document had been registered in a blockchain. Among other things, it contains a (transaction) identifier in one or multiple blockchains, the hash of a document, the conclusive mathematical proof linking the document to the blockchain demonstrating the document's existence at registration time and it not having been tampered with, the time this document was submitted to the server and the time it was submitted to the blockchain. You will also find the lookupInfo in the Seal, that helps you to look up info in your local database.

## Explain to me how Cryptowerk “queues” my requests?
Hashes are queued on a first-in/first-out basis and submitted to the Cryptowerk Horizon API to be re-hashed and anchored in blockchains on our regular schedule.

## If I lose the Seal, can I restore it from your database?
No. Your application writes your hashes to the Cryptowerk Horizon API, in which they are re-hashed, a hash link is created and written into blockchains. At this point, for greater security, the ticket number, anchor and Seal are removed from the Cryptowerk database, so Cryptowerk no longer has access to your hashes or the Seals.

## How do I hash my customers’ data before I send it to Cryptowerk?
There are a variety of open source and public hashing utilities available, including this simple upload-based one. Cryptowerk does not take a stance on which ones to specifically recommend.

## I want to release an open source product that leverages the Cryptowerk service. Can I do that?
The Cryptowerk Horizon API is designed and available as a REST API that can be called from within custom or commercial software applications (on-premise or cloud). Those applications can be proprietary, commercial, or open source. Customers don’t have access to the underlying Cryptowerk Seal code, but rather write to the API based on our easy-to-use documentation.

## When you write into multiple blockchains, do I get a Seal for each blockchain?
You will receive one Seal for the hash you have submitted. If the hash is written into several blockchains you will receive one Seal that shows several "proofs". Proofs show in which blockchains the hash was written.

## If I send a Seal to third parties for later verification, how do they know which original data it is referring to?
The whole purpose of Sealing data is to be able to later verify that data has remained unchanged since a specific time. Therefore, the third party must have access to the original data to be verified, though it doesn’t need to reside in its original location (i.e., it can be emailed or otherwise electronically transmitted to the third party).

## Explain to me how Cryptowerk “queues” my requests?
Hashes are queued on a first-in/first-out basis and submitted to the Cryptowerk Horizon API to be re-hashed and anchored in blockchains on our regular schedule.

## How scalable is Cryptowerk Horizon?
Because of our unique and patented sealing algorithms, we’re currently able to receive up to one million hashes per second and write them into any supported blockchain. That compares to the native limits of seven transactions per second for Bitcoin, and 15 transactions per second for Ethereum.

## How many transactions can Cryptowerk Horizon handle per second?
Cryptowerk Horizon can process up to one million hashes per second. Any excess transactions are queued and addressed as quickly as possible.

## When you write into multiple blockchains, do I get a Seal for each blockchain?
You will receive one Seal for the hash you have submitted. If the hash is written into several blockchains you will receive one Seal that shows several "proofs". Proofs show in which blockchains the hash was written.

## Are my Seals private?
Yes. Only the party who has sent hashes to the Cryptowerk Seal API will receive a unique Seal for each hash back. Cryptowerk will not share Seals with any third party, unless this is requested by the customers.
