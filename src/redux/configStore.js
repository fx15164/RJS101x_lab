import {createStore} from "redux"
import {combineReducers} from 'redux';
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
			leaders
		}))
	return store
}
