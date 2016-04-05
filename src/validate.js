import _ from 'lodash';
import validator from 'validator';

function anyValue() {
	return true;
}

export default function makeValidator(spec) {
	if (!spec) return anyValue;
	if (_.isFunction(spec)) return spec;
	if (_.isString(spec)) {
		switch (spec.toLowerCase()) {
		case 'date':
			return s => validator.isDate(s);
		case 'password':
			// TODO could be check of password strength
			return anyValue;
		case 'email':
			return s => validator.isEmail(s);
		case 'int':
			return s => validator.isInt(s);
		case 'number':
		case 'decimal':
			return s => validator.isDecimal(s);
		case 'creditcard':
			return s => validator.isCreditCard(s);
		case 'phone':
			return s => validator.isMobilePhone(s, 'en-US');
		case 'alpha':
			return s => validator.isAlpha(s);
		case 'alphanum':
			return s => validator.isAlphanumeric(s);
		case 'hex':
			return s => validator.isHexadecimal(s);
		case 'base64':
			return s => validator.isBase64(s);
		case 'json':
			return s => validator.isJSON(s);
		case 'ip':
			return s => validator.isIP(s);
		case 'ipv4':
			return s => validator.isIP(s, 4);
		case 'ipv6':
			return s => validator.isIP(s, 6);
		case 'url':
			return s => validator.isURL(s);
		case 'text':
			return anyValue;
		default:
			break;
		}
	}
	if (_.isObject(spec)) {
		switch (spec.type) {
		case 'email':
			return s => validator.isEmail(s, spec);
		case 'int':
			return s => validator.isInt(s, spec);
		case 'phone':
			return s => validator.isMobilePhone(s, spec.locale || 'en-US');
		case 'length':
			return s => validator.isLength(s, spec);
		default:
			return makeValidator(spec.type);
		}
	}
	throw new Error('invalid validation spec');
}
