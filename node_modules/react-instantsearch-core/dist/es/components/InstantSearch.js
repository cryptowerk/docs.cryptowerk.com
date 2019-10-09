import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import createInstantSearchManager from '../core/createInstantSearchManager';

function validateNextProps(props, nextProps) {
  if (!props.searchState && nextProps.searchState) {
    throw new Error("You can't switch <InstantSearch> from being uncontrolled to controlled");
  } else if (props.searchState && !nextProps.searchState) {
    throw new Error("You can't switch <InstantSearch> from being controlled to uncontrolled");
  }
}
/**
 * @description
 * `<InstantSearch>` is the root component of all React InstantSearch implementations.
 * It provides all the connected components (aka widgets) a means to interact
 * with the searchState.
 * @kind widget
 * @name <InstantSearch>
 * @requirements You will need to have an Algolia account to be able to use this widget.
 * [Create one now](https://www.algolia.com/users/sign_up).
 * @propType {string} appId - Your Algolia application id.
 * @propType {string} apiKey - Your Algolia search-only API key.
 * @propType {string} indexName - Main index in which to search.
 * @propType {boolean} [refresh=false] - Flag to activate when the cache needs to be cleared so that the front-end is updated when a change occurs in the index.
 * @propType {object} [algoliaClient] - Provide a custom Algolia client instead of the internal one (deprecated in favor of `searchClient`).
 * @propType {object} [searchClient] - Provide a custom search client.
 * @propType {func} [onSearchStateChange] - Function to be called everytime a new search is done. Useful for [URL Routing](guide/Routing.html).
 * @propType {object} [searchState] - Object to inject some search state. Switches the InstantSearch component in controlled mode. Useful for [URL Routing](guide/Routing.html).
 * @propType {func} [createURL] - Function to call when creating links, useful for [URL Routing](guide/Routing.html).
 * @propType {SearchResults|SearchResults[]} [resultsState] - Use this to inject the results that will be used at first rendering. Those results are found by using the `findResultsState` function. Useful for [Server Side Rendering](guide/Server-side_rendering.html).
 * @propType {number} [stalledSearchDelay=200] - The amount of time before considering that the search takes too much time. The time is expressed in milliseconds.
 * @propType {{ Root: string|function, props: object }} [root] - Use this to customize the root element. Default value: `{ Root: 'div' }`
 * @example
 * import React from 'react';
 * import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
 *
 * const App = () => (
 *   <InstantSearch
 *     appId="latency"
 *     apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *     indexName="instant_search"
 *   >
 *     <SearchBox />
 *     <Hits />
 *   </InstantSearch>
 * );
 */


var InstantSearch =
/*#__PURE__*/
function (_Component) {
  _inherits(InstantSearch, _Component);

  function InstantSearch(props) {
    var _this;

    _classCallCheck(this, InstantSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InstantSearch).call(this, props));
    _this.isControlled = Boolean(props.searchState);
    var initialState = _this.isControlled ? props.searchState : {};
    _this.isUnmounting = false;
    _this.aisManager = createInstantSearchManager({
      indexName: props.indexName,
      searchClient: props.searchClient,
      initialState: initialState,
      resultsState: props.resultsState,
      stalledSearchDelay: props.stalledSearchDelay
    });
    return _this;
  }

  _createClass(InstantSearch, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      validateNextProps(this.props, nextProps);

      if (this.props.indexName !== nextProps.indexName) {
        this.aisManager.updateIndex(nextProps.indexName);
      }

      if (this.props.refresh !== nextProps.refresh) {
        if (nextProps.refresh) {
          this.aisManager.clearCache();
        }
      }

      if (this.props.searchClient !== nextProps.searchClient) {
        this.aisManager.updateClient(nextProps.searchClient);
      }

      if (this.isControlled) {
        this.aisManager.onExternalStateUpdate(nextProps.searchState);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
      this.aisManager.skipSearch();
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      // If not already cached, cache the bound methods so that we can forward them as part
      // of the context.
      if (!this._aisContextCache) {
        this._aisContextCache = {
          ais: {
            onInternalStateUpdate: this.onWidgetsInternalStateUpdate.bind(this),
            createHrefForState: this.createHrefForState.bind(this),
            onSearchForFacetValues: this.onSearchForFacetValues.bind(this),
            onSearchStateChange: this.onSearchStateChange.bind(this),
            onSearchParameters: this.onSearchParameters.bind(this)
          }
        };
      }

      return {
        ais: _objectSpread({}, this._aisContextCache.ais, {
          store: this.aisManager.store,
          widgetsManager: this.aisManager.widgetsManager,
          mainTargetedIndex: this.props.indexName
        })
      };
    }
  }, {
    key: "createHrefForState",
    value: function createHrefForState(searchState) {
      searchState = this.aisManager.transitionState(searchState);
      return this.isControlled && this.props.createURL ? this.props.createURL(searchState, this.getKnownKeys()) : '#';
    }
  }, {
    key: "onWidgetsInternalStateUpdate",
    value: function onWidgetsInternalStateUpdate(searchState) {
      searchState = this.aisManager.transitionState(searchState);
      this.onSearchStateChange(searchState);

      if (!this.isControlled) {
        this.aisManager.onExternalStateUpdate(searchState);
      }
    }
  }, {
    key: "onSearchStateChange",
    value: function onSearchStateChange(searchState) {
      if (this.props.onSearchStateChange && !this.isUnmounting) {
        this.props.onSearchStateChange(searchState);
      }
    }
  }, {
    key: "onSearchParameters",
    value: function onSearchParameters(getSearchParameters, context, props) {
      if (this.props.onSearchParameters) {
        var searchState = this.props.searchState ? this.props.searchState : {};
        this.props.onSearchParameters(getSearchParameters, context, props, searchState);
      }
    }
  }, {
    key: "onSearchForFacetValues",
    value: function onSearchForFacetValues(searchState) {
      this.aisManager.onSearchForFacetValues(searchState);
    }
  }, {
    key: "getKnownKeys",
    value: function getKnownKeys() {
      return this.aisManager.getWidgetsIds();
    }
  }, {
    key: "render",
    value: function render() {
      var childrenCount = Children.count(this.props.children);
      var _this$props$root = this.props.root,
          Root = _this$props$root.Root,
          props = _this$props$root.props;
      if (childrenCount === 0) return null;else return React.createElement(Root, props, this.props.children);
    }
  }]);

  return InstantSearch;
}(Component);

InstantSearch.defaultProps = {
  stalledSearchDelay: 200
};
InstantSearch.propTypes = {
  // @TODO: These props are currently constant.
  indexName: PropTypes.string.isRequired,
  searchClient: PropTypes.object.isRequired,
  createURL: PropTypes.func,
  refresh: PropTypes.bool.isRequired,
  searchState: PropTypes.object,
  onSearchStateChange: PropTypes.func,
  onSearchParameters: PropTypes.func,
  resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
  root: PropTypes.shape({
    Root: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    props: PropTypes.object
  }).isRequired,
  stalledSearchDelay: PropTypes.number
};
InstantSearch.childContextTypes = {
  // @TODO: more precise widgets manager propType
  ais: PropTypes.object.isRequired
};
export default InstantSearch;