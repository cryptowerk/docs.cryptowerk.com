import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _orderBy from "lodash/orderBy";
import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import { getIndexId, cleanUpValue, refineValue, getCurrentRefinementValue, getResults } from '../core/indexUtils';
var namespace = 'menu';

function getId(props) {
  return props.attribute;
}

function getCurrentRefinement(props, searchState, context) {
  var currentRefinement = getCurrentRefinementValue(props, searchState, context, "".concat(namespace, ".").concat(getId(props)), null);

  if (currentRefinement === '') {
    return null;
  }

  return currentRefinement;
}

function getValue(name, props, searchState, context) {
  var currentRefinement = getCurrentRefinement(props, searchState, context);
  return name === currentRefinement ? '' : name;
}

function getLimit(_ref) {
  var showMore = _ref.showMore,
      limit = _ref.limit,
      showMoreLimit = _ref.showMoreLimit;
  return showMore ? showMoreLimit : limit;
}

function _refine(props, searchState, nextRefinement, context) {
  var id = getId(props);

  var nextValue = _defineProperty({}, id, nextRefinement ? nextRefinement : '');

  var resetPage = true;
  return refineValue(searchState, nextValue, context, resetPage, namespace);
}

function _cleanUp(props, searchState, context) {
  return cleanUpValue(searchState, context, "".concat(namespace, ".").concat(getId(props)));
}

var sortBy = ['count:desc', 'name:asc'];
/**
 * connectMenu connector provides the logic to build a widget that will
 * give the user the ability to choose a single value for a specific facet.
 * @name connectMenu
 * @requirements The attribute passed to the `attribute` prop must be present in "attributes for faceting"
 * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
 * @kind connector
 * @propType {string} attribute - the name of the attribute in the record
 * @propType {boolean} [showMore=false] - true if the component should display a button that will expand the number of items
 * @propType {number} [limit=10] - the minimum number of diplayed items
 * @propType {number} [showMoreLimit=20] - the maximun number of displayed items. Only used when showMore is set to `true`
 * @propType {string} [defaultRefinement] - the value of the item selected by default
 * @propType {boolean} [searchable=false] - allow search inside values
 * @providedPropType {function} refine - a function to toggle a refinement
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {string} currentRefinement - the refinement currently applied
 * @providedPropType {array.<{count: number, isRefined: boolean, label: string, value: string}>} items - the list of items the Menu can display.
 * @providedPropType {function} searchForItems - a function to toggle a search inside items values
 * @providedPropType {boolean} isFromSearch - a boolean that says if the `items` props contains facet values from the global search or from the search inside items.
 */

export default createConnector({
  displayName: 'AlgoliaMenu',
  propTypes: {
    attribute: PropTypes.string.isRequired,
    showMore: PropTypes.bool,
    limit: PropTypes.number,
    showMoreLimit: PropTypes.number,
    defaultRefinement: PropTypes.string,
    transformItems: PropTypes.func,
    searchable: PropTypes.bool
  },
  defaultProps: {
    showMore: false,
    limit: 10,
    showMoreLimit: 20
  },
  getProvidedProps: function getProvidedProps(props, searchState, searchResults, meta, searchForFacetValuesResults) {
    var _this = this;

    var attribute = props.attribute,
        searchable = props.searchable;
    var results = getResults(searchResults, this.context);
    var canRefine = Boolean(results) && Boolean(results.getFacetByName(attribute));
    var isFromSearch = Boolean(searchForFacetValuesResults && searchForFacetValuesResults[attribute] && searchForFacetValuesResults.query !== ''); // Search For Facet Values is not available with derived helper (used for multi index search)

    if (searchable && this.context.multiIndexContext) {
      throw new Error('react-instantsearch: searching in *List is not available when used inside a' + ' multi index context');
    }

    if (!canRefine) {
      return {
        items: [],
        currentRefinement: getCurrentRefinement(props, searchState, this.context),
        isFromSearch: isFromSearch,
        searchable: searchable,
        canRefine: canRefine
      };
    }

    var items = isFromSearch ? searchForFacetValuesResults[attribute].map(function (v) {
      return {
        label: v.value,
        value: getValue(v.value, props, searchState, _this.context),
        _highlightResult: {
          label: {
            value: v.highlighted
          }
        },
        count: v.count,
        isRefined: v.isRefined
      };
    }) : results.getFacetValues(attribute, {
      sortBy: sortBy
    }).map(function (v) {
      return {
        label: v.name,
        value: getValue(v.name, props, searchState, _this.context),
        count: v.count,
        isRefined: v.isRefined
      };
    });
    var sortedItems = searchable && !isFromSearch ? _orderBy(items, ['isRefined', 'count', 'label'], ['desc', 'desc', 'asc']) : items;
    var transformedItems = props.transformItems ? props.transformItems(sortedItems) : sortedItems;
    return {
      items: transformedItems.slice(0, getLimit(props)),
      currentRefinement: getCurrentRefinement(props, searchState, this.context),
      isFromSearch: isFromSearch,
      searchable: searchable,
      canRefine: transformedItems.length > 0
    };
  },
  refine: function refine(props, searchState, nextRefinement) {
    return _refine(props, searchState, nextRefinement, this.context);
  },
  searchForFacetValues: function searchForFacetValues(props, searchState, nextRefinement) {
    return {
      facetName: props.attribute,
      query: nextRefinement,
      maxFacetHits: getLimit(props)
    };
  },
  cleanUp: function cleanUp(props, searchState) {
    return _cleanUp(props, searchState, this.context);
  },
  getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
    var attribute = props.attribute;
    searchParameters = searchParameters.setQueryParameters({
      maxValuesPerFacet: Math.max(searchParameters.maxValuesPerFacet || 0, getLimit(props))
    });
    searchParameters = searchParameters.addDisjunctiveFacet(attribute);
    var currentRefinement = getCurrentRefinement(props, searchState, this.context);

    if (currentRefinement !== null) {
      searchParameters = searchParameters.addDisjunctiveFacetRefinement(attribute, currentRefinement);
    }

    return searchParameters;
  },
  getMetadata: function getMetadata(props, searchState) {
    var _this2 = this;

    var id = getId(props);
    var currentRefinement = getCurrentRefinement(props, searchState, this.context);
    return {
      id: id,
      index: getIndexId(this.context),
      items: currentRefinement === null ? [] : [{
        label: "".concat(props.attribute, ": ").concat(currentRefinement),
        attribute: props.attribute,
        value: function value(nextState) {
          return _refine(props, nextState, '', _this2.context);
        },
        currentRefinement: currentRefinement
      }]
    };
  }
});