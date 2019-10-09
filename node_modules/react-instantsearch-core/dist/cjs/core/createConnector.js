"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createConnector;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

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
function createConnector(connectorDesc) {
  if (!connectorDesc.displayName) {
    throw new Error('`createConnector` requires you to provide a `displayName` property.');
  }

  var hasRefine = (0, _has2.default)(connectorDesc, 'refine');
  var hasSearchForFacetValues = (0, _has2.default)(connectorDesc, 'searchForFacetValues');
  var hasSearchParameters = (0, _has2.default)(connectorDesc, 'getSearchParameters');
  var hasMetadata = (0, _has2.default)(connectorDesc, 'getMetadata');
  var hasTransitionState = (0, _has2.default)(connectorDesc, 'transitionState');
  var hasCleanUp = (0, _has2.default)(connectorDesc, 'cleanUp');
  var hasShouldComponentUpdate = (0, _has2.default)(connectorDesc, 'shouldComponentUpdate');
  var isWidget = hasSearchParameters || hasMetadata || hasTransitionState;
  return function (Composed) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(Connector, _Component);

      function Connector() {
        var _getPrototypeOf2;

        var _this;

        (0, _classCallCheck2.default)(this, Connector);

        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }

        _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Connector)).call.apply(_getPrototypeOf2, [this].concat(_args)));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "mounted", false);
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "unmounting", false);
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "refine", function () {
          var _connectorDesc$refine;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this.context.ais.onInternalStateUpdate((_connectorDesc$refine = connectorDesc.refine).call.apply(_connectorDesc$refine, [(0, _assertThisInitialized2.default)(_this), _this.props, _this.context.ais.store.getState().widgets].concat(args)));
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "createURL", function () {
          var _connectorDesc$refine2;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return _this.context.ais.createHrefForState((_connectorDesc$refine2 = connectorDesc.refine).call.apply(_connectorDesc$refine2, [(0, _assertThisInitialized2.default)(_this), _this.props, _this.context.ais.store.getState().widgets].concat(args)));
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "searchForFacetValues", function () {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          _this.context.ais.onSearchForFacetValues(connectorDesc.searchForFacetValues.apply(connectorDesc, [_this.props, _this.context.ais.store.getState().widgets].concat(args)));
        });
        _this.state = {
          props: _this.getProvidedProps((0, _objectSpread2.default)({}, _this.props, {
            // @MAJOR: We cannot drop this beacuse it's a breaking change. The
            // prop is provided to `createConnector.getProvidedProps`. All the
            // custom connectors are impacted by this change. It should be fine
            // to drop it in the next major though.
            canRender: false
          }))
        };

        if (process.env.NODE_ENV === 'development') {
          var onlyGetProvidedPropsUsage = !(0, _find2.default)(Object.keys(connectorDesc), function (key) {
            return ['getMetadata', 'getSearchParameters', 'refine', 'cleanUp'].indexOf(key) > -1;
          });

          if (onlyGetProvidedPropsUsage && connectorDesc.displayName.substr(0, 7) !== 'Algolia') {
            // eslint-disable-next-line no-console
            console.warn('react-instantsearch: it seems that you are using the `createConnector` api ' + 'only to access the `searchState` and the `searchResults` through `getProvidedProps`.' + 'We are now provided a dedicated API' + ' the `connectStateResults` connector that you should use instead. The `createConnector` API will be ' + 'soon deprecated and will break in future next major versions.' + '\n\n' + 'See more at https://www.algolia.com/doc/api-reference/widgets/state-results/react/' + '\n' + 'and https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-display/react/');
          }
        }

        return _this;
      }

      (0, _createClass2.default)(Connector, [{
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
                props: _this2.getProvidedProps((0, _objectSpread2.default)({}, _this2.props, {
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
          if (!(0, _isEqual2.default)(this.props, nextProps)) {
            this.setState({
              props: this.getProvidedProps((0, _objectSpread2.default)({}, nextProps, {
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

          var propsEqual = (0, _utils.shallowEqual)(this.props, nextProps);

          if (this.state.props === null || nextState.props === null) {
            if (this.state.props === nextState.props) {
              return !propsEqual;
            }

            return true;
          }

          return !propsEqual || !(0, _utils.shallowEqual)(this.state.props, nextState.props);
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
              this.context.ais.store.setState((0, _objectSpread2.default)({}, this.context.ais.store.getState(), {
                widgets: nextState
              }));
              this.context.ais.onSearchStateChange((0, _utils.removeEmptyKey)(nextState));
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
          return _react.default.createElement(Composed, (0, _extends2.default)({}, this.props, this.state.props, refineProps, searchForFacetValuesProps));
        }
      }]);
      return Connector;
    }(_react.Component), (0, _defineProperty2.default)(_class, "displayName", "".concat(connectorDesc.displayName, "(").concat((0, _utils.getDisplayName)(Composed), ")")), (0, _defineProperty2.default)(_class, "defaultClassNames", Composed.defaultClassNames), (0, _defineProperty2.default)(_class, "propTypes", connectorDesc.propTypes), (0, _defineProperty2.default)(_class, "defaultProps", connectorDesc.defaultProps), (0, _defineProperty2.default)(_class, "contextTypes", {
      // @TODO: more precise state manager propType
      ais: _propTypes.default.object.isRequired,
      multiIndexContext: _propTypes.default.object
    }), _temp;
  };
}