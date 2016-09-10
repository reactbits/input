import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import makeValidator from './validate';

function inputType(spec) {
  if (!spec) return 'text';
  if (_.isString(spec)) {
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

export default class FormInput extends Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    label: PropTypes.node,
    help: PropTypes.node,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    buttonBefore: PropTypes.node,
    buttonAfter: PropTypes.node,
    bsSize: PropTypes.oneOf(['small', 'medium', 'large']),
    bsStyle: PropTypes.oneOf(['success', 'warning', 'error']),
    hasFeedback: PropTypes.bool,
    feedbackIcon: PropTypes.node,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    groupClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    showError: PropTypes.bool,
  };
  /* eslint-enable */

  static defaultProps = {
    disabled: false,
    hasFeedback: false,
    multiple: false,
    onChange: _.noop,
  };

  static contextTypes = {
    form: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = this.makeInitialState(props);
  }

  componentDidMount() {
    const value = this.getValue(this.props);
    const isValid = this.validate(value);
    this.onChangeInternal(value, isValid);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.makeInitialState(nextProps));
    const value = this.getValue(this.props);
    const isValid = this.validate(value);
    this.onChangeInternal(value, isValid);
  }

  onChange(e) {
    const value = e.target.value;
    const isValid = this.validate(value);
    this.onChangeInternal(value, isValid);
  }

  onChangeInternal(value, isValid) {
    this.props.onChange(value, isValid);

    const form = this.myForm();
    if (_.isObject(form) && _.isFunction(form.onInputChange)) {
      form.onInputChange(this.props.name, value, isValid);
    }
  }

  getValue(props) {
    if (props.value === undefined || props.value === null) {
      const form = this.myForm();
      return _.isObject(form) && _.isFunction(form.getValue)
        ? form.getValue(props.name)
        : '';
    }
    return props.value;
  }

  makeInitialState(props) {
    let validate = makeValidator(props.type);
    if (props.type === 'confirm-password') {
      validate = v => {
        const form = this.myForm();
        return form ? form.getValue('password') === v : true;
      };
    }
    return {
      type: inputType(props.type),
      validate,
    };
  }

  myForm() {
    return this.context ? this.context.form : null;
  }

  validate(value) {
    if (!value) {
      return !this.props.required;
    }
    return this.state.validate(value);
  }

  render() {
    const value = this.getValue(this.props);
    const isValid = this.validate(value);

    const inputProps = {
      ...this.props,
      type: this.state.type || 'text',
      value,
      onChange: this.onChange,
    };

    const form = this.myForm();
    const showError = this.props.showError || (_.isObject(form) && form.showError);
    if (showError && !isValid) {
      inputProps.bsStyle = 'error';
      // TODO add error help
    }

    return <Input {...inputProps} />;
  }
}
