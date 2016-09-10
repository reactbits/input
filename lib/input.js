'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      case 'confirm-password':
        return 'password';
      case 'number':
        return 'number';
      case 'checkbox':
      case 'bool':
      case 'boolean':
        return 'checkbox';
      default:
        return 'text';
    }
  }
  return 'text';
}

// TODO pattern validation
// TODO min, max, range constraints
// TODO minLength, maxLength constraints
// TODO boolean switch/checkbox

var FormInput = function (_Component) {
  _inherits(FormInput, _Component);

  /* eslint-enable */

  function FormInput(props) {
    _classCallCheck(this, FormInput);

    var _this = _possibleConstructorReturn(this, (FormInput.__proto__ || Object.getPrototypeOf(FormInput)).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    _this.state = _this.makeInitialState(props);
    return _this;
  }
  /* eslint-disable react/no-unused-prop-types */


  _createClass(FormInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var value = this.getValue(this.props);
      var isValid = this.validate(value);
      this.onChangeInternal(value, isValid);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.makeInitialState(nextProps));
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
    key: 'makeInitialState',
    value: function makeInitialState(props) {
      var _this2 = this;

      var validate = (0, _validate2.default)(props.type);
      if (props.type === 'confirm-password') {
        validate = function validate(v) {
          var form = _this2.myForm();
          return form ? form.getValue('password') === v : true;
        };
      }
      return {
        type: inputType(props.type),
        validate: validate
      };
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
      var value = this.getValue(this.props);
      var isValid = this.validate(value);

      var inputProps = _extends({}, this.props, {
        type: this.state.type || 'text',
        value: value,
        onChange: this.onChange
      });

      var form = this.myForm();
      var showError = this.props.showError || _lodash2.default.isObject(form) && form.showError;
      if (showError && !isValid) {
        inputProps.bsStyle = 'error';
        // TODO add error help
      }

      return _react2.default.createElement(_reactBootstrap.Input, inputProps);
    }
  }]);

  return FormInput;
}(_react.Component);

FormInput.propTypes = {
  type: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
  label: _react.PropTypes.node,
  help: _react.PropTypes.node,
  addonBefore: _react.PropTypes.node,
  addonAfter: _react.PropTypes.node,
  buttonBefore: _react.PropTypes.node,
  buttonAfter: _react.PropTypes.node,
  bsSize: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  bsStyle: _react.PropTypes.oneOf(['success', 'warning', 'error']),
  hasFeedback: _react.PropTypes.bool,
  feedbackIcon: _react.PropTypes.node,
  id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  groupClassName: _react.PropTypes.string,
  wrapperClassName: _react.PropTypes.string,
  labelClassName: _react.PropTypes.string,
  multiple: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  required: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  showError: _react.PropTypes.bool
};
FormInput.defaultProps = {
  disabled: false,
  hasFeedback: false,
  multiple: false,
  onChange: _lodash2.default.noop
};
FormInput.contextTypes = {
  form: _react.PropTypes.object
};
exports.default = FormInput;