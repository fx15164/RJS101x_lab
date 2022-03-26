import {ADD_DISHES, DISHES_FAILED, DISHES_LOADING} from './ActionTypes';

const initState = {
	isLoading: true,
	errMess: null,
	dishes: []
}
export default (state = initState, action) => {
	switch (action.type) {
		case DISHES_LOADING:
			return {...state, isLoading: true, errMess: null, dishes: []};
		case DISHES_FAILED:
			return {...state, isLoading: false, errMess: action.payload};
		case ADD_DISHES:
			return {...state, isLoading: false, errMess: null, dishes: action.payload}
		default:
			return state;
	}
}
