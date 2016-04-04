'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function inputType(spec) {
	if (!spec) return 'text';
	if (_lodash2.default.isString(spec)) {
		switch (spec.toLowerCase()) {
			case 'date':
				return 'data';
			case 'email':
				return 'email';
			default:
				return 'text';
		}
	}
	return 'text';
}

var Input = function (_Component) {
	_inherits(Input, _Component);

	function Input(props) {
		_classCallCheck(this, Input);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

		_this.onChange = _this.onChange.bind(_this);

		_this.state = {
			type: inputType(props.type),
			validate: (0, _validate2.default)(props.type)
		};
		return _this;
	}

	_createClass(Input, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var isValid = this.validate(this.props.value);
			if (!isValid) {
				this.onChange({ target: { value: this.props.value } });
			}
		}
	}, {
		key: 'onChange',
		value: function onChange(e) {
			var value = e.target.value;
			var isValid = this.validate(value);
			this.props.onChange(value, isValid);
		}
	}, {
		key: 'validate',
		value: function validate(value) {
			if (!value) {
				return !this.props.required;
			}
			return this.state.validate(value);
		}
	}, {
		key: 'render',
		value: function render() {
			var _klass;

			var props = this.props;
			var isValid = this.validate(props.value);

			var klass = (_klass = {}, _defineProperty(_klass, _style2.default.input, true), _defineProperty(_klass, props.className, true), _klass);
			if (!props.hiddenInvalidState && !isValid) {
				klass[_style2.default.invalid_input] = true;
			}

			var inputProps = {
				type: this.state.type || 'text',
				className: (0, _classnames2.default)(klass),
				placeholder: props.placeholder,
				value: props.value,
				required: !!props.required,
				onChange: this.onChange
			};

			// TODO render error hint

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(_style2.default.input_wrap, props.wrapClass) },
				_react2.default.createElement(
					'div',
					null,
					props.label ? _react2.default.createElement(
						'label',
						{ className: props.labelClass },
						props.label
					) : null,
					_react2.default.createElement('input', inputProps)
				)
			);
		}
	}]);

	return Input;
}(_react.Component);

exports.default = Input;