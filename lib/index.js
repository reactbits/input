'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.makeValidator = exports.Input = undefined;

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Input = _input2.default;
exports.makeValidator = _validate2.default;
exports.default = _input2.default;