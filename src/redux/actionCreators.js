import {ADD_COMMENT, ADD_DISHES, DISHES_FAILED, DISHES_LOADING} from './ActionTypes';
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
	type: ADD_COMMENT,
	payload: { dishId, rating, author, comment }
})

export const fetchDishes = () => {
	return dispatch => {
		dispatch(dishesLoading(true));
		setTimeout(() => {
			dispatch(addDishes(DISHES));
		}, 2000);
	}
}

export const dishesLoading = () => ({
	type: DISHES_LOADING
})

export const dishesFailed = () => ({
	type: DISHES_FAILED
})

export const addDishes = (dishes) => ({
	type: ADD_DISHES,
	payload: dishes 
})
