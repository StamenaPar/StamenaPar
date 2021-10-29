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
	setIsDetail
} from '../actions'

import {UserForm}  from '../components/UserForm'

interface IProps {
	canEdit: boolean
}

// Grab the users from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {usersState, tagState} = store;
	const { roles, user, roleOptions, formMode, roleIdEditing, isDetail } = usersState; 
	return {
		roles,
		roleOptions,
		user: user!,
		formMode,
		roleIdEditing,
		canEdit: ownProps.canEdit,
		isDetail
	};
};

const mapDispatchToProps = (dispatch: Dispatch<UserActions>) => {
	return {
		onSelectUser: (userId: number) => dispatch<any>(getUser(userId)),
		add: (userRoleId: number, text: string, canEdit?: boolean) => dispatch<any>(addUser(userRoleId, text, canEdit)),
		edit: (userRoleId: number, userId: number) => dispatch<any>(editUser(userRoleId, userId)),
		remove: (userRoleId: number, userId: number) => dispatch<any>(removeUser(userRoleId, userId)),
		saveForm: (user: IUser, formMode: string) => dispatch<any>(storeUser(user, formMode)),
		cancel: () => dispatch<any>(cancelUser()),
		
		setIsDetail: (isDetail: boolean) => {
			dispatch<any>(setIsDetail(isDetail))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
