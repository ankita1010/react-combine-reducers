"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineReducers = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var combineReducers = function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var reducerValues = Object.values(reducers);
  var globalState;
  reducerKeys.forEach(function (key, index) {
    globalState = _objectSpread(_objectSpread({}, globalState), {}, _defineProperty({}, key, reducerValues[index][1]));
  });
  var finalReducers = {};
  reducerValues.forEach(function (value, index) {
    finalReducers = _objectSpread(_objectSpread({}, finalReducers), {}, _defineProperty({}, reducerKeys[index], value[0]));
  });
  return [function (state, action) {
    var hasStateChanged = false;
    var newState = {};
    var nextStateForCurrentKey = {};

    for (var i = 0; i < reducerKeys.length; i++) {
      var currentKey = reducerKeys[i];
      var currentReducer = finalReducers[currentKey];
      var prevStateForCurrentKey = state[currentKey];
      nextStateForCurrentKey = currentReducer(prevStateForCurrentKey, action);
      hasStateChanged = hasStateChanged || nextStateForCurrentKey !== prevStateForCurrentKey;
      newState[currentKey] = nextStateForCurrentKey;
    }

    return hasStateChanged ? newState : state;
  }, globalState];
};

exports.combineReducers = combineReducers;