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
				return 'date';
			case 'email':
				return 'email';
			case 'password':
				return 'password';
			case 'number':
				return 'number';
			default:
				return 'text';
		}
	}
	return 'text';
}

// TODO pattern validation
// TODO min, max, range constraints
// TODO minLength, maxLength constraints
// TODO render error hint
// TODO boolean switch/checkbox

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
			var value = this.getValue(this.props);
			var isValid = this.validate(value);
			this.onChangeInternal(value, isValid);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				type: inputType(nextProps.type),
				validate: (0, _validate2.default)(nextProps.type)
			});

			var value = this.getValue(this.props);
			var isValid = this.validate(value);
			this.onChangeInternal(value, isValid);
		}
	}, {
		key: 'onChange',
		value: function onChange(e) {
			var value = e.target.value;
			var isValid = this.validate(value);
			this.onChangeInternal(value, isValid);
		}
	}, {
		key: 'onChangeInternal',
		value: function onChangeInternal(value, isValid) {
			this.props.onChange(value, isValid);

			var form = this.myForm();
			if (_lodash2.default.isObject(form) && _lodash2.default.isFunction(form.onInputChange)) {
				form.onInputChange(this.props.name, value, isValid);
			}
		}
	}, {
		key: 'getValue',
		value: function getValue(props) {
			if (props.value === undefined || props.value === null) {
				var form = this.myForm();
				return _lodash2.default.isObject(form) && _lodash2.default.isFunction(form.getValue) ? form.getValue(props.name) : '';
			}
			return props.value;
		}
	}, {
		key: 'myForm',
		value: function myForm() {
			return this.context ? this.context.form : null;
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
			var props = this.props;
			var value = this.getValue(props);
			var isValid = this.validate(value);

			var klass = _defineProperty({}, _style2.default.input, true);

			var form = this.myForm();
			var hiddenInvalidState = props.hiddenInvalidState || _lodash2.default.isObject(form) && form.hiddenInvalidState;
			if (!hiddenInvalidState && !isValid) {
				klass[_style2.default.invalid_input] = true;
			}

			var inputProps = {
				type: this.state.type || 'text',
				className: (0, _classnames2.default)(props.className, klass),
				placeholder: props.placeholder,
				value: props.value,
				required: !!props.required,
				onChange: this.onChange,
				style: this.props.style || {}
			};

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

Input.propTypes = {
	value: _react.PropTypes.any,
	type: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
	label: _react.PropTypes.string,
	className: _react.PropTypes.string,
	style: _react.PropTypes.object,
	placeholder: _react.PropTypes.string,
	required: _react.PropTypes.bool,
	onChange: _react.PropTypes.func
};
Input.defaultProps = {
	onChange: _lodash2.default.noop
};
Input.contextTypes = {
	form: _react.PropTypes.object
};
exports.default = Input;