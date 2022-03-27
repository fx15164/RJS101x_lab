import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {
	Form, Button, FormGroup, Label, Input, Col
} from 'reactstrap';



const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const minLength = min => value =>
  !value || value.length < min ? `Must be at least ${min} characters` : undefined
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const minLength3 = minLength(3);
const maxLength15 = maxLength(15);

const renderInput = (props) => {
	const {input, children, meta} = props;
	return (
		<>
			<Input
				{...props}
				{...input}
			>
				{children}
			</Input>
			{meta.touched && meta.error && <div className='text-danger'>{meta.error}</div>}
		</>
	)
}


const ContactForm = ({handleSubmit}) => {
	return (

		<Form onSubmit={handleSubmit}>
			<FormGroup row>
				<Label htmlFor='firstname' md={2}>Firstname</Label>
				<Col md={10}>
					<Field
						type='text' id='firstname'
						name="firstname"
						placeholder="First name"
						component={renderInput}
						validate={[required, minLength3, maxLength15]}
					/>
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label htmlFor='lastname' md={2}>Lastname</Label>
				<Col md={10}>
					<Field
						type='text'
						id='lastname'
						name="lastname"
						placeholder="Last name"
						component={renderInput}
						validate={[required, minLength3, maxLength15]}
					/>
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label htmlFor='telnum' md={2}>Telnum</Label>
				<Col md={10}>
					<Field
						type='tel'
						id='telnum'
						name="telnum"
						placeholder="Contact Tel"
						component={renderInput}
						validate={[required, number, minLength3, maxLength15]}
					/>
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label htmlFor='email' md={2}>Email</Label>
				<Col md={10}>
					<Field
						type='text'
						id='email'
						name="email"
						placeholder="Email"
						component={renderInput}
						validate={[required, email, minLength3, maxLength15]}
					/>
				</Col>
			</FormGroup>
			<FormGroup row>
				<Col md={{size: 6, offset: 2}}>
					<FormGroup check>
						<Label check>
							<Field
								name="agree"
								type='checkbox'
								component={renderInput}
							/>
							<strong>May we contact you?</strong>
						</Label>
					</FormGroup>
				</Col>
				<Col md={{size: 3, offset: 1}}>
					<FormGroup check>
						<Label check>
							<Field type='select'
								name="contactType"
								component={renderInput}
							>
								<option>Tel.</option>
								<option>Email</option>
							</Field>
						</Label>
					</FormGroup>
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label md={2}>Message</Label>
				<Col md={10}>
					<Field
						type='textarea'
						rows="10"
						id='message'
						name="message"
						component={renderInput}
					/>
				</Col>
			</FormGroup>
			<FormGroup row>
				<Col md={{size: 10, offset: 2}}>
					<Button type='submit' color='primary'>
						Send your Feedback
					</Button>
				</Col>
			</FormGroup>
		</Form>
	)
}

export default reduxForm({
	form: 'feedback'
})(ContactForm);
