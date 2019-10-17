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
jq is a lightweight and flexible command-line JSON processor. This will make reading the output of the API calls a bit easier. https://stedolan.github.io/jq/download/
- OS X users  [Homebrew](http://brew.sh/)  to install jq with  `brew install jq`
-   Windows users  [Chocolatey NuGet](https://chocolatey.org/)  to install jq 1.5 with  `chocolatey install jq`.

## Environment Variables
Enter each of these commands into the terminal to setup your cURL environment to more easily access the API from the command line:

1. Pick a directory that you have read and write access to.
2. Use your API Key and apiCred (the keys below will not work)

From Terminal enter each of these commands using the directory that you have created and hit enter.

```
cd /Users/kmm/cw-temp

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
| tee /Users/kmm/cw-temp/register.$$.json \
| jq
```

### Register with callback
In this example we are using [requestbin](http://requestbin.com)

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "hashes=2221111111111111111111111111111111111111111111111111111111111111,1112222222222222222222222222222222222222222222222222222222222222,1113333333333333333333333333333333333333333333333333333333333333&callback=http:jsonplain:http://requestbin.fullcontact.com/14nv2lr1" \
$server/API/v5/register \
| tee /Users/kmm/cw-temp/register.$$.json \
| jq
```

### Register with callback using email

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "hashes=2221111111111111111111111111111111111111111111111111111111111111,1112222222222222222222222222222222222222222222222222222222222222,1113333333333333333333333333333333333333333333333333333333333333&callback=email:jsonplain:callbacktest@mailinator.com" $server/API/v5/register \
| tee /Users/kmm/cw-temp/register.$$.json \
| jq

```

### Register with callback using mqtt

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "hashes=2221111111111111111111111111111111111111111111111111111111111111,1112222222222222222222222222222222222222222222222222222222222222,1113333333333333333333333333333333333333333333333333333333333333&callback=mqtt:tcp://mqttcc1.cryptowerk.com:1883;test/topic2;{myCustomId:'someid1'}" \
$server/API/v6/register \
| tee /Users/Dropbox/cw-temp/register.$$.json \
| jq
```

## Polling Examples

###  Verify Doc Integrity by hashing Doc and comparing to a seal (uses data from file written in previous register call)

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "provideInstructions=false&verifyDocHashes=2221111111111111111111111111111111111111111111111111111111111111&seals=$(urlEncode "$(jq --raw-output </Users/kmm/Dropbox/cw-temp/verify.$$.json '.documents[0].seals[0]'${jqStamp})")" \
$server/API/v6/verify \
| jq

```

### Get Seal with retrieval-ID (uses data from file written in previous register call)

```

curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "retrievalId=$(jq --raw-output </Users/kmm/Dropbox/cw-temp/register.$$.json '.documents[0].retrievalId')&provideVerificationInfos=false${sealFormat}" \
$server/API/v6/verify \
| tee /Users/kmm/Dropbox/cw-temp/verify.$$.json \
| jq
```
## Verify Examples

### Verify using a DocHash -- may return a lot of retrieval-IDs and Seals

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "retrievalDocHash=1113333333333333333333333333333333333333333333333333333333333333&provideVerificationInfos=false${sealFormat}" \
$server/API/v6/verify \
| tee /Users/kmm/Dropbox/cw-temp/verify_by_hash.$$.json \
| jq
```
_______
### Register And Then Verify
Register a hash

```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "hashes=1111111111111111111111111111111111111111111111111111111111111111,2222222222222222222222222222222222222222222222222222222222222222,3333333333333333333333333333333333333333333333333333333333333333&lookupInfos=17,18,19" \
$server/API/v6/register \
| tee /tmp/register.$$.json \
| jq
```

Poll for the Seal using retrieval-ID                         
```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "retrievalId=$(jq --raw-output </tmp/register.$$.json '.documents[0].retrievalId')&provideVerificationInfos=true${sealFormat}" \
$server/API/v6/verify \
| tee /tmp/verify.$$.json \
| jq
```

Verify a Hash matches the Seal                         
```
curl -sS --header "X-ApiKey: $apiKey $apiCred" \
--data "provideInstructions=true&verifyDocHashes=1111111111111111111111111111111111111111111111111111111111111111&seals=$(urlEncode "$(jq --raw-output </tmp/verify.$$.json '.documents[0].seals[0]'${jqStamp})")" \
$server/API/v6/verify \
| jq
```
