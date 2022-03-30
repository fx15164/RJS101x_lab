import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { reset } from 'redux-form';
import { fetchComments, fetchDishes, fetchPromos, postComment } from '../redux/actionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Main extends Component {

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    componentDidMount() {
        this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
    }

    render() {

        const { dishes, promotions, leaders, comments, postComment, resetFeedbackForm} = this.props;

        const HomePage = () => {
            return(
                <Home 
					dishesLoading={dishes.isLoading}
					dishErrMess={dishes.errMess}
                    dish={dishes.dishes.filter(dish => dish.featured)[0]}
					promoLoading={promotions.isLoading}
					promoErrMess={promotions.errMess}
                    promotion={promotions.promotions.filter(promotion => promotion.featured)[0]}
                    leader={leaders.filter(leader => leader.featured)[0]}
                />
            );
          }

        const DishWithId = ({ match }) => 
            <DishDetail 
                dish={dishes.dishes.filter(dish => dish.id == match.params.dishId)[0]} 
				dishesLoading={dishes.isLoading}
				errMess={dishes.errMess}
                comments={comments.comments.filter(comment => comment.dishId == match.params.dishId)}
				commentsErrMess={comments.comments.errMess}
				postComment={postComment}
            />

        return (
            <div>
                <Header />
				<TransitionGroup>
					<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
						<Switch >
							<Route path='/home' component={HomePage} />
							<Route exact path='/menu' component={() => <Menu dishes={dishes.dishes} />} />
							<Route path='/menu/:dishId' component={DishWithId} />
							<Route path='/contactus' component={() => <Contact resetFeedbackForm={resetFeedbackForm} />} />
							<Redirect to='/home' />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
	postComment: (dishId, rating, name, comment) => dispatch(postComment(dishId, rating, name, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
	fetchComments: () => dispatch(fetchComments()),
	fetchPromos: () => dispatch(fetchPromos()),
	resetFeedbackForm: () => dispatch(reset('feedback'))
})

const mapStateToProps = state => {
	return {
            dishes: state.dishes,
            comments: state.comments,
            promotions: state.promotions,
            leaders: state.leaders
        };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
