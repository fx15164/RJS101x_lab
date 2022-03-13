import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {

        const { dishes, promotions, leaders, comments } = this.state;

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
            />

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;