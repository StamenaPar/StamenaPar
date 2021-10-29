// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// Import Top Typing
import { ITop, ITopJson, ITopState } from './types';

import { IAppState } from '../store/Store';
import { IUser } from '../user/types';

// localStorage
export const SUPPORT_TOP = 'SUPPORT_TOP';

// Create Action Constants
export enum TopActionTypes {
	LOAD_TOP = "LOAD_TOP",
	AUTHENTICATE = 'AUTHENTICATE'
}

export interface ILoadTop {
	type: TopActionTypes.LOAD_TOP;
	top: ITop
}

export interface IAuthenticate {
	type: TopActionTypes.AUTHENTICATE;
	user: IUser;
}


// Combine the action types with a union (we assume there are more)
export type TopActions = ILoadTop | IAuthenticate;

const isWebStorageSupported = () => 'localStorage' in window

const parseFromLocalStorage = (json: ITopJson): ITop => {
	return parseObj(json);
}

const parseObj = (json: ITopJson): ITop => {
	const { auth } = json;
	const { who, visited, authenticated } = auth;
	return {
		...json,
		auth: {
			...auth,
			who: {
				...who,
				created: new Date(who.created!)
			},
			visited: new Date(visited),
			authenticated: new Date(authenticated)
		}
	}
}

export const loadTop: ActionCreator<
	ThunkAction<Promise<any>, ITopState, null, IAuthenticate>
> = () => {
	return async (dispatch: Dispatch) => {
		try {
			let top = undefined;

			if (isWebStorageSupported()) {
				const s = localStorage.getItem(SUPPORT_TOP);
				if (s !== null) {
					//const Users: IUserRole[] = JSON.parse(sUsers);
					//Users.map(g => storageUsers.push(g))
					const parsed = JSON.parse(s);
					console.log('parsed', parsed)
					top = parseFromLocalStorage(parsed);
				}
			}
			if (top) {
				dispatch({
					type: TopActionTypes.LOAD_TOP,
					top
				});
			}
		}
		catch (err) {
			console.error(err);
		}
	};
}

export const authenticate: ActionCreator<
	ThunkAction<Promise<any>, ITopState, null, IAuthenticate>
> = (user: IUser) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: TopActionTypes.AUTHENTICATE,
				user
			});
		}
		catch (err) {
			console.error(err);
		}
	};
}

