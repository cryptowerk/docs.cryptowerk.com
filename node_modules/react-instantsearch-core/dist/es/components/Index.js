import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
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
  _inherits(Index, _Component);

  function Index() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Index)).call.apply(_getPrototypeOf2, [this].concat(args)));
    /*
     we want <Index> to be seen as a regular widget.
     It means that with only <Index> present a new query will be sent to Algolia.
     That way you don't need a virtual hits widget to use the connectAutoComplete.
    */

    _this.unregisterWidget = _this.context.ais.widgetsManager.registerWidget(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Index, [{
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
      var childrenCount = Children.count(this.props.children);
      var _this$props$root = this.props.root,
          Root = _this$props$root.Root,
          props = _this$props$root.props;
      if (childrenCount === 0) return null;else return React.createElement(Root, props, this.props.children);
    }
  }]);

  return Index;
}(Component);

Index.propTypes = {
  // @TODO: These props are currently constant.
  indexName: PropTypes.string.isRequired,
  indexId: PropTypes.string.isRequired,
  children: PropTypes.node,
  root: PropTypes.shape({
    Root: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    props: PropTypes.object
  }).isRequired
};
Index.childContextTypes = {
  multiIndexContext: PropTypes.object.isRequired
};
Index.contextTypes = {
  // @TODO: more precise widgets manager propType
  ais: PropTypes.object.isRequired
};
export default Index;