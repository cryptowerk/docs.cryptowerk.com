---
title: "LookupInfo"
metaTitle: "FAQ - LookupInfo"
metaDescription: "Cryptowerk FAQ - LookupInfo"
---
## What is a lookupInfo and how is it used?
Through the ***lookupInfo*** you can provide your own information that later helps you looking up your data where you want to put your Seal. This can be any text string.
You will find the ***lookupInfo*** in the Seal, that helps you to look up info in your local database.

## Can the lookupInfo only be used when using callbacks?

No, the ***lookupInfo*** can also be used without a callback. Cryptowerk returns the ***lookupInfo*** in the `/verify` call (only if it was supplied originally in the `/register` call) and in addition it is included in the Seal. You can find the ***lookupInfo*** in the Seal contained in “operations” called “document info”.

## When supplying lookupInfo in register call and not registering for callback is the retrieval-Id still needed for the verify call?

Since you will find the ***lookupInfo*** in the Seal, you can use the Seal parameter in the verify call to supply lookupInfo.
