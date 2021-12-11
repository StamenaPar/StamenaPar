import React from 'react';

import { HashRouter as Router, Route, Routes } from 'react-router-dom' // useRouteMatch

import { connect, Provider } from 'react-redux';
import { Store, Dispatch } from 'redux';

import { IAppState } from './store/Store';

import './index.css';
import './App.css';

import Support from './components/Support';
import AnswersPage from './Answers/containers/Page'
import containers from './Categories/containers/CategoriesPage'

import './formik/formikStyles.css';
import UsersPage from './user/containers/UsersPage';
import { authenticate, unAuthenticate, TopActions } from './Top/actions';
import LoginForm from './Top/containers/LoginForm';
import Nav from './Nav';
import Landing from './components/Landing';
import { ILogin, IAuth } from './Top/types';


interface IProps {
	isAuthenticated: boolean | null;
	uuid: string | null;
	auth?: IAuth,
	checkAuthentication: (login: ILogin) => void;
	signOut: () => void
}

const App = ({ isAuthenticated, uuid, auth, checkAuthentication, signOut }: IProps) => {

	React.useEffect(() => {
		const login = {
			userName: 'Jack',
			pwd: 'Daniels'
		}
		checkAuthentication(login);
	}, []);

	const app = isAuthenticated !== null
		? (
			<Router>
				<Nav signOut={signOut} />
				<div>
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/sign-in" element={
							<LoginForm canEdit={true} isRegister={false} />
						} />
						<Route path="/register" element={
							<LoginForm canEdit={true} isRegister={true} />
						}/>
						<Route path="/supporter/:tekst?" element={<Support />} />
						<Route path="/questions" element={<containers.categories canEdit={true} />} />
						<Route path="/answers/:slug" element={<AnswersPage />} />
						<Route path="/users/:slug" element={<UsersPage canEdit={true} />} />
					</Routes>
				</div>
			</Router>
		)
		: (
			null
		);

	return (
		<div className="App">
			{isAuthenticated && 
				<div className="auth-username">{auth?.who.userName}</div>
			}
			{app}
		</div>
	);
}

const mapStateToProps = (store: IAppState) => ({
	isAuthenticated: store.topState.top.isAuthenticated,
	auth: store.topState.top.auth,
	uuid: store.topState.top.uuid
});

const mapDispatchToProps = (dispatch: Dispatch<TopActions>) => {
	return {
		checkAuthentication: (login: ILogin) => dispatch<any>(authenticate(login)),
		signOut: () => dispatch<any>(unAuthenticate())
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);



