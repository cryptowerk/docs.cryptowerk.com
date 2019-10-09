import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _isPlainObject from "lodash/isPlainObject";
import _isEmpty from "lodash/isEmpty";
// From https://github.com/reactjs/react-redux/blob/master/src/utils/shallowEqual.js
export var shallowEqual = function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var hasOwn = Object.prototype.hasOwnProperty;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
};
export var getDisplayName = function getDisplayName(Component) {
  return Component.displayName || Component.name || 'UnknownComponent';
};
var resolved = Promise.resolve();
export var defer = function defer(f) {
  resolved.then(f);
};
export var removeEmptyKey = function removeEmptyKey(obj) {
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];

    if (_isEmpty(value) && _isPlainObject(value)) {
      delete obj[key];
    } else if (_isPlainObject(value)) {
      removeEmptyKey(value);
    }
  });
  return obj;
};
export function addAbsolutePositions(hits, hitsPerPage, page) {
  return hits.map(function (hit, index) {
    return _objectSpread({}, hit, {
      __position: hitsPerPage * page + index + 1
    });
  });
}
export function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }

  return hits.map(function (hit) {
    return _objectSpread({}, hit, {
      __queryID: queryID
    });
  });
}