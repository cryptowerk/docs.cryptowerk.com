import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _zipWith from "lodash/zipWith";
import _isEmpty from "lodash/isEmpty";

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import algoliasearchHelper from 'algoliasearch-helper';
import { createInstantSearch, version, HIGHLIGHT_TAGS } from 'react-instantsearch-core';

var getIndexId = function getIndexId(context) {
  return context && context.multiIndexContext ? context.multiIndexContext.targetedIndex : context.ais.mainTargetedIndex;
};

var hasMultipleIndices = function hasMultipleIndices(context) {
  return context && context.multiIndexContext;
};

var getSearchParameters = function getSearchParameters(indexName, searchParameters) {
  var sharedParameters = searchParameters.filter(function (searchParameter) {
    return !hasMultipleIndices(searchParameter.context);
  }).reduce(function (acc, searchParameter) {
    return searchParameter.getSearchParameters(acc, searchParameter.props, searchParameter.searchState);
  }, new algoliasearchHelper.SearchParameters(_objectSpread({}, HIGHLIGHT_TAGS, {
    index: indexName
  })));
  var derivedParameters = searchParameters.filter(function (searchParameter) {
    return hasMultipleIndices(searchParameter.context);
  }).reduce(function (acc, searchParameter) {
    var indexId = getIndexId(searchParameter.context);
    return _objectSpread({}, acc, _defineProperty({}, indexId, searchParameter.getSearchParameters(acc[indexId] || sharedParameters, searchParameter.props, searchParameter.searchState)));
  }, {});
  return {
    sharedParameters: sharedParameters,
    derivedParameters: derivedParameters
  };
};

var singleIndexSearch = function singleIndexSearch(helper, parameters) {
  return helper.searchOnce(parameters);
};

var multiIndexSearch = function multiIndexSearch(indexName, client, helper, sharedParameters, _ref) {
  var mainParameters = _ref[indexName],
      derivedParameters = _objectWithoutProperties(_ref, [indexName].map(_toPropertyKey));

  var search = [helper.searchOnce(_objectSpread({}, sharedParameters, mainParameters))];
  var indexIds = Object.keys(derivedParameters);
  search.push.apply(search, _toConsumableArray(indexIds.map(function (indexId) {
    var parameters = derivedParameters[indexId];
    return algoliasearchHelper(client, parameters.index).searchOnce(parameters);
  })));
  return Promise.all(search).then(function (results) {
    return _zipWith([indexName].concat(_toConsumableArray(indexIds)), results, function (indexId, result) {
      return (// We attach `indexId` on the results to be able to reconstruct the
        // object client side. We cannot rely on `state.index` anymore because
        // we may have multiple times the same index.
        _objectSpread({}, result, {
          _internalIndexId: indexId
        })
      );
    });
  });
};

var createInstantSearchServer = function createInstantSearchServer(algoliasearch) {
  var InstantSearch = createInstantSearch(algoliasearch, {
    Root: 'div',
    props: {
      className: 'ais-InstantSearch__root'
    }
  });
  var client = null;
  var indexName = '';
  var searchParameters = [];

  var findResultsState = function findResultsState(App, props) {
    searchParameters = [];
    renderToString(React.createElement(App, props));

    var _getSearchParameters = getSearchParameters(indexName, searchParameters),
        sharedParameters = _getSearchParameters.sharedParameters,
        derivedParameters = _getSearchParameters.derivedParameters;

    var helper = algoliasearchHelper(client, sharedParameters.index);

    if (_isEmpty(derivedParameters)) {
      return singleIndexSearch(helper, sharedParameters);
    }

    return multiIndexSearch(indexName, client, helper, sharedParameters, derivedParameters);
  };

  var CreateInstantSearchServer =
  /*#__PURE__*/
  function (_Component) {
    _inherits(CreateInstantSearchServer, _Component);

    function CreateInstantSearchServer() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, CreateInstantSearchServer);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreateInstantSearchServer)).call.apply(_getPrototypeOf2, [this].concat(args)));

      if (_this.props.searchClient) {
        if (_this.props.appId || _this.props.apiKey || _this.props.algoliaClient) {
          throw new Error('react-instantsearch:: `searchClient` cannot be used with `appId`, `apiKey` or `algoliaClient`.');
        }
      }

      if (_this.props.algoliaClient) {
        // eslint-disable-next-line no-console
        console.warn('`algoliaClient` option was renamed `searchClient`. Please use this new option before the next major version.');
      }

      client = _this.props.searchClient || _this.props.algoliaClient || algoliasearch(_this.props.appId, _this.props.apiKey);

      if (typeof client.addAlgoliaAgent === 'function') {
        client.addAlgoliaAgent("react (".concat(React.version, ")"));
        client.addAlgoliaAgent("react-instantsearch (".concat(version, ")"));
      }

      indexName = _this.props.indexName;
      return _this;
    }

    _createClass(CreateInstantSearchServer, [{
      key: "onSearchParameters",
      value: function onSearchParameters(getWidgetSearchParameters, context, props, searchState) {
        searchParameters.push({
          getSearchParameters: getWidgetSearchParameters,
          index: getIndexId(context),
          context: context,
          props: props,
          searchState: searchState
        });
      }
    }, {
      key: "hydrateResultsState",
      value: function hydrateResultsState() {
        var _this$props$resultsSt = this.props.resultsState,
            resultsState = _this$props$resultsSt === void 0 ? [] : _this$props$resultsSt;

        if (Array.isArray(resultsState)) {
          return resultsState.reduce(function (acc, result) {
            return _objectSpread({}, acc, _defineProperty({}, result._internalIndexId, new algoliasearchHelper.SearchResults(new algoliasearchHelper.SearchParameters(result.state), result._originalResponse.results)));
          }, {});
        }

        return new algoliasearchHelper.SearchResults(new algoliasearchHelper.SearchParameters(resultsState.state), resultsState._originalResponse.results);
      }
    }, {
      key: "render",
      value: function render() {
        var resultsState = this.hydrateResultsState();
        return React.createElement(InstantSearch, _extends({}, this.props, {
          resultsState: resultsState,
          onSearchParameters: this.onSearchParameters
        }));
      }
    }]);

    return CreateInstantSearchServer;
  }(Component);

  _defineProperty(CreateInstantSearchServer, "propTypes", {
    algoliaClient: PropTypes.object,
    searchClient: PropTypes.object,
    appId: PropTypes.string,
    apiKey: PropTypes.string,
    indexName: PropTypes.string.isRequired,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  });

  return {
    InstantSearch: CreateInstantSearchServer,
    findResultsState: findResultsState
  };
};

export default createInstantSearchServer;