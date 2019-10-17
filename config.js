const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://docs-cryptowerk-sandbox.netlify.com/",
		"gaTrackingId": "UA-104006776-1"
	},
	"header": {
		"logo": "https://developers.cryptowerk.com/platform/image/portal/Cryptowerk.png",
		"logoLink": "https://developers.cryptowerk.com/platform/portal/index.html",
		"title": "Docs",
		"githubUrl": "https://github.com/cryptowerk/docs.cryptowerk.com",
		"helpUrl": "https://join.slack.com/t/cryptowerk-community/shared_invite/enQtNTM5MzE4MDE0ODU0LWU4ZmFkYzAwOTc0ODk0NDExYjM2NjAzNTFmZTAwNDliMGFkYmUyN2UzNjVjN2M2MjAzZmY0OTNkMTBhMGY3M2E",
		"tweetText": "I'm learning how to seal digital assets with @cryptowerkcorp",
		"links": [
			/* using this for Get API Key Button -important only 1 entry in array */
			{ "text": "Get API Key", "link": "https://developers.cryptowerk.com/platform/permalink/sealapisignuptrial", "setColor": "btn btn-primary" }
		],
		"search": {
			"enabled": false,
			"indexName": "",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
					"/index",
					"/quickstart",
					"/tutorials",
					"/faq",
					"/support"
				],
		"links": [
			{ "text": "App Console", "link": "https://developers.cryptowerk.com/platform/portal/index.html"},
			{ "text": "API Explorer", "link": "https://developers.cryptowerk.com/platform/portal/swagger.html"},
				{ "text": "Cryptowerk.com", "link": "https://cryptowerk.com"},
		  { "text": "Git Repository", "link": "https://github.com/cryptowerk"}],
		"frontline": false,  //KMM what does this do??
		"ignoreIndex": false,
	},
	"siteMetadata": {
		"title": "Developer Knowledge Base | Cryptowerk",
		"description": "Documentation built with mdx and Gatsby. Powering docs.cryptowerk.com ",
		"ogImage": "https://developers.cryptowerk.com/platform/image/portal/Cryptowerk.png",
		"docsLocation": "https://github.com/cryptowerk/docs.cryptowerk.com/tree/master/content",
		"favicon": "https://gn680kq70q1w32f915vk8a75-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/cryptowerk-favicon-1.png"
	},
};

module.exports = config;
