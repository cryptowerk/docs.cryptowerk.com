"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _difference2 = _interopRequireDefault(require("lodash/difference"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _createConnector = _interopRequireDefault(require("../core/createConnector"));

var _indexUtils = require("../core/indexUtils");

function getId() {
  return 'configure';
}

var _default = (0, _createConnector.default)({
  displayName: 'AlgoliaConfigure',
  getProvidedProps: function getProvidedProps() {
    return {};
  },
  getSearchParameters: function getSearchParameters(searchParameters, props) {
    var items = (0, _omit2.default)(props, 'children');
    return searchParameters.setQueryParameters(items);
  },
  transitionState: function transitionState(props, prevSearchState, nextSearchState) {
    var id = getId();
    var items = (0, _omit2.default)(props, 'children');
    var nonPresentKeys = this._props ? (0, _difference2.default)((0, _keys2.default)(this._props), (0, _keys2.default)(props)) : [];
    this._props = props;
    var nextValue = (0, _defineProperty2.default)({}, id, (0, _objectSpread2.default)({}, (0, _omit2.default)(nextSearchState[id], nonPresentKeys), items));
    return (0, _indexUtils.refineValue)(nextSearchState, nextValue, this.context);
  },
  cleanUp: function cleanUp(props, searchState) {
    var id = getId();
    var indexId = (0, _indexUtils.getIndexId)(this.context);
    var subState = (0, _indexUtils.hasMultipleIndices)(this.context) && searchState.indices ? searchState.indices[indexId] : searchState;
    var configureKeys = subState && subState[id] ? Object.keys(subState[id]) : [];
    var configureState = configureKeys.reduce(function (acc, item) {
      if (!props[item]) {
        acc[item] = subState[id][item];
      }

      return acc;
    }, {});
    var nextValue = (0, _defineProperty2.default)({}, id, configureState);
    return (0, _indexUtils.refineValue)(searchState, nextValue, this.context);
  }
});

exports.default = _default;