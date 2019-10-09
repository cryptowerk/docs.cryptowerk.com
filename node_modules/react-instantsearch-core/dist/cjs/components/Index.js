"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * @description
 * `<Index>` is the component that allows you to apply widgets to a dedicated index. It's
 * useful if you want to build an interface that targets multiple indices.
 * @kind widget
 * @name <Index>
 * @propType {string} indexName - index in which to search.
 * @propType {{ Root: string|function, props: object }} [root] - Use this to customize the root element. Default value: `{ Root: 'div' }`
 * @example
 * import React from 'react';
 * import { InstantSearch, Index, SearchBox, Hits, Configure } from 'react-instantsearch-dom';
 *
 * const App = () => (
 *   <InstantSearch
 *     appId="latency"
 *     apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *     indexName="instant_search"
 *   >
 *     <Configure hitsPerPage={5} />
 *     <SearchBox />
 *     <Index indexName="instant_search">
 *       <Hits />
 *     </Index>
 *     <Index indexName="bestbuy">
 *       <Hits />
 *     </Index>
 *   </InstantSearch>
 * );
 */
var Index =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Index, _Component);

  function Index() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Index)).call.apply(_getPrototypeOf2, [this].concat(args)));
    /*
     we want <Index> to be seen as a regular widget.
     It means that with only <Index> present a new query will be sent to Algolia.
     That way you don't need a virtual hits widget to use the connectAutoComplete.
    */

    _this.unregisterWidget = _this.context.ais.widgetsManager.registerWidget((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Index, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.context.ais.onSearchParameters(this.getSearchParameters.bind(this), this.getChildContext(), this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.indexName !== nextProps.indexName) {
        this.context.ais.widgetsManager.update();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unregisterWidget();
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        multiIndexContext: {
          targetedIndex: this.props.indexId
        }
      };
    }
  }, {
    key: "getSearchParameters",
    value: function getSearchParameters(searchParameters, props) {
      return searchParameters.setIndex(this.props ? this.props.indexName : props.indexName);
    }
  }, {
    key: "render",
    value: function render() {
      var childrenCount = _react.Children.count(this.props.children);

      var _this$props$root = this.props.root,
          Root = _this$props$root.Root,
          props = _this$props$root.props;
      if (childrenCount === 0) return null;else return _react.default.createElement(Root, props, this.props.children);
    }
  }]);
  return Index;
}(_react.Component);

Index.propTypes = {
  // @TODO: These props are currently constant.
  indexName: _propTypes.default.string.isRequired,
  indexId: _propTypes.default.string.isRequired,
  children: _propTypes.default.node,
  root: _propTypes.default.shape({
    Root: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.object]),
    props: _propTypes.default.object
  }).isRequired
};
Index.childContextTypes = {
  multiIndexContext: _propTypes.default.object.isRequired
};
Index.contextTypes = {
  // @TODO: more precise widgets manager propType
  ais: _propTypes.default.object.isRequired
};
var _default = Index;
exports.default = _default;