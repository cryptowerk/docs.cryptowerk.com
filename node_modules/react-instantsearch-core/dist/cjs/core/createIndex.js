"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Index = _interopRequireDefault(require("../components/Index"));

/**
 * Creates a specialized root Index component. It accepts
 * a specification of the root Element.
 * @param {object} defaultRoot - the defininition of the root of an Index sub tree.
 * @return {object} a Index root
 */
var createIndex = function createIndex(defaultRoot) {
  var CreateIndex = function CreateIndex(_ref) {
    var indexName = _ref.indexName,
        indexId = _ref.indexId,
        root = _ref.root,
        children = _ref.children;
    return _react.default.createElement(_Index.default, {
      indexName: indexName,
      indexId: indexId || indexName,
      root: root
    }, children);
  };

  CreateIndex.propTypes = {
    indexName: _propTypes.default.string.isRequired,
    // @MAJOR: indexId must be required
    indexId: _propTypes.default.string,
    root: _propTypes.default.shape({
      Root: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.object]).isRequired,
      props: _propTypes.default.object
    }),
    children: _propTypes.default.node
  };
  CreateIndex.defaultProps = {
    root: defaultRoot
  };
  return CreateIndex;
};

var _default = createIndex;
exports.default = _default;