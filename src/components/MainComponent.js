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
import { addComment } from '../redux/actionCreators';

class Main extends Component {

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {

        const { dishes, promotions, leaders, comments, addComment } = this.props;

        const HomePage = () => {
            return(
                <Home 
                    dish={dishes.filter(dish => dish.featured)[0]}
                    promotion={promotions.filter(promotion => promotion.featured)[0]}
                    leader={leaders.filter(leader => leader.featured)[0]}
                />
            );
          }

        const DishWithId = ({ match }) => 
            <DishDetail 
                dish={dishes.filter(dish => dish.id == match.params.dishId)[0]} 
                comments={comments.filter(comment => comment.dishId == match.params.dishId)}
				addComment={addComment}
            />

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
	addComment: (dishId, rating, name, comment) => dispatch(addComment(dishId, rating, name, comment))
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
