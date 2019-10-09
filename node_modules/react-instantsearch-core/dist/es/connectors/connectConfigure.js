import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _keys from "lodash/keys";
import _difference from "lodash/difference";
import _omit from "lodash/omit";
import createConnector from '../core/createConnector';
import { refineValue, getIndexId, hasMultipleIndices } from '../core/indexUtils';

function getId() {
  return 'configure';
}

export default createConnector({
  displayName: 'AlgoliaConfigure',
  getProvidedProps: function getProvidedProps() {
    return {};
  },
  getSearchParameters: function getSearchParameters(searchParameters, props) {
    var items = _omit(props, 'children');

    return searchParameters.setQueryParameters(items);
  },
  transitionState: function transitionState(props, prevSearchState, nextSearchState) {
    var id = getId();

    var items = _omit(props, 'children');

    var nonPresentKeys = this._props ? _difference(_keys(this._props), _keys(props)) : [];
    this._props = props;

    var nextValue = _defineProperty({}, id, _objectSpread({}, _omit(nextSearchState[id], nonPresentKeys), items));

    return refineValue(nextSearchState, nextValue, this.context);
  },
  cleanUp: function cleanUp(props, searchState) {
    var id = getId();
    var indexId = getIndexId(this.context);
    var subState = hasMultipleIndices(this.context) && searchState.indices ? searchState.indices[indexId] : searchState;
    var configureKeys = subState && subState[id] ? Object.keys(subState[id]) : [];
    var configureState = configureKeys.reduce(function (acc, item) {
      if (!props[item]) {
        acc[item] = subState[id][item];
      }

      return acc;
    }, {});

    var nextValue = _defineProperty({}, id, configureState);

    return refineValue(searchState, nextValue, this.context);
  }
});