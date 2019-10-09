import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _pick from "lodash/pick";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from '../core/utils';
import Highlight from '../widgets/Highlight';
import List from './List';
import Link from './Link';
var cx = createClassNames('Menu');

var Menu =
/*#__PURE__*/
function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Menu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Menu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (item, resetQuery) {
      var createURL = _this.props.createURL;
      var label = _this.props.isFromSearch ? React.createElement(Highlight, {
        attribute: "label",
        hit: item
      }) : item.label;
      return React.createElement(Link, {
        className: cx('link'),
        onClick: function onClick() {
          return _this.selectItem(item, resetQuery);
        },
        href: createURL(item.value)
      }, React.createElement("span", {
        className: cx('label')
      }, label), ' ', React.createElement("span", {
        className: cx('count')
      }, item.count));
    });

    _defineProperty(_assertThisInitialized(_this), "selectItem", function (item, resetQuery) {
      resetQuery();

      _this.props.refine(item.value);
    });

    return _this;
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      return React.createElement(List, _extends({
        renderItem: this.renderItem,
        selectItem: this.selectItem,
        cx: cx
      }, _pick(this.props, ['translate', 'items', 'showMore', 'limit', 'showMoreLimit', 'isFromSearch', 'searchForItems', 'searchable', 'canRefine', 'className'])));
    }
  }]);

  return Menu;
}(Component);

_defineProperty(Menu, "propTypes", {
  translate: PropTypes.func.isRequired,
  refine: PropTypes.func.isRequired,
  searchForItems: PropTypes.func.isRequired,
  searchable: PropTypes.bool,
  createURL: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    isRefined: PropTypes.bool.isRequired
  })),
  isFromSearch: PropTypes.bool.isRequired,
  canRefine: PropTypes.bool.isRequired,
  showMore: PropTypes.bool,
  limit: PropTypes.number,
  showMoreLimit: PropTypes.number,
  transformItems: PropTypes.func,
  className: PropTypes.string
});

_defineProperty(Menu, "defaultProps", {
  className: ''
});

export default translatable({
  showMore: function showMore(extended) {
    return extended ? 'Show less' : 'Show more';
  },
  noResults: 'No results',
  submit: null,
  reset: null,
  resetTitle: 'Clear the search query.',
  submitTitle: 'Submit your search query.',
  placeholder: 'Search here…'
})(Menu);