// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// Import Top Typing
import { ILogin, ITop, ITopJson, ITopState } from './types';

import { IAppState } from '../store/Store';
import { IUser } from '../user/types';
import { findUser, getUser, storeUser } from '../user/actions';

// localStorage
export const SUPPORT_TOP = 'SUPPORT_TOP';

// Create Action Constants
export enum TopActionTypes {
	LOAD_TOP = "LOAD_TOP",
	NAVBAR_TOGGLE = 'NAVBAR_TOGGLE',
	REGISTER = 'REGISTER',
	REGISTER_USERNAME_EXISTS = 'REGISTER_USERNAME_EXISTS',
	AUTHENTICATE = 'AUTHENTICATE',
	UNAUTHENTICATE = 'UNAUTHENTICATE',
	AUTHENTICATE_WRONG_USERNAME = 'AUTHENTICATE_WRONG_USERNAME',
	AUTHENTICATE_WRONG_PWD = 'AUTHENTICATE_WRONG_PWD',
	CANCEL = 'CANCEL'
}


export interface INavbarToggle {
	type: TopActionTypes.NAVBAR_TOGGLE;
}

export interface ILoadTop {
	type: TopActionTypes.LOAD_TOP;
	top: ITop
}

export interface IRegister {
	type: TopActionTypes.REGISTER;
	user: IUser;
}

export interface IRegisterUsernameExists {
	type: TopActionTypes.REGISTER_USERNAME_EXISTS;
}

export interface IAuthenticate {
	type: TopActionTypes.AUTHENTICATE;
	user: IUser;
}

export interface IAuthenticateWrongUsername {
	type: TopActionTypes.AUTHENTICATE_WRONG_USERNAME;
}

export interface IAuthenticateWrongPwd {
	type: TopActionTypes.AUTHENTICATE_WRONG_PWD;
}

export interface IUnAuthenticate {
	type: TopActionTypes.UNAUTHENTICATE;
}

export interface ICancel {
	type: TopActionTypes.CANCEL;
}


// Combine the action types with a union (we assume there are more)
export type TopActions = ILoadTop |
	INavbarToggle |
	IRegister |
	IRegisterUsernameExists |
	IAuthenticate |
	IAuthenticateWrongUsername |
	IAuthenticateWrongPwd |
	IUnAuthenticate |
	ICancel;

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
	ThunkAction<Promise<any>, IAppState, null, IAuthenticate>
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


export const register: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IAuthenticate>
> = (loginUser: ILogin) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			dispatch<any>(findUser(loginUser.userName))
				.then((user: IUser) => {
					if (user) {
						dispatch({
							type: TopActionTypes.REGISTER_USERNAME_EXISTS
						});
					}
					else {
						const user: IUser = {
							roleId: 44, // Viewers
							userId: 357, //-1,
							userName: loginUser.userName,
							pwd: loginUser.pwd,
							department: "dept1",
							createdBy: 0,
							created: new Date()
						}

						dispatch<any>(storeUser(user, 'add'))
							.then((user: IUser) => {
								dispatch({
									type: TopActionTypes.REGISTER,
									user
								});
							});
					}
				});
		}
		catch (err) {
			console.error(err);
		}
	};
}

export const authenticate: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IAuthenticate>
> = (loginUser: ILogin) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			dispatch<any>(findUser(loginUser.userName))
				.then((user: IUser) => {
					if (user) {
						if (user.pwd === loginUser.pwd) {
							dispatch({
								type: TopActionTypes.AUTHENTICATE,
								user
							});
						}
						else {
							dispatch({
								type: TopActionTypes.AUTHENTICATE_WRONG_PWD
							});
						}
					}
					else {
						dispatch({
							type: TopActionTypes.AUTHENTICATE_WRONG_USERNAME
						});
					}
				});
		}
		catch (err) {
			console.error(err);
		}
	};
}

export const unAuthenticate: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IAuthenticate>
> = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: TopActionTypes.UNAUTHENTICATE
			});
		}
		catch (err) {
			console.error(err);
		}
	};
}

export const cancelLogin: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: TopActionTypes.CANCEL
			});
		} catch (err) {
			console.error(err);
		}
	};
};


export const navbarToggle: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: TopActionTypes.NAVBAR_TOGGLE
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};

/*
export function checkAuthentication() {
	return async (dispatch: Dispatch) => {
	  const auth = await window.localStorage.getItem("authenticated");
	  const formattedAuth = typeof auth === "string" ?
		JSON.parse(auth) :
		null;
  
	  formattedAuth ? dispatch(authenticate()) : dispatch(unauthenticate());
	};
  }
*/