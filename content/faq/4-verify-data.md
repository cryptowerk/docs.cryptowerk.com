---
title: "Verify Data"
metaTitle: "FAQ - Verify Data"
metaDescription: "Cryptowerk FAQ - Verify Data"
---
## What is the process for validating sealed data with Cryptowerk?

You can use the verify API call in your application to allow you or any third party to check registration status of previously registered hashes or verify a previously issued seal.

## Is Cryptowerk’s verification API open source?

No. That said, you can also verify your data by directly querying the blockchains on which the super-hash is stored without using the Cryptowerk Horizon API.

## If I lose the Seal, can I restore it from your database?

No. Your application writes your hashes to the Cryptowerk Horizon API, in which they are re-hashed, a hash link is created and written into blockchains. At this point, for greater security, the retrieval-ID, anchor and Seal are removed from the Cryptowerk database, so Cryptowerk no longer has access to your hashes or the Seals.

## If I send a Seal to third parties for later verification, how do they know which original data it is referring to?

The whole purpose of sealing data is to be able to later verify that data has remained unchanged since a specific time. Therefore, the third party must have access to the original data to be verified, though it doesn’t need to reside in its original location (i.e. it can be emailed or otherwise electronically transmitted to the third party).
