const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://docs-cryptowerk-sandbox.netlify.com/",
		"gaTrackingId": "UA-104006776-1"
	},
	"header": {
		"logo": "https://cryptowerk.com",
		"logoLink": "https://cryptowerk.com",
		"title": "Docs",
		"githubUrl": "https://github.com/cryptowerk/docs.cryptowerk.com",
		"helpUrl": "https://join.slack.com/t/cryptowerk-community/shared_invite/enQtNTM5MzE4MDE0ODU0LWU4ZmFkYzAwOTc0ODk0NDExYjM2NjAzNTFmZTAwNDliMGFkYmUyN2UzNjVjN2M2MjAzZmY0OTNkMTBhMGY3M2E",
		"tweetText": "I'm learning how to seal digital assets with @cryptowerkcorp",
		"links": [
			/* { "text": "Login", "link": "https://developers.cryptowerk.com/platform/portal/index.html", "setColor": "btn btn-primary"} */
			{ "text": "Get API Key", "link": "https://developers.cryptowerk.com/platform/permalink/sealapisignuptrial", "setColor": "btn btn-danger" }
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
			{"text": "User Guide", "link": "https://developers.cryptowerk.com/platform/permalink/sealapiguide"},
		  { "text": "Git Repository", "link": "https://github.com/cryptowerk"},
			{ "text": "Cryptowerk.com", "link": "https://cryptowerk.com"}],
		"frontline": false,  //KMM what does this do??
		"ignoreIndex": false,
	},
	"siteMetadata": {
		"title": "Developer Knowledge Base | Cryptowerk",
		"description": "Documentation built with mdx and Gatsby. Powering docs.cryptowerk.com ",
		"ogImage": "https://cryptowerk.com",
		"docsLocation": "https://github.com/cryptowerk/docs.cryptowerk.com/tree/master/content",
		"favicon": "https://gn680kq70q1w32f915vk8a75-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/cryptowerk-favicon-1.png"
	},
};

module.exports = config;
