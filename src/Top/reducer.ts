// Import Reducer type
import { Reducer } from 'redux';
import {
	SUPPORT_TOP, TopActions, TopActionTypes
} from './actions';
import { ITop, ITopState } from './types';

const initialTop: ITop = {
	isAuthenticated: false
};

const initialTopState: ITopState = {
	top: initialTop
};

const aTypesToStore = Object.keys(TopActionTypes).filter(a => a !== TopActionTypes.LOAD_TOP);

export const topReducer: Reducer<ITopState, TopActions> = (state, action) => {
	const newState = myReducer(state, action);
	if (aTypesToStore.includes(action.type)) {
		localStorage.setItem(SUPPORT_TOP, JSON.stringify(newState.top));
	}
	return newState;
}

const myReducer: Reducer<ITopState, TopActions> = (
	state = initialTopState,
	action
) => {
	switch (action.type) {

		case TopActionTypes.LOAD_TOP: {
			return {
				...state,
				top: action.top
			};
		}

		case TopActionTypes.AUTHENTICATE: {
			return {
				...state,
				top : {
					isAuthenticated: true,
					auth: {
						who: action.user,
						authenticated: new Date(),
						visited: new Date()
					}
				}
			};
		}

		case TopActionTypes.AUTHENTICATE_WRONG_USERNAME: {
			return {
				...state,
				top : { 
					... state.top,
					authError: "User doesn't exist!"
				}
			};
		}		

		case TopActionTypes.AUTHENTICATE_WRONG_PWD: {
			return {
				...state,
				top : {
					... state.top,
					authError: "Password doesn't match!"
				}
			};
		}		


		default:
			return state;
	}
};