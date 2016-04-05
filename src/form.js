import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class Form extends Component {
	static childContextTypes = {
		form: PropTypes.object,
	};

	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
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

		this.state = {
			data: {},
			validationState: {},
			hiddenInvalidState: true,
		};
	}

	getChildContext() {
		return {
			form: {
				onInputChange: this.onInputChange,
				isValid: this.isValid,
				hiddenInvalidState: this.state.hiddenInvalidState,
				getValue: this.getValue,
			},
		};
	}

	onInputChange(name, value, isValid) {
		this.props.onChange(name, value, isValid);

		const data = _.assign({}, this.state.data, { [name]: value });
		const validationState = _.assign({}, this.state.validationState, { [name]: isValid });

		this.setState({
			data,
			validationState,
			hiddenInvalidState: true,
		});
	}

	getValue(name) {
		return this.state.data[name];
	}

	isValid() {
		return _.reduce(this.state.validationState, (p, v) => p && v, true);
	}

	render() {
		const submit = e => {
			e.preventDefault();
			e.stopPropagation();

			if (!this.isValid()) {
				this.setState({ hiddenInvalidState: false });
				return;
			}

			this.setState({ hiddenInvalidState: true });
			this.props.onSubmit(this.state.data);
		};

		const formProps = {
			className: this.props.className,
			style: this.props.style || {},
			onSubmit: submit,
		};

		return (
			<form {...formProps}>
				{this.props.children}
			</form>
		);
	}
}
