---
title: "cURL Command Line Helpers for windows"
metaTitle: "cURL Command Line Helpers for Cryptowerk Horizon API - Tutorials"
metaDescription: "Cryptowerk AWS cURL Command Line Helpers - Tutorials"
---
In this tutorial we will setup a few helpful utilities when using cURL from a command line terminal using a windows machine.


### 1. cURL request:
```
.\curl.exe -X POST https://developers.cryptowerk.com/platform/API/v8/register?hashes=1111111111111111111111111111111111111111111111111111111111111111%2C2222222222222222222222222222222222222222222222222222222222222222 -H 'Accept:application/json' -H 'X-API-Key:3Rt2HsLBzpbh50COmNeS9HuJhzQRTKs6MpLw7uhZbcd= Li9Z+kSdllv0VCJj9ccFksxcmCRsNmvVyKYT3Ba6MNA='
```

or
### 2. cURL request using an unquoted comma:
```
.\curl.exe -X POST "https://developers.cryptowerk.com/platform/API/v8/register?hashes=1111111111111111111111111111111111111111111111111111111111111111,2222222222222222222222222222222222222222222222222222222222222222" -H 'Accept:application/json' -H 'X-API-Key:3Rt2HsLBzpbh50COmNeS9HuJhzQRTKs6MpLw7uhZbcd= Li9Z+kSdllv0VCJj9ccFksxcmCRsNmvVyKYT3Ba6MNA='
```


the respond looks like this:
```
{"maxSupportedAPIVersion":8,"documents":[{"retrievalId":"ri3204225ae86239e3d3167151fffaa737fba45ebc6ff165c48494b380d271e16cc"},{"retrievalId":"ri3204226e79ff75ef13f28663f89b2845e5eae825a15221dae87ec6545bd98e053"}],"minSupportedAPIVersion":1}
```

Receiving error message "Missing either apiKey and apiCredential or jwtToken."

If you receive the error message:
```
{"error":"Missing either apiKey and apiCredential or jwtToken."}curl: (6) Could not resolve host: Xy1SYXy1Kx0RGntmsrp9K "
```
There is either a lost letter when pasting the API key or a quoting issue in the Windows shell. The latter would also explain "Could not resolve host: Xy1SYXy1Kx0RGntmsrp9K"
