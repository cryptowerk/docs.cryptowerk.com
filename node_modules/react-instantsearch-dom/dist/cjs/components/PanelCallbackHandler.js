"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var PanelCallbackHandler =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PanelCallbackHandler, _Component);

  function PanelCallbackHandler() {
    (0, _classCallCheck2.default)(this, PanelCallbackHandler);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PanelCallbackHandler).apply(this, arguments));
  }

  (0, _createClass2.default)(PanelCallbackHandler, [{
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
}(_react.Component);

(0, _defineProperty2.default)(PanelCallbackHandler, "propTypes", {
  children: _propTypes.default.node.isRequired,
  canRefine: _propTypes.default.bool.isRequired
});
(0, _defineProperty2.default)(PanelCallbackHandler, "contextTypes", {
  setCanRefine: _propTypes.default.func
});
var _default = PanelCallbackHandler;
exports.default = _default;