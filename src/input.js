import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import makeValidator from './validate';
import styles from './style';
import _ from 'lodash';

function inputType(spec) {
	if (!spec) return 'text';
	if (_.isString(spec)) {
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

export default class Input extends Component {
	static propTypes = {
		value: PropTypes.any,
		type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		label: PropTypes.string,
		className: PropTypes.string,
		style: PropTypes.object,
		placeholder: PropTypes.string,
		required: PropTypes.bool,
		onChange: PropTypes.func,
	};

	static defaultProps = {
		onChange: _.noop,
	};

	static contextTypes = {
		form: PropTypes.object,
	};

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
		this.onChangeInternal(this.props.value, isValid);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			type: inputType(nextProps.type),
			validate: makeValidator(nextProps.type),
		});
	}

	onChange(e) {
		const value = e.target.value;
		const isValid = this.validate(value);
		this.onChangeInternal(value, isValid);
	}

	onChangeInternal(value, isValid) {
		this.props.onChange(value, isValid);

		const form = _.get(this, 'context.form');
		if (_.isObject(form) && _.isFunction(form.onInputChange)) {
			form.onInputChange(this.props.name, value, isValid);
		}
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
		};

		const form = _.get(this, 'context.form');
		const hiddenInvalidState = props.hiddenInvalidState
			|| (_.isObject(form) && form.hiddenInvalidState);
		if (!hiddenInvalidState && !isValid) {
			klass[styles.invalid_input] = true;
		}

		const inputProps = {
			type: this.state.type || 'text',
			className: classNames(props.className, klass),
			placeholder: props.placeholder,
			value: props.value,
			required: !!props.required,
			onChange: this.onChange,
			style: this.props.style || {},
		};

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
