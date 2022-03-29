import React, {useState} from 'react';
import {Field, Form} from 'react-final-form';
import {Button, Modal, ModalBody, FormFeedback, Form as RsForm, FormGroup, Label, Input} from 'reactstrap';

const CommentForm = ({ dish, postComment }) => {
	const [isOpen, setIsOpen] = useState(false);

	const minLength = len => val => (!val || val.length < len ? `Must be greater than ${len} characters` : undefined);
	const maxLength = len => val => (val && val.length > len ? `Must be ${len} characters or less` : undefined);
	const composeValidators = (...validators) => value =>
		validators.reduce((error, validator) => error || validator(value), undefined);

	const toogleForm = () => setIsOpen(!isOpen);
	const onSubmit = (values) => {
		toogleForm();
		postComment(dish.id, values.rating, values.author, values.comment);
	}
	return (
		<div>
			<Button size="sm" outline color="secondary" className="mb-4" onClick={toogleForm}>Submit Comment</Button>
			<Modal isOpen={isOpen} toggle={toogleForm}>
				<ModalBody>
					<Form
						onSubmit={onSubmit}
						render={({handleSubmit, form}) => (
							<form onSubmit={handleSubmit}>
								<Field name='rating' defaultValue="1">
									{({input, meta}) => (
										<FormGroup>
											<Label htmlFor="rating">Rating</Label>
											<Input className="w-100" type="select" id="rating" {...input}>
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
											</Input>
										</FormGroup>
									)}
								</Field>
								<Field name='author' validate={composeValidators(minLength(3), maxLength(15))}>
									{({input, meta}) => (
										<FormGroup>
											<Label htmlFor="author">Name</Label>
											<Input type="text" id="author" {...input} />
											{meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
										</FormGroup>
									)}
								</Field>
								<Field name='comment'>
									{({input, meta}) => (
										<FormGroup>
											<Label htmlFor="comment">Comment</Label>
											<Input type="textarea" row="5" id="comment" {...input} />
										</FormGroup>
									)}
								</Field>
								<Button type="submit">Submit</Button>
							</form>
						)}
					/>
				</ModalBody>
			</Modal>
		</div>
	)
}
export default CommentForm;
