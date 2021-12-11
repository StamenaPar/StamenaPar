// Import Reducer type
import { Reducer } from 'redux';

import {
	UserActions,
	UserActionTypes
} from './actions';

import { IUser, IRole, IUsersState } from './types'

export const SUPPORT_USERS = 'SUPPORT_USERS';

export const initialUser: IUser = {
	roleId: 0,
	userId: 0,
	userName: '',
	pwd: '',
	department: 'neki',
	createdBy: 0,
	created: new Date()
};

export const initialUserRole: IRole = {
	roleId: 0,
	title: '',
	color: 'lightgreen',
	users: [],
	isExpanded: false,
	createdBy: 0,
	created: new Date()
};


// Define the initial state
export const initialUsersState: IUsersState = {
	roles: [],
	user: undefined,
	allUsers: [],
	roleOptions: [],
	userOptions: [],
	loading: false,
	formMode: 'display',
	roleIdEditing: -1,
	isDetail: false
};


/*
const getUser = (
			roles: IRole[], 
			roleId: number, 
			userId: number) : IUser|undefined => {
	const group = roles.find(g => g.roleId === roleId)
	if (!group)
		return undefined;

	const user = group
							.users
							.find(q => q.userId === userId);
	return user;
}
*/


const aTypesToStore = Object.keys(UserActionTypes)
	.filter(a => a !== UserActionTypes.GET_ALL_USERS);

export const userReducer: Reducer<IUsersState, UserActions> = (state, action) => {
	const newState = myReducer(state, action);
	if (aTypesToStore.includes(action.type)) {
		localStorage.setItem(SUPPORT_USERS, JSON.stringify(newState.roles));
	}
	return newState;
}

const myReducer: Reducer<IUsersState, UserActions> = (
	state = initialUsersState,
	action
) => {
	switch (action.type) {

		case UserActionTypes.GET_ALL_USERS: {
			const { roles } = action;
			console.log('roles', roles)
			return {
				...state,
				roles
			};
		}
		//roleOptions: roles.map(g => ({ label: g.title, value: g.roleId })),
		//userOptions: allUsers.map(user => ({ label: user.name, value: user.userId }))

		case UserActionTypes.CREATE_OPTIONS: {
			const {roles} = state;
			let allUsers: IUser[] = [];
			roles.map(g => {
				//console.log('g', g)
				allUsers = allUsers.concat(g.users)
			});
			console.log('allUsers', allUsers)
			return {
				...state,
				allUsers,
				roleOptions: roles.map(g => ({ label: g.title, value: g.roleId })),
				userOptions: allUsers.map(user => ({ label: user.userName, value: user.userId }))
			};
		}

		case UserActionTypes.GET_USER: {
			let user = undefined;
			for (let role of state.roles) {
				user = role.users
					.find(user => user.userId === action.userId);
				if (user)
					break;
			}
			return {
				...state,
				user
			};
		}

		case UserActionTypes.ADD_USER: {
			let userIdMax = 0;
			for (let role of state.roles) {
				for (let user of role.users) 
					if (user.userId > userIdMax)
						userIdMax = user.userId
			}
			return {
				...state,
				formMode: 'add',
				user: { 
					...initialUser, 
					createdBy: action.createdBy,
					roleId: action.roleId, 
					userId: userIdMax + 1,
					text: action.text
				}
			};
		}

		case UserActionTypes.EDIT_USER: {
			const userRole = state.roles.find(g => g.roleId === action.roleId);
			const user = userRole!.users
				.find(user => user.userId === action.userId);
			return {
				...state,
				formMode: 'edit',
				user
			};
		}

		case UserActionTypes.STORE_USER: {
			const { user, formMode } = action;
			if (formMode === 'add') { // state.formMode
				console.log(' UserActionTypes.STORE_USER user', user)
				if (user.roleId === 0 && !state.roles.map(g => g.roleId).includes(0)) {
					console.log('unisao')
					// do something
					return {
						...state,
						formMode: 'edit',
						roles: [
							...state.roles,
							{ 
								...initialUserRole, 
								roleId: 0,
								title: 'Unknown',
								users: [user]
							}
						]
					};
				}
				return {
					...state,
					formMode: 'edit',
					roles: state.roles.map(g => g.roleId !== user.roleId ?
						{ ...g, users: [...g.users] }
						:
						{ ...g, users: [...g.users, { ...user }] }
					)
				};
			}
			else {
				const { roles } = state;
				const {user} = action;
				const userId: number = user.roleId;
				const g = roles.find(g => g.roleId === user.roleId);
				const q = g!.users.find(q => q.userId === user.userId);
				if (q) { // change user
					return {
						...state,
						formMode: 'edit',
						roles: roles.map(g => g.roleId !== user.roleId
							? { ...g, users: [...g.users]	}
							: {
								...g, 
								users: g.users
									.map(q => q.userId !== user.userId ?
										q : { ...user }
									)
							}
						)
					};
				}
				else { // assing user to another group
					return {
						...state,
						formMode: 'edit',
						roles: roles.map(g => g.roleId !== user.roleId
							? { ...g, users: [...g.users.filter(q=> q.userId !== user.userId)]	}
							: {	...g, users: [...g.users, { ...user } ]
							}
						)
					};
				}
			}
		}

		case UserActionTypes.CANCEL_USER: {
			return {
				...state,
				formMode: 'display',
			};
		}

		case UserActionTypes.REMOVE_USER: {
			return {
				...state,
				formMode: 'display',
				user: undefined,
				roles: state.roles.map(g => g.roleId !== action.roleId ?
					{ ...g, users: [...g.users] }
					:
					{ ...g, users: g.users.filter(q => q.userId !== action.userId) }
				)
			};
		}

		case UserActionTypes.SET_IS_DETAIL: {
			return {
				...state,
				isDetail: action.isDetail
			}
		}

		///////////////////////////////////////////////////////////////////////////////////
		// groups

		case UserActionTypes.ADD_ROLE: {
			let roleId = Math.max(...state.roles.map(g => g.roleId)) + 1
			return {
				...state,
				roleIdEditing: roleId,
				roles: [...state.roles, { ...initialUserRole, title: "New Section", roleId: roleId }]
			};
		}

		case UserActionTypes.TOGGLE_ROLE: {
			console.log(action)
			const group = state.roles.find(g => g.roleId === action.roleId);
			return {
				...state,
				roles: state.roles.map(g => g.roleId !== action.roleId
					? g
					: { ...g, isExpanded: !g.isExpanded }
				)

			};
		}

		case UserActionTypes.EDIT_ROLE: {
			const group = state.roles.find(g => g.roleId === action.roleId)
			return {
				...state,
				roleIdEditing: group!.roleId
			};
		}

		case UserActionTypes.STORE_ROLE: {
			return {
				...state,
				roleIdEditing: -1,
				roles: state.roles.map(g => g.roleId !== action.group.roleId ?
					g
					:
					{ ...g, title: action.group.title }
				)
			}
		}

		case UserActionTypes.REMOVE_ROLE: {
			return {
				...state,
				roles: state.roles.reduce((acc: IRole[], g) => {
					if (g.roleId !== action.roleId)
						acc.push({ ...g, users: [...g.users] })
					return acc
				}, [])
			};
		}

		default:
			return state;
	}
};

