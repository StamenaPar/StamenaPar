// import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IUser, IRole } from '../types'

import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 

import { UserActions,  
	getUser, 
	addUser, 
	editUser,
	removeUser,
	storeUser,
	cancelUser,
	addRole,
	editRole,
	removeRole,
	storeRole,
	setIsDetail,
	toggleRole
} from '../actions'

import UserPage from '../components/UserPage'

interface IProps {
	canEdit: boolean
}

// Grab the users from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const { usersState,  tagState} = store;
	const { roles, user, formMode, roleIdEditing, isDetail } = usersState; 
	return {
		roles,
		user: user!,
		formMode,
		roleIdEditing,
		canEdit: ownProps.canEdit,
		isDetail,
		who: store.topState.top.auth!.who
	};
};

const mapDispatchToProps = (dispatch: Dispatch<UserActions>) => {
	return {
		// user
		onSelectUser: (userId: number) => dispatch<any>(getUser(userId)),
		add: (userRoleId: number, text: string, canEdit?: boolean) => dispatch<any>(addUser(userRoleId, text, canEdit)),
		edit: (userRoleId: number, userId: number) => dispatch<any>(editUser(userRoleId, userId)),
		remove: (userRoleId: number, userId: number) => dispatch<any>(removeUser(userRoleId, userId)),
		// groups
		addRole: () => dispatch<any>(addRole()),
		toggleRole: (roleId: number) =>  dispatch<any>(toggleRole(roleId)),
		editRole: (roleId: number) =>  dispatch<any>(editRole(roleId)),
		removeRole: (roleId: number) => dispatch<any>(removeRole(roleId)),
		storeRole: (role: IRole) => dispatch<any>(storeRole(role)),
		
		setIsDetail: (isDetail: boolean) => {
			dispatch<any>(setIsDetail(isDetail))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
