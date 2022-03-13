import React, { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

class DishDetail extends Component {

    renderComments(Comments) {
        if (Comments) {
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled ">
                        {Comments.map(comment => (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>{`-- ${comment.author}, ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}`}</p>
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

    render() {
        const { dish } = this.props;
        if (dish) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src={dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(dish.comments)}
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default DishDetail;