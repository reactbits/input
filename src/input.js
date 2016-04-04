import React, { Component } from 'react';
import classNames from 'classnames';
import makeValidator from './validate';
import styles from './style';
import _ from 'lodash';

function inputType(spec) {
	if (!spec) return 'text';
	if (_.isString(spec)) {
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

export default class Input extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = {
			type: inputType(props.type),
			validate: makeValidator(props.type),
		};
	}

	componentDidMount() {
		const isValid = this.validate(this.props.value);
		if (!isValid) {
			this.onChange({ target: { value: this.props.value } });
		}
	}

	onChange(e) {
		const value = e.target.value;
		const isValid = this.validate(value);
		this.props.onChange(value, isValid);
	}

	validate(value) {
		if (!value) {
			return !this.props.required;
		}
		return this.state.validate(value);
	}

	render() {
		const props = this.props;
		const isValid = this.validate(props.value);

		const klass = {
			[styles.input]: true,
			[props.className]: true,
		};
		if (!props.hiddenInvalidState && !isValid) {
			klass[styles.invalid_input] = true;
		}

		const inputProps = {
			type: this.state.type || 'text',
			className: classNames(klass),
			placeholder: props.placeholder,
			value: props.value,
			required: !!props.required,
			onChange: this.onChange,
		};

		// TODO render error hint

		return (
			<div className={classNames(styles.input_wrap, props.wrapClass)}>
				<div>
					{props.label ? <label className={props.labelClass}>{props.label}</label> : null}
					<input {...inputProps} />
				</div>
			</div>
		);
	}
}
