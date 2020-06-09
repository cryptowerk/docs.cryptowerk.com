---
title: "Hash Data"
metaTitle: "FAQ - Hash Data"
metaDescription: "Cryptowerk FAQ - Hash Data"
---
## What is a hash function?
A hash is a fixed-size alphanumeric string. The string is called the hash value. Often also seen as a “copy” or “fingerprint” of the original data. Most often a SHA-256 which is 256 bits long and equivalent to 32 bytes. This algorithm is a standard when generating a cryptographic hash function. 

## How do I hash my customers’ data before I send it to Cryptowerk?
There are a variety of open source and public hashing utilities available. Cryptowerk does not take a stance on which ones to specifically recommend.

## Which hash algorithms do you support?
We recommend the use of SHA-256 (Secure Hashing Algorithm) to generate hashes but also support hashes created by a compatible hashing utility.

💡 If you want to get the hash value for text that is already in your mac  clipboard, run:
```
pbpaste | shasum -a 256
```
