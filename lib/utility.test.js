"use strict";

var _utility = require("./utility");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('combineReducers', function () {
  var initialIdentity = {
    name: 'Harry'
  };
  var initialLocation = {
    country: 'UK',
    city: 'London'
  };

  var identityReducer = function identityReducer(state, action) {
    switch (action.type) {
      case 'CHANGE_NAME':
        return _objectSpread(_objectSpread({}, state), {}, {
          name: 'Puli'
        });

      default:
        return state;
    }
  };

  var locationReducer = function locationReducer(state, action) {
    switch (action.type) {
      case 'CHANGE_CITY':
        return _objectSpread(_objectSpread({}, state), {}, {
          city: 'Manchester'
        });

      default:
        return state;
    }
  };

  var _combineReducers = (0, _utility.combineReducers)({
    identity: [identityReducer, initialIdentity],
    location: [locationReducer, initialLocation]
  }),
      _combineReducers2 = _slicedToArray(_combineReducers, 2),
      profileReducer = _combineReducers2[0],
      initialProfile = _combineReducers2[1];

  var expectedInitialProfile = {
    identity: {
      name: 'Harry'
    },
    location: {
      country: 'UK',
      city: 'London'
    }
  };
  it('correctly combines initial states', function () {
    expect(initialProfile).toEqual(expectedInitialProfile);
  });
  describe('returns a combined reducer that...', function () {
    var changeNothing = profileReducer(initialProfile, {
      type: 'CHANGE_NOTHING'
    });
    var changeName = profileReducer(initialProfile, {
      type: 'CHANGE_NAME'
    });
    var changeCity = profileReducer(initialProfile, {
      type: 'CHANGE_CITY'
    });
    it('does not change the state on a null action', function () {
      expect(changeNothing).toEqual(initialProfile);
    });
    it('correctly changes just one slice of the state', function () {
      var profileWithNameChangeOnly = {
        identity: {
          name: 'Puli'
        },
        location: {
          country: 'UK',
          city: 'London'
        }
      };
      var profileWithCityChangeOnly = {
        identity: {
          name: 'Harry'
        },
        location: {
          country: 'UK',
          city: 'Manchester'
        }
      };
      expect(changeName).toEqual(profileWithNameChangeOnly);
      expect(changeCity).toEqual(profileWithCityChangeOnly);
    });
    it('correctly changes more than one slice of the state', function () {
      var changeNameThenCity = profileReducer(changeName, {
        type: 'CHANGE_CITY'
      });
      var changeBoth = {
        identity: {
          name: 'Puli'
        },
        location: {
          country: 'UK',
          city: 'Manchester'
        }
      };
      expect(changeBoth).toEqual(changeNameThenCity);
    });
  });
});