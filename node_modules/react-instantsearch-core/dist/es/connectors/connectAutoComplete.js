import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import createConnector from '../core/createConnector';
import { cleanUpValue, refineValue, getCurrentRefinementValue } from '../core/indexUtils';

var getId = function getId() {
  return 'query';
};

function getCurrentRefinement(props, searchState, context) {
  var id = getId();
  var currentRefinement = getCurrentRefinementValue(props, searchState, context, id, '');

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
        return [].concat(_toConsumableArray(hits), [{
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

  var nextValue = _defineProperty({}, id, nextRefinement);

  var resetPage = true;
  return refineValue(searchState, nextValue, context, resetPage);
}

function _cleanUp(props, searchState, context) {
  return cleanUpValue(searchState, context, getId());
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


export default createConnector({
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