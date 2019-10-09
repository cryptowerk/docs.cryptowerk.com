"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lite = _interopRequireDefault(require("algoliasearch/lite"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var InstantSearch = (0, _reactInstantsearchCore.createInstantSearch)(_lite.default, {
  Root: 'div',
  props: {
    className: 'ais-InstantSearch__root'
  }
});
var _default = InstantSearch;
exports.default = _default;