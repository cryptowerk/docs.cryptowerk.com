import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _find from "lodash/find";
import _isEqual from "lodash/isEqual";
import _has from "lodash/has";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, getDisplayName, removeEmptyKey } from './utils';
/**
 * @typedef {object} ConnectorDescription
 * @property {string} displayName - the displayName used by the wrapper
 * @property {function} refine - a function to filter the local state
 * @property {function} getSearchParameters - function transforming the local state to a SearchParameters
 * @property {function} getMetadata - metadata of the widget
 * @property {function} transitionState - hook after the state has changed
 * @property {function} getProvidedProps - transform the state into props passed to the wrapped component.
 * Receives (props, widgetStates, searchState, metadata) and returns the local state.
 * @property {function} getId - Receives props and return the id that will be used to identify the widget
 * @property {function} cleanUp - hook when the widget will unmount. Receives (props, searchState) and return a cleaned state.
 * @property {object} propTypes - PropTypes forwarded to the wrapped component.
 * @property {object} defaultProps - default values for the props
 */

/**
 * Connectors are the HOC used to transform React components
 * into InstantSearch widgets.
 * In order to simplify the construction of such connectors
 * `createConnector` takes a description and transform it into
 * a connector.
 * @param {ConnectorDescription} connectorDesc the description of the connector
 * @return {Connector} a function that wraps a component into
 * an instantsearch connected one.
 */

