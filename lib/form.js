'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.isValid = _this.isValid.bind(_this);
    _this.getValue = _this.getValue.bind(_this);
    _this.submit = _this.submit.bind(_this);

    _this.state = {
      data: {},
      validationState: {},
      showError: false
    };
    return _this;
  }

  _createClass(Form, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        form: {
          onInputChange: this.onInputChange,
          isValid: this.isValid,
          showError: this.state.showError,
          getValue: this.getValue
        }
      };
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(name, value, isValid) {
      var valueChanged = this.getValue(name) !== value;
      var validChanged = this.state.validationState[name] !== isValid;
      if (!valueChanged && !validChanged) {
        return;
      }

      var data = _lodash2.default.assign({}, this.state.data, _defineProperty({}, name, value));
      var validationState = _lodash2.default.assign({}, this.state.validationState, _defineProperty({}, name, isValid));

      this.setState({
        data: data,
        validationState: validationState,
        showError: false
      });

      var isFormValid = _lodash2.default.reduce(validationState, function (p, v) {
        return p && v;
      }, true);
      this.props.onChange(data, isFormValid);
    }
  }, {
    key: 'getValue',
    value: function getValue(name) {
      return this.state.data[name];
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      return _lodash2.default.reduce(this.state.validationState, function (p, v) {
        return p && v;
      }, true);
    }
  }, {
    key: 'submit',
    value: function submit(event) {
      if (event) event.preventDefault();

      if (!this.isValid()) {
        this.setState({ showError: true });
        return;
      }

      this.setState({ showError: false });
      this.props.onSubmit(this.state.data);
    }
  }, {
    key: 'render',
    value: function render() {
      var formProps = {
        className: this.props.className,
        style: this.props.style || {},
        onSubmit: this.submit
      };
      return _react2.default.createElement(
        'form',
        formProps,
        this.props.children
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.childContextTypes = {
  form: _react.PropTypes.object
};
Form.propTypes = {
  className: _react.PropTypes.string,
  style: _react.PropTypes.object, // eslint-disable-line
  onChange: _react.PropTypes.func,
  onSubmit: _react.PropTypes.func
};
Form.defaultProps = {
  onChange: _lodash2.default.noop,
  onSubmit: _lodash2.default.noop
};
exports.default = Form;