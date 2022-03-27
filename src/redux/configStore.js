import {applyMiddleware, createStore} from "redux"
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as formReducer } from "redux-form";
import dishes from './dishes';
import comments from './comments';
import promotions from './promotions';
import leaders from './leaders';

export const configStore = () => {
	const store = createStore(
		combineReducers({
			dishes,
			comments,
			promotions,
			leaders,
			form: formReducer
		}),
		applyMiddleware(thunk)
	)
	return store
}
