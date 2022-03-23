import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Field, Form} from 'react-final-form';
import {Button, Modal, ModalBody, FormFeedback, Form as RsForm, FormGroup, Label, Input} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

function RenderComments({ comments }) {
	if (comments) {
		return (
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled ">
					{comments.map(comment => (
						<li key={comment.id}>
							<p>{comment.comment}</p>
							<p>{`-- ${comment.author}, ${new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</p>
						</li>
					))}
				</ul>
			</div>
		)
	} else {
		return (
			<div></div>
		)
	}
}

const CommentForm = ({ dish, addComment }) => {
	const [isOpen, setIsOpen] = useState(false);

	const minLength = len => val => (!val || val.length < len ? `Must be greater than ${len} characters` : undefined);
	const maxLength = len => val => (val && val.length > len ? `Must be ${len} characters or less` : undefined);
	const composeValidators = (...validators) => value =>
		validators.reduce((error, validator) => error || validator(value), undefined);

	const toogleForm = () => setIsOpen(!isOpen);
	const onSubmit = (values) => {
		toogleForm();
		addComment(dish.id, values.rating, values.author, values.comment);
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

function RenderDish({dish}) {
	return (
		<Card>
			<CardImg width="100%" src={dish.image} alt={dish.name} />
			<CardBody>
				<CardTitle>{dish.name}</CardTitle>
				<CardText>{dish.description}</CardText>
			</CardBody>
		</Card>
	)
}

const DishDetail = ({dish, comments, addComment}) => {
	if (dish) {
		return (
			<div className="container">
				<div className='row'>
					<Breadcrumb>
						<BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
						<BreadcrumbItem active>{dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className='col-12'>
						<h3>{dish.name}</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments={comments} addComment={addComment} />
						<CommentForm dish={dish} addComment={addComment} />
					</div>
				</div>
			</div>
		)
	} else {
		return <div></div>
	}
}

export default DishDetail;
