"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstantSearch = void 0;

var _lite = _interopRequireDefault(require("algoliasearch/lite"));

var _createInstantSearchServer = _interopRequireDefault(require("./core/createInstantSearchServer"));

var createInstantSearch = function createInstantSearch() {
  return (0, _createInstantSearchServer.default)(_lite.default);
};

exports.createInstantSearch = createInstantSearch;