export default function createConnector(connectorDesc) {
  if (!connectorDesc.displayName) {
    throw new Error('`createConnector` requires you to provide a `displayName` property.');
  }

  var hasRefine = _has(connectorDesc, 'refine');

  var hasSearchForFacetValues = _has(connectorDesc, 'searchForFacetValues');

  var hasSearchParameters = _has(connectorDesc, 'getSearchParameters');

  var hasMetadata = _has(connectorDesc, 'getMetadata');

  var hasTransitionState = _has(connectorDesc, 'transitionState');

  var hasCleanUp = _has(connectorDesc, 'cleanUp');

  var hasShouldComponentUpdate = _has(connectorDesc, 'shouldComponentUpdate');

  var isWidget = hasSearchParameters || hasMetadata || hasTransitionState;
  return function (Composed) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _inherits(Connector, _Component);

      function Connector() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, Connector);

        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Connector)).call.apply(_getPrototypeOf2, [this].concat(_args)));

        _defineProperty(_assertThisInitialized(_this), "mounted", false);

        _defineProperty(_assertThisInitialized(_this), "unmounting", false);

        _defineProperty(_assertThisInitialized(_this), "refine", function () {
          var _connectorDesc$refine;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this.context.ais.onInternalStateUpdate((_connectorDesc$refine = connectorDesc.refine).call.apply(_connectorDesc$refine, [_assertThisInitialized(_this), _this.props, _this.context.ais.store.getState().widgets].concat(args)));
        });

        _defineProperty(_assertThisInitialized(_this), "createURL", function () {
          var _connectorDesc$refine2;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return _this.context.ais.createHrefForState((_connectorDesc$refine2 = connectorDesc.refine).call.apply(_connectorDesc$refine2, [_assertThisInitialized(_this), _this.props, _this.context.ais.store.getState().widgets].concat(args)));
        });

        _defineProperty(_assertThisInitialized(_this), "searchForFacetValues", function () {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          _this.context.ais.onSearchForFacetValues(connectorDesc.searchForFacetValues.apply(connectorDesc, [_this.props, _this.context.ais.store.getState().widgets].concat(args)));
        });

        _this.state = {
          props: _this.getProvidedProps(_objectSpread({}, _this.props, {
            // @MAJOR: We cannot drop this beacuse it's a breaking change. The
            // prop is provided to `createConnector.getProvidedProps`. All the
            // custom connectors are impacted by this change. It should be fine
            // to drop it in the next major though.
            canRender: false
          }))
        };

        if (process.env.NODE_ENV === 'development') {
          var onlyGetProvidedPropsUsage = !_find(Object.keys(connectorDesc), function (key) {
            return ['getMetadata', 'getSearchParameters', 'refine', 'cleanUp'].indexOf(key) > -1;
          });

          if (onlyGetProvidedPropsUsage && connectorDesc.displayName.substr(0, 7) !== 'Algolia') {
            // eslint-disable-next-line no-console
            console.warn('react-instantsearch: it seems that you are using the `createConnector` api ' + 'only to access the `searchState` and the `searchResults` through `getProvidedProps`.' + 'We are now provided a dedicated API' + ' the `connectStateResults` connector that you should use instead. The `createConnector` API will be ' + 'soon deprecated and will break in future next major versions.' + '\n\n' + 'See more at https://www.algolia.com/doc/api-reference/widgets/state-results/react/' + '\n' + 'and https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-display/react/');
          }
        }

        return _this;
      }

      _createClass(Connector, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          if (connectorDesc.getSearchParameters) {
            this.context.ais.onSearchParameters(connectorDesc.getSearchParameters.bind(this), this.context, this.props);
          }
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;

          this.mounted = true;
          this.unsubscribe = this.context.ais.store.subscribe(function () {
            if (!_this2.unmounting) {
              _this2.setState({
                props: _this2.getProvidedProps(_objectSpread({}, _this2.props, {
                  // @MAJOR: see constructor
                  canRender: true
                }))
              });
            }
          });

          if (isWidget) {
            this.unregisterWidget = this.context.ais.widgetsManager.registerWidget(this);
          }
        }
      }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          if (!_isEqual(this.props, nextProps)) {
            this.setState({
              props: this.getProvidedProps(_objectSpread({}, nextProps, {
                // @MAJOR: see constructor
                canRender: this.mounted
              }))
            });

            if (isWidget) {
              this.context.ais.widgetsManager.update();

              if (connectorDesc.transitionState) {
                this.context.ais.onSearchStateChange(connectorDesc.transitionState.call(this, nextProps, this.context.ais.store.getState().widgets, this.context.ais.store.getState().widgets));
              }
            }
          }
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          if (hasShouldComponentUpdate) {
            return connectorDesc.shouldComponentUpdate.call(this, this.props, nextProps, this.state, nextState);
          }

          var propsEqual = shallowEqual(this.props, nextProps);

          if (this.state.props === null || nextState.props === null) {
            if (this.state.props === nextState.props) {
              return !propsEqual;
            }

            return true;
          }

          return !propsEqual || !shallowEqual(this.state.props, nextState.props);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.unmounting = true;

          if (this.unsubscribe) {
            this.unsubscribe();
          }

          if (this.unregisterWidget) {
            this.unregisterWidget();

            if (hasCleanUp) {
              var nextState = connectorDesc.cleanUp.call(this, this.props, this.context.ais.store.getState().widgets);
              this.context.ais.store.setState(_objectSpread({}, this.context.ais.store.getState(), {
                widgets: nextState
              }));
              this.context.ais.onSearchStateChange(removeEmptyKey(nextState));
            }
          }
        }
      }, {
        key: "getProvidedProps",
        value: function getProvidedProps(props) {
          var _this$context$ais$sto = this.context.ais.store.getState(),
              widgets = _this$context$ais$sto.widgets,
              results = _this$context$ais$sto.results,
              resultsFacetValues = _this$context$ais$sto.resultsFacetValues,
              searching = _this$context$ais$sto.searching,
              searchingForFacetValues = _this$context$ais$sto.searchingForFacetValues,
              isSearchStalled = _this$context$ais$sto.isSearchStalled,
              metadata = _this$context$ais$sto.metadata,
              error = _this$context$ais$sto.error;

          var searchResults = {
            results: results,
            searching: searching,
            searchingForFacetValues: searchingForFacetValues,
            isSearchStalled: isSearchStalled,
            error: error
          };
          return connectorDesc.getProvidedProps.call(this, props, widgets, searchResults, metadata, // @MAJOR: move this attribute on the `searchResults` it doesn't
          // makes sense to have it into a separate argument. The search
          // flags are on the object why not the resutls?
          resultsFacetValues);
        }
      }, {
        key: "getSearchParameters",
        value: function getSearchParameters(searchParameters) {
          if (hasSearchParameters) {
            return connectorDesc.getSearchParameters.call(this, searchParameters, this.props, this.context.ais.store.getState().widgets);
          }

          return null;
        }
      }, {
        key: "getMetadata",
        value: function getMetadata(nextWidgetsState) {
          if (hasMetadata) {
            return connectorDesc.getMetadata.call(this, this.props, nextWidgetsState);
          }

          return {};
        }
      }, {
        key: "transitionState",
        value: function transitionState(prevWidgetsState, nextWidgetsState) {
          if (hasTransitionState) {
            return connectorDesc.transitionState.call(this, this.props, prevWidgetsState, nextWidgetsState);
          }

          return nextWidgetsState;
        }
      }, {
        key: "render",
        value: function render() {
          if (this.state.props === null) {
            return null;
          }

          var refineProps = hasRefine ? {
            refine: this.refine,
            createURL: this.createURL
          } : {};
          var searchForFacetValuesProps = hasSearchForFacetValues ? {
            searchForItems: this.searchForFacetValues
          } : {};
          return React.createElement(Composed, _extends({}, this.props, this.state.props, refineProps, searchForFacetValuesProps));
        }
      }]);

      return Connector;
    }(Component), _defineProperty(_class, "displayName", "".concat(connectorDesc.displayName, "(").concat(getDisplayName(Composed), ")")), _defineProperty(_class, "defaultClassNames", Composed.defaultClassNames), _defineProperty(_class, "propTypes", connectorDesc.propTypes), _defineProperty(_class, "defaultProps", connectorDesc.defaultProps), _defineProperty(_class, "contextTypes", {
      // @TODO: more precise state manager propType
      ais: PropTypes.object.isRequired,
      multiIndexContext: PropTypes.object
    }), _temp;
  };
}