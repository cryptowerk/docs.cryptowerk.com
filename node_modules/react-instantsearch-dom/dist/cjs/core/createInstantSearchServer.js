"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _zipWith2 = _interopRequireDefault(require("lodash/zipWith"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _react = _interopRequireWildcard(require("react"));

var _server = require("react-dom/server");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _algoliasearchHelper = _interopRequireDefault(require("algoliasearch-helper"));

var _reactInstantsearchCore = require("react-instantsearch-core");

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return (0, _typeof2.default)(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if ((0, _typeof2.default)(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if ((0, _typeof2.default)(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

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
  }, new _algoliasearchHelper.default.SearchParameters((0, _objectSpread4.default)({}, _reactInstantsearchCore.HIGHLIGHT_TAGS, {
    index: indexName
  })));
  var derivedParameters = searchParameters.filter(function (searchParameter) {
    return hasMultipleIndices(searchParameter.context);
  }).reduce(function (acc, searchParameter) {
    var indexId = getIndexId(searchParameter.context);
    return (0, _objectSpread4.default)({}, acc, (0, _defineProperty2.default)({}, indexId, searchParameter.getSearchParameters(acc[indexId] || sharedParameters, searchParameter.props, searchParameter.searchState)));
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
      derivedParameters = (0, _objectWithoutProperties2.default)(_ref, [indexName].map(_toPropertyKey));
  var search = [helper.searchOnce((0, _objectSpread4.default)({}, sharedParameters, mainParameters))];
  var indexIds = Object.keys(derivedParameters);
  search.push.apply(search, (0, _toConsumableArray2.default)(indexIds.map(function (indexId) {
    var parameters = derivedParameters[indexId];
    return (0, _algoliasearchHelper.default)(client, parameters.index).searchOnce(parameters);
  })));
  return Promise.all(search).then(function (results) {
    return (0, _zipWith2.default)([indexName].concat((0, _toConsumableArray2.default)(indexIds)), results, function (indexId, result) {
      return (// We attach `indexId` on the results to be able to reconstruct the
        // object client side. We cannot rely on `state.index` anymore because
        // we may have multiple times the same index.
        (0, _objectSpread4.default)({}, result, {
          _internalIndexId: indexId
        })
      );
    });
  });
};

var createInstantSearchServer = function createInstantSearchServer(algoliasearch) {
  var InstantSearch = (0, _reactInstantsearchCore.createInstantSearch)(algoliasearch, {
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
    (0, _server.renderToString)(_react.default.createElement(App, props));

    var _getSearchParameters = getSearchParameters(indexName, searchParameters),
        sharedParameters = _getSearchParameters.sharedParameters,
        derivedParameters = _getSearchParameters.derivedParameters;

    var helper = (0, _algoliasearchHelper.default)(client, sharedParameters.index);

    if ((0, _isEmpty2.default)(derivedParameters)) {
      return singleIndexSearch(helper, sharedParameters);
    }

    return multiIndexSearch(indexName, client, helper, sharedParameters, derivedParameters);
  };

  var CreateInstantSearchServer =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(CreateInstantSearchServer, _Component);

    function CreateInstantSearchServer() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, CreateInstantSearchServer);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CreateInstantSearchServer)).call.apply(_getPrototypeOf2, [this].concat(args)));

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
        client.addAlgoliaAgent("react (".concat(_react.default.version, ")"));
        client.addAlgoliaAgent("react-instantsearch (".concat(_reactInstantsearchCore.version, ")"));
      }

      indexName = _this.props.indexName;
      return _this;
    }

    (0, _createClass2.default)(CreateInstantSearchServer, [{
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
            return (0, _objectSpread4.default)({}, acc, (0, _defineProperty2.default)({}, result._internalIndexId, new _algoliasearchHelper.default.SearchResults(new _algoliasearchHelper.default.SearchParameters(result.state), result._originalResponse.results)));
          }, {});
        }

        return new _algoliasearchHelper.default.SearchResults(new _algoliasearchHelper.default.SearchParameters(resultsState.state), resultsState._originalResponse.results);
      }
    }, {
      key: "render",
      value: function render() {
        var resultsState = this.hydrateResultsState();
        return _react.default.createElement(InstantSearch, (0, _extends2.default)({}, this.props, {
          resultsState: resultsState,
          onSearchParameters: this.onSearchParameters
        }));
      }
    }]);
    return CreateInstantSearchServer;
  }(_react.Component);

  (0, _defineProperty2.default)(CreateInstantSearchServer, "propTypes", {
    algoliaClient: _propTypes.default.object,
    searchClient: _propTypes.default.object,
    appId: _propTypes.default.string,
    apiKey: _propTypes.default.string,
    indexName: _propTypes.default.string.isRequired,
    resultsState: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array])
  });
  return {
    InstantSearch: CreateInstantSearchServer,
    findResultsState: findResultsState
  };
};

var _default = createInstantSearchServer;
exports.default = _default;