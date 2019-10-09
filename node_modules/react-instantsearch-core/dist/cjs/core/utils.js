"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAbsolutePositions = addAbsolutePositions;
exports.addQueryID = addQueryID;
exports.removeEmptyKey = exports.defer = exports.getDisplayName = exports.shallowEqual = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

// From https://github.com/reactjs/react-redux/blob/master/src/utils/shallowEqual.js
var shallowEqual = function shallowEqual(objA, objB) {
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

exports.shallowEqual = shallowEqual;

var getDisplayName = function getDisplayName(Component) {
  return Component.displayName || Component.name || 'UnknownComponent';
};

exports.getDisplayName = getDisplayName;
var resolved = Promise.resolve();

var defer = function defer(f) {
  resolved.then(f);
};

exports.defer = defer;

var removeEmptyKey = function removeEmptyKey(obj) {
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];

    if ((0, _isEmpty2.default)(value) && (0, _isPlainObject2.default)(value)) {
      delete obj[key];
    } else if ((0, _isPlainObject2.default)(value)) {
      removeEmptyKey(value);
    }
  });
  return obj;
};

exports.removeEmptyKey = removeEmptyKey;

function addAbsolutePositions(hits, hitsPerPage, page) {
  return hits.map(function (hit, index) {
    return (0, _objectSpread2.default)({}, hit, {
      __position: hitsPerPage * page + index + 1
    });
  });
}

function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }

  return hits.map(function (hit) {
    return (0, _objectSpread2.default)({}, hit, {
      __queryID: queryID
    });
  });
}