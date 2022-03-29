import {ADD_COMMENT, ADD_COMMENTS, ADD_DISHES, ADD_PROMOS, COMMENTS_FAILED, DISHES_FAILED, DISHES_LOADING, PROMOS_FAILED, PROMOS_LOADING} from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchDishes = () => {
	return dispatch => fetch(baseUrl + 'dishes')
		.then(res => res.json())
		.then(dishes => dispatch(addDishes(dishes)));
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

export const fetchComments = () => dispatch => {
	return fetch(baseUrl + 'comments')
		.then(res => res.json())
		.then(comments => dispatch(addComments(comments)));
}

export const addComments = (comments) => ({
	type: ADD_COMMENTS,
	payload: comments
})

export const commentsFailed = (errMess) => ({
	type: COMMENTS_FAILED,
	payload: errMess
})


export const fetchPromos = () => dispatch => {
	dispatch(promosLoading());

	return fetch(baseUrl + 'promotions')
		.then(res => res.json())
		.then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
	type: PROMOS_LOADING
})

export const addPromos = (promos) => ({
	type: ADD_PROMOS,
	payload: promos
})

export const addComment = (dishId, rating, name, comment) => {
	return {
		type: ADD_COMMENT,
		payload: { dishId, rating, name, comment }
	}
}

export const promosFailed = errMess => ({
	type: PROMOS_FAILED,
	payload: errMess
})
