import {ADD_PROMOS, PROMOS_FAILED, PROMOS_LOADING} from './ActionTypes';

export default (state = { errMess: null, isLoading: true, promotions: [] }, action) => {
	switch (action.type) {
		case ADD_PROMOS:
			return {...state, errMess: null, isLoading: false, promotions: action.payload}
		case PROMOS_FAILED:
			return {...state, isLoading: false, errMess: action.payload};
		case PROMOS_LOADING:
			return {...state, isLoading: true, errMess: null, promotions: []};
		default:
			return state;
	}
}
