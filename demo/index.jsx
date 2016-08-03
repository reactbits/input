import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Flex, Box } from 'reflexbox';
import { Form, Input } from '../src';

function MyForm() {
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
		<div style={{ width: '400px', margin: '50px' }}>
			<Form onSubmit={submit}>
				<div>
					<Row>
						<Col xs={12}><Input {...inputs.email} /></Col>
					</Row>
					<Row>
						<Col xs={12}><Input {...inputs.password} /></Col>
					</Row>
					<Row>
						<Col xs={12}><Input {...inputs.name} /></Col>
					</Row>
					<Row>
						<Col xs={12}><Input {...inputs.age} /></Col>
					</Row>
				</div>
				<div>
					<Button type="submit" bsStyle="primary">Confirm</Button>
				</div>
			</Form>
		</div>
	);
}

class Dialog extends Component {
	constructor(props) {
		super(props);
		this.state = { show: true	};
	}

	render() {
		const close = () => this.setState({ show: false });
		const inputs = {
			name: {
				name: 'name',
				placeholder: 'Channel name',
				required: true,
			},
			description: {
				name: 'description',
				placeholder: 'Description',
			},
		};
		return (
			<Modal show={this.state.show} onHide={close}>
				<Form onSubmit={this.props.submit}>
					<Modal.Header closeButton>
						<Modal.Title>Create new channel</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Flex>
							<Box col={12}>
								<Input {...inputs.name} />
								<Input {...inputs.description} />
							</Box>
						</Flex>
					</Modal.Body>
					<Modal.Footer>
						<Button type="submit" bsStyle="primary">Create</Button>
						<Button onClick={close}>Cancel</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		);
	}
}

function showDialog() {
	let wrapper = null;
	const submit = data => {
		ReactDOM.unmountComponentAtNode(wrapper);
		wrapper.remove();
		console.log(data);
	};
	wrapper = document.body.appendChild(document.createElement('div'));
	ReactDOM.render(<Dialog submit={submit} />, wrapper);
}

function App() {
	return (
		<div>
			<MyForm />
			<Button onClick={showDialog}>Show Dialog</Button>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
