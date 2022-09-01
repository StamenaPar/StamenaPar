// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

// Import User Typing
import { IUser, IRole, IRoleJson, IUsersState } from './types';


///////////////////////////////////////////////////
// localStorage
import { SUPPORT_USERS } from './reducer';

import data from "./data.json"
import { IAppState } from '../store/Store';
import { TopActionTypes } from '../Top/actions';

const parseFromJson = (): IRole[] => {
	return data.map(g => {
		return parseRole(g)
	})
}

const parseFromLocalStorage = (arr: IRoleJson[]): IRole[] => {
	return arr.map(g => parseRole(g));
}

const parseRole = (g: IRoleJson): IRole => ({
	...g,
	users: g.users.map(u => ({ ...u, created: new Date(u.created) })),
	created: new Date(g.created)
})


// Create Action Constants
export enum UserActionTypes {
	LOAD_USER_GROUPS = 'LOAD_USER_GROUPS',
	CREATE_OPTIONS = 'CREATE_OPTIONS',
	GET_ALL_USERS = 'GET_ALL_USERS',
	GET_USER = 'GET_USER',
	ADD_USER = 'ADD_USER',
	EDIT_USER = 'EDIT_USER',
	REMOVE_USER = 'REMOVE_USER',
	STORE_USER = 'STORE_USER',
	CANCEL_USER = 'CANCEL_USER',
	// groups
	ADD_ROLE = 'ADD_ROLE',
	TOGGLE_ROLE = 'EXPAND_ROLE',
	EDIT_ROLE = 'EDIT_ROLE',
	REMOVE_ROLE = 'REMOVE_ROLE',
	STORE_ROLE = 'STORE_ROLE',
	// localSTorage
	SET_IS_DETAIL = 'SET_IS_DETAIL',
}


// Interface for Get All Action Type
export interface IGetAll {
	type: UserActionTypes.GET_ALL_USERS;
	roles: IRole[];
}

export interface ICreateOptions {
	type: UserActionTypes.CREATE_OPTIONS;
}

export interface IGet {
	type: UserActionTypes.GET_USER;
	userId: number;
}

export interface IAdd {
	type: UserActionTypes.ADD_USER;
	createdBy: number,
	roleId: number,
	text: string
	//userId: number,
}

export interface IEdit {
	type: UserActionTypes.EDIT_USER;
	roleId: number,
	userId: number
}

export interface IRemove {
	type: UserActionTypes.REMOVE_USER;
	roleId: number,
	userId: number,
}

export interface IStore {
	type: UserActionTypes.STORE_USER;
	user: IUser;
	formMode: string;
}

export interface ICancel {
	type: UserActionTypes.CANCEL_USER;
}

// group
export interface IAddRole {
	type: UserActionTypes.ADD_ROLE;
	//roleId: number
}

export interface IToggleRole {
	type: UserActionTypes.TOGGLE_ROLE;
	roleId: number
}

export interface IEditRole {
	type: UserActionTypes.EDIT_ROLE;
	roleId: number
}

export interface IRemoveRole {
	type: UserActionTypes.REMOVE_ROLE;
	roleId: number
}

export interface IStoreRole {
	type: UserActionTypes.STORE_ROLE;
	group: IRole;
}


export interface ISetIsDetail {
	type: UserActionTypes.SET_IS_DETAIL;
	isDetail: boolean
}



// Combine the action types with a union (we assume there are more)
export type UserActions = IGetAll | IGet | IAdd | IEdit | IRemove | IStore | ICancel |
	IAddRole | IToggleRole | IEditRole | IRemoveRole | IStoreRole |
	ISetIsDetail | ICreateOptions;

const isWebStorageSupported = () => 'localStorage' in window


