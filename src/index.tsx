import React from 'react';
import * as ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Link  } from 'react-router-dom' // useRouteMatch

import { Provider } from 'react-redux';

import { Store } from 'redux';

import configureStore, { IAppState } from './store/Store';
import { loadCategories } from './Categories/actions';
import { getAllAnswers } from './Answers/actions';

import './index.css';
import './App.css';

import AnswersPage from './Answers/containers/Page'
import containers from './Categories/containers/CategoriesPage'

import './formik/formikStyles.css';
import { coolColors } from './cool-colors'
import { getAllUsers, storeUser } from './user/actions';
import { getAllTags } from './roleTags/actions';
import UsersPage from './user/containers/UsersPage';
import { authenticate, loadTop } from './Top/actions';
import { IUser } from './user/types';
import LoginForm from './Top/containers/LoginForm';
import App from './App';

interface IProps {
	store: Store<IAppState>;
}

coolColors();

// Generate the store
// localStorage.clear(); // !!!!!!!!!!!!

const store = configureStore();
store.dispatch(loadCategories());
store.dispatch(getAllAnswers());
store.dispatch(getAllUsers())
store.dispatch(loadTop())
store.dispatch(getAllTags())

const userIdOwner = 101;
const state = store.getState();
if (state.usersState.allUsers.length === 0) {

	const treatFirstUserAsTheOwner = async () => {
		return await store.dispatch(storeUser(user, 'add'))
	};

	const user: IUser = {
		roleId: 11,
		userId: userIdOwner,
		userName: "Jack",
		pwd: "Daniels",
		department: "dept1",
		createdBy: userIdOwner,
		created: new Date()
	}

	treatFirstUserAsTheOwner()
		.then((res) => {
			ReactDOM.render(
				<React.StrictMode>
					<Provider store={store} >
						<App />
					</Provider>
				</React.StrictMode>,
				document.getElementById('root')
			);
		})
	// store.dispatch(authenticate(user))
}
else {
	ReactDOM.render(
		<React.StrictMode>
			<Provider store={store} >
				<App />
			</Provider>
		</React.StrictMode>,
		document.getElementById('root')
	);
}

// Render the App
// ReactDOM.render(<Root store={store} />, document.getElementById(
//   'root'
// ) as HTMLElement);

// React.StrictMode
