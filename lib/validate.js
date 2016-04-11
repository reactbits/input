'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = makeValidator;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function anyValue() {
	return true;
}

function makeValidator(spec) {
	if (!spec) return anyValue;
	if (_lodash2.default.isFunction(spec)) return spec;
	if (_lodash2.default.isString(spec)) {
		switch (spec.toLowerCase()) {
			case 'date':
				return function (s) {
					return _validator2.default.isDate(s);
				};
			case 'password':
			case 'confirm-password':
				// TODO could be check of password strength
				return anyValue;
			case 'email':
				return function (s) {
					return _validator2.default.isEmail(s);
				};
			case 'int':
				return function (s) {
					return _validator2.default.isInt(s);
				};
			case 'number':
			case 'decimal':
				return function (s) {
					return _validator2.default.isDecimal(s);
				};
			case 'creditcard':
				return function (s) {
					return _validator2.default.isCreditCard(s);
				};
			case 'phone':
				return function (s) {
					return _validator2.default.isMobilePhone(s, 'en-US');
				};
			case 'alpha':
				return function (s) {
					return _validator2.default.isAlpha(s);
				};
			case 'alphanum':
				return function (s) {
					return _validator2.default.isAlphanumeric(s);
				};
			case 'hex':
				return function (s) {
					return _validator2.default.isHexadecimal(s);
				};
			case 'base64':
				return function (s) {
					return _validator2.default.isBase64(s);
				};
			case 'json':
				return function (s) {
					return _validator2.default.isJSON(s);
				};
			case 'ip':
				return function (s) {
					return _validator2.default.isIP(s);
				};
			case 'ipv4':
				return function (s) {
					return _validator2.default.isIP(s, 4);
				};
			case 'ipv6':
				return function (s) {
					return _validator2.default.isIP(s, 6);
				};
			case 'url':
				return function (s) {
					return _validator2.default.isURL(s);
				};
			case 'text':
				return anyValue;
			case 'checkbox':
			case 'bool':
			case 'boolean':
				return anyValue;
			default:
				break;
		}
	}
	if (_lodash2.default.isObject(spec)) {
		switch (spec.type) {
			case 'email':
				return function (s) {
					return _validator2.default.isEmail(s, spec);
				};
			case 'int':
				return function (s) {
					return _validator2.default.isInt(s, spec);
				};
			case 'phone':
				return function (s) {
					return _validator2.default.isMobilePhone(s, spec.locale || 'en-US');
				};
			case 'length':
				return function (s) {
					return _validator2.default.isLength(s, spec);
				};
			default:
				return makeValidator(spec.type);
		}
	}
	throw new Error('invalid validation spec');
}