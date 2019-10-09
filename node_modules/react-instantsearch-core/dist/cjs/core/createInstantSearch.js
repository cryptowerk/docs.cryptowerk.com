"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInstantSearch;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InstantSearch = _interopRequireDefault(require("../components/InstantSearch"));

var _version = _interopRequireDefault(require("./version"));

/**
 * Creates a specialized root InstantSearch component. It accepts
 * an algolia client and a specification of the root Element.
 * @param {function} defaultAlgoliaClient - a function that builds an Algolia client
 * @param {object} root - the defininition of the root of an InstantSearch sub tree.
 * @returns {object} an InstantSearch root
 */
function createInstantSearch(defaultAlgoliaClient, root) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(CreateInstantSearch, _Component);

    function CreateInstantSearch() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, CreateInstantSearch);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CreateInstantSearch)).call.apply(_getPrototypeOf2, [this].concat(args)));

      if (_this.props.searchClient) {
        if (_this.props.appId || _this.props.apiKey || _this.props.algoliaClient) {
          throw new Error('react-instantsearch:: `searchClient` cannot be used with `appId`, `apiKey` or `algoliaClient`.');
        }
      }

      if (_this.props.algoliaClient) {
        // eslint-disable-next-line no-console
        console.warn('`algoliaClient` option was renamed `searchClient`. Please use this new option before the next major version.');
      }

      _this.client = _this.props.searchClient || _this.props.algoliaClient || defaultAlgoliaClient(_this.props.appId, _this.props.apiKey, {
        _useRequestCache: true
      });

      if (typeof _this.client.addAlgoliaAgent === 'function') {
        _this.client.addAlgoliaAgent("react (".concat(_react.default.version, ")"));

        _this.client.addAlgoliaAgent("react-instantsearch (".concat(_version.default, ")"));
      }

      return _this;
    }

    (0, _createClass2.default)(CreateInstantSearch, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var props = this.props;

        if (nextProps.searchClient) {
          this.client = nextProps.searchClient;
        } else if (nextProps.algoliaClient) {
          this.client = nextProps.algoliaClient;
        } else if (props.appId !== nextProps.appId || props.apiKey !== nextProps.apiKey) {
          this.client = defaultAlgoliaClient(nextProps.appId, nextProps.apiKey);
        }

        if (typeof this.client.addAlgoliaAgent === 'function') {
          this.client.addAlgoliaAgent("react (".concat(_react.default.version, ")"));
          this.client.addAlgoliaAgent("react-instantsearch (".concat(_version.default, ")"));
        }
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(_InstantSearch.default, {
          createURL: this.props.createURL,
          indexName: this.props.indexName,
          searchState: this.props.searchState,
          onSearchStateChange: this.props.onSearchStateChange,
          onSearchParameters: this.props.onSearchParameters,
          root: this.props.root,
          searchClient: this.client,
          algoliaClient: this.client,
          refresh: this.props.refresh,
          resultsState: this.props.resultsState
        }, this.props.children);
      }
    }]);
    return CreateInstantSearch;
  }(_react.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    algoliaClient: _propTypes.default.object,
    searchClient: _propTypes.default.object,
    appId: _propTypes.default.string,
    apiKey: _propTypes.default.string,
    children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
    indexName: _propTypes.default.string.isRequired,
    createURL: _propTypes.default.func,
    searchState: _propTypes.default.object,
    refresh: _propTypes.default.bool.isRequired,
    onSearchStateChange: _propTypes.default.func,
    onSearchParameters: _propTypes.default.func,
    resultsState: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
    root: _propTypes.default.shape({
      Root: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.object]).isRequired,
      props: _propTypes.default.object
    })
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    refresh: false,
    root: root
  }), _temp;
}