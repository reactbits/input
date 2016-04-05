import React from 'react';
import { render } from 'react-dom';
import { Form, Input } from '../src';
import { Button } from 'react-bootstrap';

function App() {
	const inputs = {
		email: {
			type: 'email',
			name: 'email',
			label: 'Email:',
			required: true,
		},
		password: {
			type: 'password',
			name: 'password',
			label: 'Password:',
			required: true,
		},
		name: {
			type: 'text',
			name: 'name',
			label: 'Name:',
		},
		age: {
			type: 'int',
			name: 'age',
			label: 'Age:',
			required: true,
		},
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

render(<App />, document.getElementById('root'));