export const getAllUsers: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, null, IGetAll>
> = () => {
	return async (dispatch: Dispatch) => {
		try {
			// const response = await axios.get('https://swapi.co/api/people/');
			let roles: IRole[] = [];
			if (isWebStorageSupported()) {
				const sUserRoles = localStorage.getItem(SUPPORT_USERS);
				if (sUserRoles !== null) {
					//const Users: IRole[] = JSON.parse(sUsers);
					//Users.map(g => storageUsers.push(g))
					const parsed = JSON.parse(sUserRoles);
					roles = parseFromLocalStorage(parsed);
				}
				else {
					roles = parseFromJson()
				}
			}
			else {
				roles = parseFromJson()
			}

			//const response = await getUsersFromLocalStorage(); 
			dispatch({
				type: UserActionTypes.GET_ALL_USERS,
				roles  //response.data.results,
			});
			dispatch({type: UserActionTypes.CREATE_OPTIONS})
		}
		catch (err) {
			console.error(err);
		}
	};
};



// Get User <Promise<Return Type>, State Interface, Type of Param, Type of Action> 
export const getUser: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, string, IGet>
> = (userId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: UserActionTypes.GET_USER,
				userId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const findUser: ActionCreator<
	ThunkAction<Promise<any>, IAppState, string, IGet>
> = (name: string) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			const {usersState} = getState();
			let user;
			for (let role of usersState.roles) {
				user = role.users.find(user => user.userName === name);
				if (user)
					break;
			}
			return user;
		}
		catch (err) {
			console.error(err);
		}
	};
};



export const addUser: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IAdd>
> = (roleId: number, text: string, canEdit?: boolean) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			dispatch({
				type: UserActionTypes.ADD_USER,
				createdBy: getState().topState.top!.auth!.who!.userId,
				roleId,
				text
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const editUser: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, null, IEdit>
> = (roleId: number, userId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: UserActionTypes.EDIT_USER,
				roleId,
				userId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const removeUser: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, null, IRemove>
> = (roleId: number, userId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			dispatch({
				type: UserActionTypes.REMOVE_USER,
				roleId,
				userId
			});
			dispatch({type: UserActionTypes.CREATE_OPTIONS})
		}
		catch (err) {
			console.error(err);
		}
	};
};


export const setIsDetail: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, null, ISetIsDetail>
> = (isDetail: boolean) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: UserActionTypes.SET_IS_DETAIL,
				isDetail
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const storeUser: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IStore>
> = (user: IUser, formMode: string) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			if (formMode === 'add') {
				await delay(); 

				// if userId == -1 nadji max
				// return dispatch<any>(addUser(xxx))
				// 	.then((categoryId: number) => {
				// 		return categoryId;
				// 	});

				await dispatch({
					type: UserActionTypes.STORE_USER,
					user,
					formMode
				});
				// dodao na Zlataru
				dispatch({
					type: TopActionTypes.AUTHENTICATE,
					user
				});
				return user;
			}
			else {
				await delay();
				dispatch({
					type: UserActionTypes.STORE_USER,
					user,
					formMode
				});
			}
			dispatch({type: UserActionTypes.CREATE_OPTIONS})
		} 
		catch (err) {
			console.error(err);
		}
	};
};

const delay = (): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data': {
					'results': 1
				}
			})
		}, 50)
	})
}

export const cancelUser: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: UserActionTypes.CANCEL_USER
			});
		} catch (err) {
			console.error(err);
		}
	};
};

/*
 * User Roles
 */
export const addRole: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, null, IAddRole>
> = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: UserActionTypes.ADD_ROLE
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const toggleRole: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, null, IEditRole>
> = (roleId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: UserActionTypes.TOGGLE_ROLE,
				roleId
			});
		} catch (err) {
			console.error(err);
		}
	};
};


export const editRole: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, null, IEditRole>
> = (roleId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: UserActionTypes.EDIT_ROLE,
				roleId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const removeRole: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, null, IRemoveRole>
> = (roleId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			dispatch({
				type: UserActionTypes.REMOVE_ROLE,
				roleId: roleId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const storeRole: ActionCreator<
	ThunkAction<Promise<any>, IUsersState, null, IStoreRole>
> = (group: IRole) => {
	return async (dispatch: Dispatch) => {
		try {
			// await updateRoleFromLocalStorage(group);
			dispatch({
				type: UserActionTypes.STORE_ROLE,
				group
			});
		} catch (err) {
			console.error(err);
		}
	};
};

