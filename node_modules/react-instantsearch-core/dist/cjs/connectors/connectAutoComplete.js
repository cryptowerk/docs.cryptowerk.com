"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _createConnector = _interopRequireDefault(require("../core/createConnector"));

var _indexUtils = require("../core/indexUtils");

var getId = function getId() {
  return 'query';
};

function getCurrentRefinement(props, searchState, context) {
  var id = getId();
  var currentRefinement = (0, _indexUtils.getCurrentRefinementValue)(props, searchState, context, id, '');

  if (currentRefinement) {
    return currentRefinement;
  }

  return '';
}

function getHits(searchResults) {
  if (searchResults.results) {
    if (searchResults.results.hits && Array.isArray(searchResults.results.hits)) {
      return searchResults.results.hits;
    } else {
      return Object.keys(searchResults.results).reduce(function (hits, index) {
        return [].concat((0, _toConsumableArray2.default)(hits), [{
          index: index,
          hits: searchResults.results[index].hits
        }]);
      }, []);
    }
  } else {
    return [];
  }
}

function _refine(props, searchState, nextRefinement, context) {
  var id = getId();
  var nextValue = (0, _defineProperty2.default)({}, id, nextRefinement);
  var resetPage = true;
  return (0, _indexUtils.refineValue)(searchState, nextValue, context, resetPage);
}

function _cleanUp(props, searchState, context) {
  return (0, _indexUtils.cleanUpValue)(searchState, context, getId());
}
/**
 * connectAutoComplete connector provides the logic to create connected
 * components that will render the results retrieved from
 * Algolia.
 *
 * To configure the number of hits retrieved, use [HitsPerPage widget](widgets/HitsPerPage.html),
 * [connectHitsPerPage connector](connectors/connectHitsPerPage.html) or pass the hitsPerPage
 * prop to a [Configure](guide/Search_parameters.html) widget.
 * @name connectAutoComplete
 * @kind connector
 * @propType {string} [defaultRefinement] - Provide a default value for the query
 * @providedPropType {array.<object>} hits - the records that matched the search state
 * @providedPropType {function} refine - a function to change the query
 * @providedPropType {string} currentRefinement - the query to search for
 */


var _default = (0, _createConnector.default)({
  displayName: 'AlgoliaAutoComplete',
  getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
    return {
      hits: getHits(searchResults),
      currentRefinement: getCurrentRefinement(props, searchState, this.context)
    };
  },
  refine: function refine(props, searchState, nextRefinement) {
    return _refine(props, searchState, nextRefinement, this.context);
  },
  cleanUp: function cleanUp(props, searchState) {
    return _cleanUp(props, searchState, this.context);
  },

  /* connectAutoComplete needs to be considered as a widget to trigger a search if no others widgets are used.
   * To be considered as a widget you need either getSearchParameters, getMetadata or getTransitionState
   * See createConnector.js
   * */
  getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
    return searchParameters.setQuery(getCurrentRefinement(props, searchState, this.context));
  }
});

exports.default = _default;