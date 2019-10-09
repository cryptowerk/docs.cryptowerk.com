import React from 'react';
import PropTypes from 'prop-types';
import Index from '../components/Index';
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
    return React.createElement(Index, {
      indexName: indexName,
      indexId: indexId || indexName,
      root: root
    }, children);
  };

  CreateIndex.propTypes = {
    indexName: PropTypes.string.isRequired,
    // @MAJOR: indexId must be required
    indexId: PropTypes.string,
    root: PropTypes.shape({
      Root: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired,
      props: PropTypes.object
    }),
    children: PropTypes.node
  };
  CreateIndex.defaultProps = {
    root: defaultRoot
  };
  return CreateIndex;
};

export default createIndex;