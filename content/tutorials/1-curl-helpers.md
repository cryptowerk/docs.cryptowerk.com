---
title: "cURL Command Line Helpers"
metaTitle: "cURL Command Line Helpers for Cryptowerk Horizon API - Tutorials"
metaDescription: "Cryptowerk AWS cURL Command Line Helpers - Tutorials"
---
In this tutorial we will setup a few helpful utilities when using cURL from a command line terminal. There are two utilities that help increase productivity when using cURL.

 1. The Jq JSON processor
 2. Environment variables

Below you will find instructions for using both of these utilities with the Cryptowerk Horizon API. To begin open a command line terminal.

## Install Jq
Jq is a lightweight and flexible command-line JSON processor. This will make reading the output of the API calls a bit easier. https://stedolan.github.io/jq/download/
- OS X users  [Homebrew](http://brew.sh/)  to install jq with  `brew install jq`.
-   Windows users  [Chocolatey NuGet](https://chocolatey.org/)  to install jq 1.5 with  `chocolatey install jq`.

## Environment Variables
Enter each of these commands into the terminal to setup your cURL environment to more easily access the API from the command line:

1. Pick a directory that you have read and write access to.
2. Use your API Key and apiCred (the keys below are example keys and will not work for you).

From Terminal enter each of these commands using the directory that you have created and hit enter.

```
mkdir ~/cw-temp
cd ~/cw-temp

function urlEncode() {
data="$(curl -s -o /dev/null -w %{url_effective} --get --data-urlencode "q=$1" "")"
echo "${data##/?q=}"
}
```

```
apiKey="dbQUju7jlMccQJppd4a4sxxx/AadulQxCL6MdYgNgJw="
```

```
apiCred="8H6a0oEtRbkqckTJ6crmxxxwvZILi6v73gsk5bBwbWE="
```

```
sealFormat="&sealFormat=JSON"; jqStamp=""
```

```
server="https://developers.cryptowerk.com/platform"
```



## Register Examples

### Register Hashes

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "hashes=2221111111111111111111111111111111111111111111111111111111111111,1112222222222222222222222222222222222222222222222222222222222222,1113333333333333333333333333333333333333333333333333333333333333&lookupInfos=kmm1,kmm2,kmm3" \
$server/API/v6/register \
| tee ~/cw-temp/register.$$.json \
| jq
```

## Polling Examples

###  Verify the Integrity of a Document by hashing it and comparing it to a Cryptowerk Seal (uses data from file written in previous register call)

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "provideInstructions=false&verifyDocHashes=2221111111111111111111111111111111111111111111111111111111111111&seals=$(urlEncode "$(jq --raw-output <~/cw-temp/verify.$$.json '.documents[0].seals[0]'${jqStamp})")" \
$server/API/v6/verify \
| jq

```

### Get a Seal with the retrieval-ID (uses data from file written in previous register call)

```

curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "retrievalId=$(jq --raw-output <~/cw-temp/register.$$.json '.documents[0].retrievalId')&provideVerificationInfos=false${sealFormat}" \
$server/API/v6/verify \
| tee ~/cw-temp/verify.$$.json \
| jq
```
## Verify Examples

### Verify Data using the parameter DocHash 
This call may return a lot of retrieval-IDs and Seals.

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "retrievalDocHash=1113333333333333333333333333333333333333333333333333333333333333&provideVerificationInfos=false${sealFormat}" \
$server/API/v6/verify \
| tee ~/cw-temp/verify_by_hash.$$.json \
| jq
```
_______
### Register and then Verify
1. Register a hash:

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "hashes=1111111111111111111111111111111111111111111111111111111111111111,2222222222222222222222222222222222222222222222222222222222222222,3333333333333333333333333333333333333333333333333333333333333333&lookupInfos=17,18,19" \
$server/API/v6/register \
| tee /tmp/register.$$.json \
| jq
```

2. Poll for the Seal using retrieval-ID:                         
```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "retrievalId=$(jq --raw-output </tmp/register.$$.json '.documents[0].retrievalId')&provideVerificationInfos=true${sealFormat}" \
$server/API/v6/verify \
| tee /tmp/verify.$$.json \
| jq
```
A more detailed description on this step can be found in the tutorial ["Retrieve Seal - using Verify Call"](https://docs.cryptowerk.com/tutorials/6-retrieve-seal). 

3. Verify a hash with matching Seal                        
```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "provideInstructions=true&verifyDocHashes=1111111111111111111111111111111111111111111111111111111111111111&seals=$(urlEncode "$(jq --raw-output </tmp/verify.$$.json '.documents[0].seals[0]'${jqStamp})")" \
$server/API/v6/verify \
| jq
```
A tutorial on how to verify data with the Crytpowerk Seal can be read in ["Verify - with Seal"](https://docs.cryptowerk.com/tutorials/4-verify-with-Seal).
