import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class Form extends Component {
  static childContextTypes = {
    form: PropTypes.object,
  };

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onChange: _.noop,
    onSubmit: _.noop,
  };

  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.getValue = this.getValue.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      data: {},
      validationState: {},
      showError: false,
    };
  }

  getChildContext() {
    return {
      form: {
        onInputChange: this.onInputChange,
        isValid: this.isValid,
        showError: this.state.showError,
        getValue: this.getValue,
      },
    };
  }

  onInputChange(name, value, isValid) {
    const valueChanged = this.getValue(name) !== value;
    const validChanged = this.state.validationState[name] !== isValid;
    if (!valueChanged && !validChanged) {
      return;
    }

    const data = _.assign({}, this.state.data, { [name]: value });
    const validationState = _.assign({}, this.state.validationState, { [name]: isValid });

    this.setState({
      data,
      validationState,
      showError: false,
    });

    const isFormValid = _.reduce(validationState, (p, v) => p && v, true);
    this.props.onChange(data, isFormValid);
  }

  getValue(name) {
    return this.state.data[name];
  }

  isValid() {
    return _.reduce(this.state.validationState, (p, v) => p && v, true);
  }

  submit(event) {
    if (event) event.preventDefault();

    if (!this.isValid()) {
      this.setState({ showError: true });
      return;
    }

    this.setState({ showError: false });
    this.props.onSubmit(this.state.data);
  }

  render() {
    const formProps = {
      className: this.props.className,
      style: this.props.style || {},
      onSubmit: this.submit,
    };
    return (
      <form {...formProps}>
        {this.props.children}
      </form>
    );
  }
}
