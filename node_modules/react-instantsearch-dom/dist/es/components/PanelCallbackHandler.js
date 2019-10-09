import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { Component } from 'react';
import PropTypes from 'prop-types';

var PanelCallbackHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(PanelCallbackHandler, _Component);

  function PanelCallbackHandler() {
    _classCallCheck(this, PanelCallbackHandler);

    return _possibleConstructorReturn(this, _getPrototypeOf(PanelCallbackHandler).apply(this, arguments));
  }

  _createClass(PanelCallbackHandler, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.context.setCanRefine) {
        this.context.setCanRefine(this.props.canRefine);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.context.setCanRefine && this.props.canRefine !== nextProps.canRefine) {
        this.context.setCanRefine(nextProps.canRefine);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return PanelCallbackHandler;
}(Component);

_defineProperty(PanelCallbackHandler, "propTypes", {
  children: PropTypes.node.isRequired,
  canRefine: PropTypes.bool.isRequired
});

_defineProperty(PanelCallbackHandler, "contextTypes", {
  setCanRefine: PropTypes.func
});

export default PanelCallbackHandler;