---
title: "Hashing Data"
metaTitle: "FAQ - Hashing Data"
metaDescription: "Cryptowerk FAQ - Hashing Data"
---
## What is a hash function?
A hash is a fixed-size alphanumeric string. The string is called the hash value. Often also seen as a “copy” or “fingerprint” of the original data. Most often a 256 SHA 32-bit algorithm is used which is almost a standard to generate such hashes.

## How do I hash my customers’ data before I send it to Cryptowerk?
There are a variety of open source and public hashing utilities available, including this simple upload-based one. Cryptowerk does not take a stance on which ones to specifically recommend.

## Which hash algorithms do you support?
We recommend the use of SHA-256 (Secure Hashing Algorithm) to generate hashes but also support hashes created by a compatible hashing utility.

💡 If you want to get the hash value for text that is already in your mac  clipboard, run:
```
pbpaste | shasum -a 256
```
