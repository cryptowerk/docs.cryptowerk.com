import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InstantSearch from '../components/InstantSearch';
import version from './version';
/**
 * Creates a specialized root InstantSearch component. It accepts
 * an algolia client and a specification of the root Element.
 * @param {function} defaultAlgoliaClient - a function that builds an Algolia client
 * @param {object} root - the defininition of the root of an InstantSearch sub tree.
 * @returns {object} an InstantSearch root
 */

export default function createInstantSearch(defaultAlgoliaClient, root) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(CreateInstantSearch, _Component);

    function CreateInstantSearch() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, CreateInstantSearch);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreateInstantSearch)).call.apply(_getPrototypeOf2, [this].concat(args)));

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
        _this.client.addAlgoliaAgent("react (".concat(React.version, ")"));

        _this.client.addAlgoliaAgent("react-instantsearch (".concat(version, ")"));
      }

      return _this;
    }

    _createClass(CreateInstantSearch, [{
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
          this.client.addAlgoliaAgent("react (".concat(React.version, ")"));
          this.client.addAlgoliaAgent("react-instantsearch (".concat(version, ")"));
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(InstantSearch, {
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
  }(Component), _defineProperty(_class, "propTypes", {
    algoliaClient: PropTypes.object,
    searchClient: PropTypes.object,
    appId: PropTypes.string,
    apiKey: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    indexName: PropTypes.string.isRequired,
    createURL: PropTypes.func,
    searchState: PropTypes.object,
    refresh: PropTypes.bool.isRequired,
    onSearchStateChange: PropTypes.func,
    onSearchParameters: PropTypes.func,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    root: PropTypes.shape({
      Root: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired,
      props: PropTypes.object
    })
  }), _defineProperty(_class, "defaultProps", {
    refresh: false,
    root: root
  }), _temp;
}