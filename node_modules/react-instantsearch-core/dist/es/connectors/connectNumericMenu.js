import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import { cleanUpValue, refineValue, getCurrentRefinementValue, getResults, getIndexId } from '../core/indexUtils';

function stringifyItem(item) {
  if (typeof item.start === 'undefined' && typeof item.end === 'undefined') {
    return '';
  }

  return "".concat(item.start ? item.start : '', ":").concat(item.end ? item.end : '');
}

function parseItem(value) {
  if (value.length === 0) {
    return {
      start: null,
      end: null
    };
  }

  var _value$split = value.split(':'),
      _value$split2 = _slicedToArray(_value$split, 2),
      startStr = _value$split2[0],
      endStr = _value$split2[1];

  return {
    start: startStr.length > 0 ? parseInt(startStr, 10) : null,
    end: endStr.length > 0 ? parseInt(endStr, 10) : null
  };
}

var namespace = 'multiRange';

function getId(props) {
  return props.attribute;
}

function getCurrentRefinement(props, searchState, context) {
  return getCurrentRefinementValue(props, searchState, context, "".concat(namespace, ".").concat(getId(props)), '', function (currentRefinement) {
    if (currentRefinement === '') {
      return '';
    }

    return currentRefinement;
  });
}

function isRefinementsRangeIncludesInsideItemRange(stats, start, end) {
  return stats.min > start && stats.min < end || stats.max > start && stats.max < end;
}

function isItemRangeIncludedInsideRefinementsRange(stats, start, end) {
  return start > stats.min && start < stats.max || end > stats.min && end < stats.max;
}

function itemHasRefinement(attribute, results, value) {
  var stats = results.getFacetByName(attribute) ? results.getFacetStats(attribute) : null;
  var range = value.split(':');
  var start = Number(range[0]) === 0 || value === '' ? Number.NEGATIVE_INFINITY : Number(range[0]);
  var end = Number(range[1]) === 0 || value === '' ? Number.POSITIVE_INFINITY : Number(range[1]);
  return !(Boolean(stats) && (isRefinementsRangeIncludesInsideItemRange(stats, start, end) || isItemRangeIncludedInsideRefinementsRange(stats, start, end)));
}

function _refine(props, searchState, nextRefinement, context) {
  var nextValue = _defineProperty({}, getId(props, searchState), nextRefinement);

  var resetPage = true;
  return refineValue(searchState, nextValue, context, resetPage, namespace);
}

function _cleanUp(props, searchState, context) {
  return cleanUpValue(searchState, context, "".concat(namespace, ".").concat(getId(props)));
}
/**
 * connectNumericMenu connector provides the logic to build a widget that will
 * give the user the ability to select a range value for a numeric attribute.
 * Ranges are defined statically.
 * @name connectNumericMenu
 * @requirements The attribute passed to the `attribute` prop must be holding numerical values.
 * @kind connector
 * @propType {string} attribute - the name of the attribute in the records
 * @propType {{label: string, start: number, end: number}[]} items - List of options. With a text label, and upper and lower bounds.
 * @propType {string} [defaultRefinement] - the value of the item selected by default, follow the shape of a `string` with a pattern of `'{start}:{end}'`.
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @providedPropType {function} refine - a function to select a range.
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {string} currentRefinement - the refinement currently applied.  follow the shape of a `string` with a pattern of `'{start}:{end}'` which corresponds to the current selected item. For instance, when the selected item is `{start: 10, end: 20}`, the searchState of the widget is `'10:20'`. When `start` isn't defined, the searchState of the widget is `':{end}'`, and the same way around when `end` isn't defined. However, when neither `start` nor `end` are defined, the searchState is an empty string.
 * @providedPropType {array.<{isRefined: boolean, label: string, value: string, isRefined: boolean, noRefinement: boolean}>} items - the list of ranges the NumericMenu can display.
 */


export default createConnector({
  displayName: 'AlgoliaNumericMenu',
  propTypes: {
    id: PropTypes.string,
    attribute: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node,
      start: PropTypes.number,
      end: PropTypes.number
    })).isRequired,
    transformItems: PropTypes.func
  },
  getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
    var attribute = props.attribute;
    var currentRefinement = getCurrentRefinement(props, searchState, this.context);
    var results = getResults(searchResults, this.context);
    var items = props.items.map(function (item) {
      var value = stringifyItem(item);
      return {
        label: item.label,
        value: value,
        isRefined: value === currentRefinement,
        noRefinement: results ? itemHasRefinement(getId(props), results, value) : false
      };
    });
    var stats = results && results.getFacetByName(attribute) ? results.getFacetStats(attribute) : null;

    var refinedItem = _find(items, function (item) {
      return item.isRefined === true;
    });

    if (!items.some(function (item) {
      return item.value === '';
    })) {
      items.push({
        value: '',
        isRefined: _isEmpty(refinedItem),
        noRefinement: !stats,
        label: 'All'
      });
    }

    var transformedItems = props.transformItems ? props.transformItems(items) : items;
    return {
      items: transformedItems,
      currentRefinement: currentRefinement,
      canRefine: transformedItems.length > 0 && transformedItems.some(function (item) {
        return item.noRefinement === false;
      })
    };
  },
  refine: function refine(props, searchState, nextRefinement) {
    return _refine(props, searchState, nextRefinement, this.context);
  },
  cleanUp: function cleanUp(props, searchState) {
    return _cleanUp(props, searchState, this.context);
  },
  getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
    var attribute = props.attribute;

    var _parseItem = parseItem(getCurrentRefinement(props, searchState, this.context)),
        start = _parseItem.start,
        end = _parseItem.end;

    searchParameters = searchParameters.addDisjunctiveFacet(attribute);

    if (start) {
      searchParameters = searchParameters.addNumericRefinement(attribute, '>=', start);
    }

    if (end) {
      searchParameters = searchParameters.addNumericRefinement(attribute, '<=', end);
    }

    return searchParameters;
  },
  getMetadata: function getMetadata(props, searchState) {
    var _this = this;

    var id = getId(props);
    var value = getCurrentRefinement(props, searchState, this.context);
    var items = [];
    var index = getIndexId(this.context);

    if (value !== '') {
      var _find2 = _find(props.items, function (item) {
        return stringifyItem(item) === value;
      }),
          label = _find2.label;

      items.push({
        label: "".concat(props.attribute, ": ").concat(label),
        attribute: props.attribute,
        currentRefinement: label,
        value: function value(nextState) {
          return _refine(props, nextState, '', _this.context);
        }
      });
    }

    return {
      id: id,
      index: index,
      items: items
    };
  }
});