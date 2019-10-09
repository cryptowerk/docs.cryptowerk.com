"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInstantSearchManager;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _algoliasearchHelper = _interopRequireDefault(require("algoliasearch-helper"));

var _createWidgetsManager = _interopRequireDefault(require("./createWidgetsManager"));

var _createStore = _interopRequireDefault(require("./createStore"));

var _highlight = require("./highlight");

var _indexUtils = require("./indexUtils");

var isMultiIndexContext = function isMultiIndexContext(widget) {
  return (0, _indexUtils.hasMultipleIndices)(widget.context);
};

var isTargetedIndexEqualIndex = function isTargetedIndexEqualIndex(widget, indexId) {
  return widget.context.multiIndexContext.targetedIndex === indexId;
}; // Relying on the `indexId` is a bit brittle to detect the `Index` widget.
// Since it's a class we could rely on `instanceof` or similar. We never
// had an issue though. Works for now.


var isIndexWidget = function isIndexWidget(widget) {
  return Boolean(widget.props.indexId);
};

var isIndexWidgetEqualIndex = function isIndexWidgetEqualIndex(widget, indexId) {
  return widget.props.indexId === indexId;
};
/**
 * Creates a new instance of the InstantSearchManager which controls the widgets and
 * trigger the search when the widgets are updated.
 * @param {string} indexName - the main index name
 * @param {object} initialState - initial widget state
 * @param {object} SearchParameters - optional additional parameters to send to the algolia API
 * @param {number} stalledSearchDelay - time (in ms) after the search is stalled
 * @return {InstantSearchManager} a new instance of InstantSearchManager
 */


