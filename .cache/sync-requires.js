const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-docs-js": hot(preferDefault(require("/Users/kmm/Dropbox/aws/CW-Repo-Commit/docs.cryptowerk.com/src/templates/docs.js")))
}

