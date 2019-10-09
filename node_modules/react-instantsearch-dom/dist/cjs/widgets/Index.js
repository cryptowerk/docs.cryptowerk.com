"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactInstantsearchCore = require("react-instantsearch-core");

var Index = (0, _reactInstantsearchCore.createIndex)({
  Root: 'div',
  props: {
    className: 'ais-MultiIndex__root'
  }
});
var _default = Index;
exports.default = _default;