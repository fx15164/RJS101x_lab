import { COMMENTS } from '../shared/comments'; 
import {ADD_COMMENT} from './ActionTypes';

export default (state = COMMENTS, action) => {
	switch (action.type) {
		case ADD_COMMENT:
			let comment = action.payload;
			comment.id = state.length;
			comment.date = new Date().toISOString();
			console.log("Comment: ", comment);
			return [...state, comment];
		default:
			return state;
	}
}
