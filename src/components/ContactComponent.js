import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import {
    Form as Formx,
    Button, FormGroup, Label, Input, Col
} from 'reactstrap';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(values) {
        console.log(values);
    }


    render() {

        const required = (val) => val ? undefined : 'Required';
        const maxLength = (len) => (val) => !(val) || (val.length <= len) ? undefined : `Must be ${len} characters or less`;
        const minLength = (len) => (val) => val && (val.length >= len) ? undefined : `'Must be greater than ${len} characters`;
        const isNumber = (val) => !isNaN(Number(val)) ? undefined : 'Must be a number';
        const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val) ? undefined : 'Invalid Email Address';
        const composeValidators = (...validators) => value =>
            validators.reduce((error, validator) => error || validator(value), undefined)

        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-md-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-md-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-md-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>

                <div className='row row-content'>
                    <div className='col-12'>
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className='col-12 col-md-9'>
                        <Form
                            onSubmit={this.handleSubmit}
                            render={({ handleSubmit, pristine, form, submitting }) => (
                                <Formx onSubmit={handleSubmit}>
                                    <Field name='firstname' validate={composeValidators(required, minLength(3), maxLength(15))}>
                                        {({ input, meta }) => (
                                            <FormGroup row>
                                                <Label htmlFor='firstname' md={2}>Firstname</Label>
                                                <Col md={10}>
                                                    <Input
                                                        {...input}
                                                        type='text' id='firstname'
                                                        placeholder="First name"
                                                    />
                                                    {meta.touched && meta.error && <div className='text-danger'>{meta.error}</div>}
                                                </Col>
                                            </FormGroup>
                                        )}
                                    </Field>
                                    <Field name='lastname' validate={composeValidators(required, minLength(2), maxLength(15))}>
                                        {({ input, meta }) => (
                                            <FormGroup row>
                                                <Label htmlFor='lastname' md={2}>Lastname</Label>
                                                <Col md={10}>
                                                    <Input
                                                        {...input}
                                                        type='text' id='lastname'
                                                        placeholder="Lirst name"
                                                    />
                                                    {meta.touched && meta.error && <div className='text-danger'>{meta.error}</div>}
                                                </Col>
                                            </FormGroup>
                                        )}
                                    </Field>
                                    <Field name='telnum' validate={composeValidators(required, minLength(2), maxLength(15), isNumber)}>
                                        {({ input, meta }) => (
                                            <FormGroup row>
                                                <Label htmlFor='telnum' md={2}>telnum</Label>
                                                <Col md={10}>
                                                    <Input
                                                        {...input}
                                                        type='tel' id='telnum'
                                                        placeholder="Contact Tel"
                                                    />
                                                    {meta.touched && meta.error && <div className='text-danger'>{meta.error}</div>}
                                                </Col>
                                            </FormGroup>
                                        )}
                                    </Field>
                                    <Field name='email' validate={composeValidators(required, minLength(2), maxLength(15), validEmail)}>
                                        {({ input, meta }) => (
                                            <FormGroup row>
                                                <Label htmlFor='email' md={2}>Email</Label>
                                                <Col md={10}>
                                                    <Input
                                                        {...input}
                                                        type='text' id='email'
                                                        placeholder="Lirst name"
                                                    />
                                                    {meta.touched && meta.error && <div className='text-danger'>{meta.error}</div>}
                                                </Col>
                                            </FormGroup>
                                        )}
                                    </Field>
                                    <FormGroup row>
                                        <Field name='agree' type='checkbox'>
                                            {({ input }) => (
                                                <Col md={{ size: 6, offset: 2 }}>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type='checkbox'
                                                                {...input}
                                                            />
                                                            <strong>May we contact you?</strong>
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                            )}
                                        </Field>
                                        <Field name='contactType'>
                                            {({ input }) => (
                                                <Col md={{ size: 3, offset: 1 }}>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type='select'
                                                                {...input}
                                                            >
                                                                <option>Tel.</option>
                                                                <option>Email</option>
                                                            </Input>
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                            )}
                                        </Field>
                                    </FormGroup>
                                    <Field name='message'>
                                        {({ input }) => (
                                            <FormGroup row>
                                                <Label md={2}>Message</Label>
                                                <Col md={10}>
                                                    <Input type='textarea' rows={12} id='message'
                                                        {...input}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        )}
                                    </Field>
                                    <FormGroup row>
                                        <Col md={{ size: 10, offset: 2 }}>
                                            <Button type='submit' onClick={form.reset} disabled={submitting || pristine} color='primary'>
                                                Send your Feedback
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Formx>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
