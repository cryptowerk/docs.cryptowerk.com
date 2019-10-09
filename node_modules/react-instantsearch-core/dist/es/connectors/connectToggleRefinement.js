import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _find from "lodash/find";
import PropTypes from 'prop-types';
import createConnector from '../core/createConnector';
import { cleanUpValue, getIndexId, getResults, refineValue, getCurrentRefinementValue } from '../core/indexUtils';

function getId(props) {
  return props.attribute;
}

var namespace = 'toggle';

function getCurrentRefinement(props, searchState, context) {
  var currentRefinement = getCurrentRefinementValue(props, searchState, context, "".concat(namespace, ".").concat(getId(props)), false);

  if (currentRefinement) {
    return currentRefinement;
  }

  return false;
}

function _refine(props, searchState, nextRefinement, context) {
  var id = getId(props);

  var nextValue = _defineProperty({}, id, nextRefinement ? nextRefinement : false);

  var resetPage = true;
  return refineValue(searchState, nextValue, context, resetPage, namespace);
}

function _cleanUp(props, searchState, context) {
  return cleanUpValue(searchState, context, "".concat(namespace, ".").concat(getId(props)));
}
/**
 * connectToggleRefinement connector provides the logic to build a widget that will
 * provides an on/off filtering feature based on an attribute value.
 * @name connectToggleRefinement
 * @kind connector
 * @requirements To use this widget, you'll need an attribute to toggle on.
 *
 * You can't toggle on null or not-null values. If you want to address this particular use-case you'll need to compute an
 * extra boolean attribute saying if the value exists or not. See this [thread](https://discourse.algolia.com/t/how-to-create-a-toggle-for-the-absence-of-a-string-attribute/2460) for more details.
 *
 * @propType {string} attribute - Name of the attribute on which to apply the `value` refinement. Required when `value` is present.
 * @propType {string} label - Label for the toggle.
 * @propType {string} value - Value of the refinement to apply on `attribute`.
 * @propType {boolean} [defaultRefinement=false] - Default searchState of the widget. Should the toggle be checked by default?
 * @providedPropType {boolean} currentRefinement - `true` when the refinement is applied, `false` otherwise
 * @providedPropType {object} count - an object that contains the count for `checked` and `unchecked` state
 * @providedPropType {function} refine - a function to toggle a refinement
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 */


export default createConnector({
  displayName: 'AlgoliaToggle',
  propTypes: {
    label: PropTypes.string.isRequired,
    attribute: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    filter: PropTypes.func,
    defaultRefinement: PropTypes.bool
  },
  getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
    var attribute = props.attribute,
        value = props.value;
    var results = getResults(searchResults, this.context);
    var currentRefinement = getCurrentRefinement(props, searchState, this.context);
    var allFacetValues = results && results.getFacetByName(attribute) ? results.getFacetValues(attribute) : null;
    var facetValue = // Use null to always be consistent with type of the value
    // count: number | null
    allFacetValues && allFacetValues.length ? _find(allFacetValues, function (item) {
      return item.name === value.toString();
    }) : null;
    var facetValueCount = facetValue && facetValue.count;
    var allFacetValuesCount = // Use null to always be consistent with type of the value
    // count: number | null
    allFacetValues && allFacetValues.length ? allFacetValues.reduce(function (acc, item) {
      return acc + item.count;
    }, 0) : null;
    var canRefine = currentRefinement ? allFacetValuesCount !== null && allFacetValuesCount > 0 : facetValueCount !== null && facetValueCount > 0;
    var count = {
      checked: allFacetValuesCount,
      unchecked: facetValueCount
    };
    return {
      currentRefinement: currentRefinement,
      canRefine: canRefine,
      count: count
    };
  },
  refine: function refine(props, searchState, nextRefinement) {
    return _refine(props, searchState, nextRefinement, this.context);
  },
  cleanUp: function cleanUp(props, searchState) {
    return _cleanUp(props, searchState, this.context);
  },
  getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
    var attribute = props.attribute,
        value = props.value,
        filter = props.filter;
    var checked = getCurrentRefinement(props, searchState, this.context);
    var nextSearchParameters = searchParameters.addDisjunctiveFacet(attribute);

    if (checked) {
      nextSearchParameters = nextSearchParameters.addDisjunctiveFacetRefinement(attribute, value);

      if (filter) {
        nextSearchParameters = filter(nextSearchParameters);
      }
    }

    return nextSearchParameters;
  },
  getMetadata: function getMetadata(props, searchState) {
    var _this = this;

    var id = getId(props);
    var checked = getCurrentRefinement(props, searchState, this.context);
    var items = [];
    var index = getIndexId(this.context);

    if (checked) {
      items.push({
        label: props.label,
        currentRefinement: checked,
        attribute: props.attribute,
        value: function value(nextState) {
          return _refine(props, nextState, false, _this.context);
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