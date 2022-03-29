import {ADD_COMMENT, ADD_COMMENTS, COMMENTS_FAILED} from './ActionTypes';

export default (state = {errMess: null, comments: []}, action) => {
	switch (action.type) {
		case ADD_COMMENTS:
			return {...state, errMess: null, comments: action.payload};
		case COMMENTS_FAILED:
			return {...state, errMess: action.payload};
		case ADD_COMMENT:
			let comment = action.payload;
			console.log("Comment: ", comment);
			return {...state, comments: [...state.comments, comment]};
		default:
			return state;
	}
}
