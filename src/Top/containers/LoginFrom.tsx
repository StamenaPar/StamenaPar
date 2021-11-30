// import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';

import { Dispatch } from 'redux'; 

import { authenticate, cancelLogin, TopActions } from '../actions'

import { LoginForm } from '../components/LoginFrom';
import { ILogin, ITop } from '../types';


interface IProps {
	canEdit: boolean
}

const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const { topState } = store;
	const { top } = topState;
	const { auth } = top
	return {
		isAuthenticated: top.isAuthenticated,
		who: !auth
			? { name: '', pwd:'' } 
			: { name: auth.who.name, pwd: auth.who.pwd },
		authError: top.authError,
		canEdit: ownProps.canEdit,
		formMode: 'edit'
	};
};


const mapDispatchToProps = (dispatch: Dispatch<TopActions>) => {
	return {
		saveForm: (login: ILogin, formMode: string) => dispatch<any>(authenticate(login)),
		cancel: () => dispatch<any>(cancelLogin()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

