import {ADD_COMMENT, ADD_COMMENTS, ADD_DISHES, ADD_PROMOS, COMMENTS_FAILED, DISHES_FAILED, DISHES_LOADING, PROMOS_FAILED, PROMOS_LOADING} from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const fetchDishes = () => {
	return dispatch => fetch(baseUrl + 'dishes')
		.then(
			res => {
				if (res.ok) {
					return res;
				} else {
					const err = new Error(`Error ${res.status}: ${res.statusText}`);
					throw err;
				}
			},
			err => {
				throw new Error(err.message);
			}
		)
		.then(res => res.json())
		.then(dishes => dispatch(addDishes(dishes)))
		.catch(err => {
			dispatch(dishesFailed(err.message))
		})
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
		.then(
			res => {
				if (res.ok) {
					return res;
				} else {
					const err = new Error(`Error ${res.status}: ${res.statusText}`);
					throw err;
				}
			},
			err => {
				throw new Error(err.message);
			}
		)
		.then(res => res.json())
		.then(comments => dispatch(addComments(comments)))
		.catch(err => dispatch(commentsFailed(err.message)));
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
		.then(
			res => {
				if (res.ok) {
					return res;
				} else {
					const err = new Error(`Error ${res.status}: ${res.statusText}`);
					throw err;
				}
			},
			err => {
				throw new Error(err.message);
			}
		)
		.then(res => res.json())
		.then(promos => dispatch(addPromos(promos)))
		.catch(err => dispatch(promosFailed(err.message)));
}

export const promosLoading = () => ({
	type: PROMOS_LOADING
})

export const addPromos = (promos) => ({
	type: ADD_PROMOS,
	payload: promos
})

export const promosFailed = errMess => ({
	type: PROMOS_FAILED,
	payload: errMess
})

export const postComment = (dishId, rating, author, comment) => dispatch => {
	const newComment = {dishId, rating, author, comment};
	newComment.date = new Date().toISOString();

	return fetch(baseUrl + 'comments', {
		method: 'POST',
		body: JSON.stringify(newComment),
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "same-origin"
	})
	.then(
		res => {
			if (res.ok) {
				return res;
			} else {
				const err = new Error(`Error ${res.status}: ${res.statusText}`);
				throw err;
			}
		},
		err => {
			throw new Error(err.message);
		}
	)
		.then(res => res.json())
		.then(res => dispatch(addComment(res)))
		.catch(err => { console.log('post comments', err.message); alert('Your comment could not be posted\nError: '+err.message); })
}

export const addComment = comment => {
	return {
		type: ADD_COMMENT,
		payload: comment 
	}
}

