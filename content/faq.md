---
title: "FAQ"
metaTitle: "FAQ Overview"
metaDescription: "Cryptowerk FAQ - Overview"
---

## How does Cryptowerk’s service work?
Cryptowerk Horizon™ is an API or micro service that runs on the AWS cloud. Cryptowerk stores hashes (in fact a hash of hashes, called “super-hash”) into blockchains – it does not store original customer data into blockchains. This provides the highest possible security, efficiency, and ease of implementation.

To submit information to Cryptowerk, the requester hashes any digital asset such as a performed transaction or file and send it to Cryptowerk’s server via a REST API.

Once Cryptowerk receives the hash, a ticket number is sent back to the customer which confirms receipt. Cryptowerk bundles the collected hashes and creates a single super-hash. This super-hash is then written into the Bitcoin and Ethereum blockchain. Cryptowerk writes by default into the Bitcoin and Ethereum blockchain. Once a blockchain confirms a particular transaction, Cryptowerk returns to the customer one Seal for each original hash on demand. Seals allow customers to demonstrate irrefutable proof of existence and authenticity directly in respective blockchains. At any later date the customer can verify the integrity of their data directly by querying the blockchains to which their hashes were written.

## What can Cryptowerk Horizon Do for my Business?
At the highest level, Cryptowerk Horizon gives organizations confidence that their data and digital assets haven’t been altered or tampered with since their original creation, or alternatively alerts them if the current data no longer matches the original data. This enables many scenarios for exchanging and securing data, both within one organization and among many organizations.

Key capabilities of Cryptowerk Horizon include:

- Scalability: Seal and verify up to 1 million digital assets per second.

- Reduced Cost: Cryptowerk charges based on the number of transactions at a cost less than 100x the typical cost of public blockchain transactions.

- Secure: No sensitive data is transferred to Cryptowerk, only hashes or digital fingerprints are written to the blockchain.

- Maximized level of trust: Cryptowerk writes as a standard to Bitcoin and Ethereum blockchain, maximizing the number of decentralized nodes.

- Interoperability: Customers can choose specific blockchains from our set of blockchain adaprters and can easily migrate from one blockchain to another. Cryptowerk’s API allows users to extend or switch to between blockchains.

- Easy Integration: Cryptowerk’s API integrates easily with existing applications, business systems and processes.

- Simplicity: No digital wallet (to pay for public blockchain transactions) or blockchain expertise is required to use Cryptowerk Horizon.

- Fully Auditable: Each blockchain record contains authorship/origin and audit trail. Digital assets can be sealed using public blockchain signatures for data integrity verification.

## I want to release an open source product that leverages the Cryptowerk service. Can I do that?
The Cryptowerk Horizon API is designed and available as a REST API that can be called from within custom or commercial software applications (on-premise or cloud). Those applications can be proprietary, commercial, or open source. Customers don’t have access to the underlying Cryptowerk Seal code, but rather write to the API based on our easy-to-use documentation.

## Does Cryptowerk has its own blockchain?
No. Cryptowerk doesn’t have its own blockchain. One of Cryptowerk’s web services are the blockchain adapters. These adapters can connect to any blockchain or distributed ledger technology (DLT) by customer request. This service makes Cryptowerk’s technology interoperable, where system can easily be migrated from one blockchain to another. The API allows users to extend or switch to other blockchains by request. If you do not see the chain you would like to use Cryptowerk’s service with, please contact our support team at support@cryptowerk.com.

## What blockchains does Cryptowerk Horizon support?
The standard Cryptowerk Horizon subscription offering supports sealing into Bitcoin and Ethereum blockchain by default. For custom configurations, Cryptowerk also supports the most popular and widely used blockchains and distributed ledgers, including Bitcoin, Ethereum, Hyperledger, Multichain, SAP Blockchain-as-a-Service, Hedera Hashgraph, and many others. We are continually adding support for additional blockchains and can support other blockchains by customer request. For specific blockchain integration requests, please contact us via support@cryptowerk.com.

## Are there different prices per transaction depending on the blockchain in use?
If you are requesting a new blockchain adaption, please contact our sales team for pricing sales@cryptowerk.com.

## What is a REST API?
Representational State Transfer (REST) is a software architectural style that defines a set of constraints to be used for creating web services. Web services that conform to the REST architectural style, or RESTful web services, provide interoperability between computer systems on the Internet.

## Your technology sounds complicated. How complicated is it to me?
As you only need to send us hashes of your and/or your customers’ data through a REST API, Cryptowerk’s technology is very simple for the customer to use and to implement. At no time does Cryptowerk see or have access to the original data.


## If I send Seals to my customers/client for verification, do they have to have an account with Cryptowerk to verify the data?
No, the customers can verify the integrity of the data as long as they have:

- A copy of the original data
- The Seal that the Cryptowerk Horizon API created and returned at the time of writing the data to the blockchain.
- An SHA-256 hashing utility (or the same hashing utility used in the original has creation) to re-hash the original data.

## Where is my data and my customers data stored?
Cryptowerk never receives or sees your or your customer’s data, documents, or digital assets. You can store and maintain your data wherever you want, including PC’s, in-house servers, network storage, document repositories, or cloud storage systems.

## Which Cloud Service does Cryptowerk Horizon use?
Cryptowerk Horizon operates on AWS servers. However, we can deploy our service on other cloud services provider for customers’ convenience.