function createInstantSearchManager(_ref) {
  var indexName = _ref.indexName,
      _ref$initialState = _ref.initialState,
      initialState = _ref$initialState === void 0 ? {} : _ref$initialState,
      searchClient = _ref.searchClient,
      resultsState = _ref.resultsState,
      stalledSearchDelay = _ref.stalledSearchDelay;
  var helper = (0, _algoliasearchHelper.default)(searchClient, indexName, (0, _objectSpread4.default)({}, _highlight.HIGHLIGHT_TAGS));
  helper.on('search', handleNewSearch).on('result', handleSearchSuccess({
    indexId: indexName
  })).on('error', handleSearchError);
  var skip = false;
  var stalledSearchTimer = null;
  var initialSearchParameters = helper.state;
  var widgetsManager = (0, _createWidgetsManager.default)(onWidgetsUpdate);
  var store = (0, _createStore.default)({
    widgets: initialState,
    metadata: [],
    results: resultsState || null,
    error: null,
    searching: false,
    isSearchStalled: true,
    searchingForFacetValues: false
  });

  function skipSearch() {
    skip = true;
  }

  function updateClient(client) {
    helper.setClient(client);
    search();
  }

  function clearCache() {
    helper.clearCache();
    search();
  }

  function getMetadata(state) {
    return widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getMetadata);
    }).map(function (widget) {
      return widget.getMetadata(state);
    });
  }

  function getSearchParameters() {
    var sharedParameters = widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getSearchParameters);
    }).filter(function (widget) {
      return !isMultiIndexContext(widget) && !isIndexWidget(widget);
    }).reduce(function (res, widget) {
      return widget.getSearchParameters(res);
    }, initialSearchParameters);
    var mainParameters = widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getSearchParameters);
    }).filter(function (widget) {
      var targetedIndexEqualMainIndex = isMultiIndexContext(widget) && isTargetedIndexEqualIndex(widget, indexName);
      var subIndexEqualMainIndex = isIndexWidget(widget) && isIndexWidgetEqualIndex(widget, indexName);
      return targetedIndexEqualMainIndex || subIndexEqualMainIndex;
    }).reduce(function (res, widget) {
      return widget.getSearchParameters(res);
    }, sharedParameters);
    var derivedIndices = widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getSearchParameters);
    }).filter(function (widget) {
      var targetedIndexNotEqualMainIndex = isMultiIndexContext(widget) && !isTargetedIndexEqualIndex(widget, indexName);
      var subIndexNotEqualMainIndex = isIndexWidget(widget) && !isIndexWidgetEqualIndex(widget, indexName);
      return targetedIndexNotEqualMainIndex || subIndexNotEqualMainIndex;
    }).reduce(function (indices, widget) {
      var indexId = isMultiIndexContext(widget) ? widget.context.multiIndexContext.targetedIndex : widget.props.indexId;
      var widgets = indices[indexId] || [];
      return (0, _objectSpread4.default)({}, indices, (0, _defineProperty2.default)({}, indexId, widgets.concat(widget)));
    }, {});
    var derivedParameters = Object.keys(derivedIndices).map(function (indexId) {
      return {
        parameters: derivedIndices[indexId].reduce(function (res, widget) {
          return widget.getSearchParameters(res);
        }, sharedParameters),
        indexId: indexId
      };
    });
    return {
      mainParameters: mainParameters,
      derivedParameters: derivedParameters
    };
  }

  function search() {
    if (!skip) {
      var _getSearchParameters = getSearchParameters(helper.state),
          mainParameters = _getSearchParameters.mainParameters,
          derivedParameters = _getSearchParameters.derivedParameters; // We have to call `slice` because the method `detach` on the derived
      // helpers mutates the value `derivedHelpers`. The `forEach` loop does
      // not iterate on each value and we're not able to correctly clear the
      // previous derived helpers (memory leak + useless requests).


      helper.derivedHelpers.slice().forEach(function (derivedHelper) {
        // Since we detach the derived helpers on **every** new search they
        // won't receive intermediate results in case of a stalled search.
        // Only the last result is dispatched by the derived helper because
        // they are not detached yet:
        //
        // - a -> main helper receives results
        // - ap -> main helper receives results
        // - app -> main helper + derived helpers receive results
        //
        // The quick fix is to avoid to detatch them on search but only once they
        // received the results. But it means that in case of a stalled search
        // all the derived helpers not detached yet register a new search inside
        // the helper. The number grows fast in case of a bad network and it's
        // not deterministic.
        derivedHelper.detach();
      });
      derivedParameters.forEach(function (_ref2) {
        var indexId = _ref2.indexId,
            parameters = _ref2.parameters;
        var derivedHelper = helper.derive(function () {
          return parameters;
        });
        derivedHelper.on('result', handleSearchSuccess({
          indexId: indexId
        })).on('error', handleSearchError);
      });
      helper.setState(mainParameters);
      helper.search();
    }
  }

  function handleSearchSuccess(_ref3) {
    var indexId = _ref3.indexId;
    return function (content) {
      var state = store.getState();
      var isDerivedHelpersEmpty = !helper.derivedHelpers.length;
      var results = state.results ? state.results : {}; // Switching from mono index to multi index and vice versa must reset the
      // results to an empty object, otherwise we keep reference of stalled and
      // unused results.

      results = !isDerivedHelpersEmpty && results.getFacetByName ? {} : results;

      if (!isDerivedHelpersEmpty) {
        results[indexId] = content;
      } else {
        results = content;
      }

      var currentState = store.getState();
      var nextIsSearchStalled = currentState.isSearchStalled;

      if (!helper.hasPendingRequests()) {
        clearTimeout(stalledSearchTimer);
        stalledSearchTimer = null;
        nextIsSearchStalled = false;
      }

      var nextState = (0, _omit2.default)((0, _objectSpread4.default)({}, currentState, {
        results: results,
        isSearchStalled: nextIsSearchStalled,
        searching: false,
        error: null
      }), 'resultsFacetValues');
      store.setState(nextState);
    };
  }

  function handleSearchError(error) {
    var currentState = store.getState();
    var nextIsSearchStalled = currentState.isSearchStalled;

    if (!helper.hasPendingRequests()) {
      clearTimeout(stalledSearchTimer);
      nextIsSearchStalled = false;
    }

    var nextState = (0, _omit2.default)((0, _objectSpread4.default)({}, currentState, {
      isSearchStalled: nextIsSearchStalled,
      error: error,
      searching: false
    }), 'resultsFacetValues');
    store.setState(nextState);
  }

  function handleNewSearch() {
    if (!stalledSearchTimer) {
      stalledSearchTimer = setTimeout(function () {
        var nextState = (0, _omit2.default)((0, _objectSpread4.default)({}, store.getState(), {
          isSearchStalled: true
        }), 'resultsFacetValues');
        store.setState(nextState);
      }, stalledSearchDelay);
    }
  } // Called whenever a widget has been rendered with new props.


  function onWidgetsUpdate() {
    var metadata = getMetadata(store.getState().widgets);
    store.setState((0, _objectSpread4.default)({}, store.getState(), {
      metadata: metadata,
      searching: true
    })); // Since the `getSearchParameters` method of widgets also depends on props,
    // the result search parameters might have changed.

    search();
  }

  function transitionState(nextSearchState) {
    var searchState = store.getState().widgets;
    return widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.transitionState);
    }).reduce(function (res, widget) {
      return widget.transitionState(searchState, res);
    }, nextSearchState);
  }

  function onExternalStateUpdate(nextSearchState) {
    var metadata = getMetadata(nextSearchState);
    store.setState((0, _objectSpread4.default)({}, store.getState(), {
      widgets: nextSearchState,
      metadata: metadata,
      searching: true
    }));
    search();
  }

  function onSearchForFacetValues(_ref4) {
    var facetName = _ref4.facetName,
        query = _ref4.query,
        _ref4$maxFacetHits = _ref4.maxFacetHits,
        maxFacetHits = _ref4$maxFacetHits === void 0 ? 10 : _ref4$maxFacetHits;
    // The values 1, 100 are the min / max values that the engine accepts.
    // see: https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits
    var maxFacetHitsWithinRange = Math.max(1, Math.min(maxFacetHits, 100));
    store.setState((0, _objectSpread4.default)({}, store.getState(), {
      searchingForFacetValues: true
    }));
    helper.searchForFacetValues(facetName, query, maxFacetHitsWithinRange).then(function (content) {
      var _objectSpread3;

      store.setState((0, _objectSpread4.default)({}, store.getState(), {
        error: null,
        searchingForFacetValues: false,
        resultsFacetValues: (0, _objectSpread4.default)({}, store.getState().resultsFacetValues, (_objectSpread3 = {}, (0, _defineProperty2.default)(_objectSpread3, facetName, content.facetHits), (0, _defineProperty2.default)(_objectSpread3, "query", query), _objectSpread3))
      }));
    }, function (error) {
      store.setState((0, _objectSpread4.default)({}, store.getState(), {
        searchingForFacetValues: false,
        error: error
      }));
    }).catch(function (error) {
      // Since setState is synchronous, any error that occurs in the render of a
      // component will be swallowed by this promise.
      // This is a trick to make the error show up correctly in the console.
      // See http://stackoverflow.com/a/30741722/969302
      setTimeout(function () {
        throw error;
      });
    });
  }

  function updateIndex(newIndex) {
    initialSearchParameters = initialSearchParameters.setIndex(newIndex);
    search();
  }

  function getWidgetsIds() {
    return store.getState().metadata.reduce(function (res, meta) {
      return typeof meta.id !== 'undefined' ? res.concat(meta.id) : res;
    }, []);
  }

  return {
    store: store,
    widgetsManager: widgetsManager,
    getWidgetsIds: getWidgetsIds,
    getSearchParameters: getSearchParameters,
    onSearchForFacetValues: onSearchForFacetValues,
    onExternalStateUpdate: onExternalStateUpdate,
    transitionState: transitionState,
    updateClient: updateClient,
    updateIndex: updateIndex,
    clearCache: clearCache,
    skipSearch: skipSearch
  };
}