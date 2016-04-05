import React, { Component } from 'react';
import { render } from 'react-dom';
import { Form, Input } from '../src';
import { Button } from 'react-bootstrap';

class App extends Component {
	constructor(props)	 {
		super(props);
		this.state = {
			data: {},
		};
	}

	makeInput(spec) {
		const changeHandler = name => value => {
			const data = { ...this.state.data, [name]: value };
			this.setState({ data });
		};
		return {
			...spec,
			value: this.state.data[spec.name],
			onChange: changeHandler(spec.name),
		};
	}

	render() {
		const inputs = {
			email: this.makeInput({
				type: 'email',
				name: 'email',
				label: 'Email:',
				required: true,
			}),
			password: this.makeInput({
				type: 'password',
				name: 'password',
				label: 'Password:',
				required: true,
			}),
			name: this.makeInput({
				type: 'text',
				name: 'name',
				label: 'Name:',
			}),
			age: this.makeInput({
				type: 'int',
				name: 'age',
				label: 'Age:',
				required: true,
			}),
		};

		const submit = data => {
			console.log(data);
		};

		return (
			<Form onSubmit={submit}>
				<div>
					<Input {...inputs.email} />
					<Input {...inputs.password} />
					<Input {...inputs.name} />
					<Input {...inputs.age} />
				</div>
				<div>
					<Button type="submit" bsStyle="primary">Confirm</Button>
				</div>
			</Form>
		);
	}
}

render(<App />, document.getElementById('root'));
