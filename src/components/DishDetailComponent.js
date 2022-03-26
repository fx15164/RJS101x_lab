import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import CommentForm from './CommentForm';
import Loading from './LoadingComponent';

function RenderComments({comments}) {
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

const DishDetail = ({dish, comments, addComment, dishesLoading, errMess}) => {
	if (dishesLoading) {
		return (
			<div className="container">
				<Loading />
			</div>
		)
	} else if (errMess) {
		return (
			<div className="container">
				<h4>{errMess}</h4>
			</div>
		)
	} else if (dish) {
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
