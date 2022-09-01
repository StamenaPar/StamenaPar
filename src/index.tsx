import React from 'react';
import * as ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Link } from 'react-router-dom' // useRouteMatch

import { Provider } from 'react-redux';

import { Store } from 'redux';

import configureStore, { IAppState } from './store/Store';
import { loadCategories } from './Categories/actions';
import { getAllAnswers } from './Answers/actions';

import 'bootstrap/dist/css/bootstrap.css'
// import './formik/formikStyles.css';
import './index.css';
import './App.css';
import './dashboard.css';

import './formik/formikStyles.css';
import { getAllUsers, storeUser } from './user/actions';
import { getAllTags } from './roleTags/actions';
import { loadTop } from './Top/actions';
import { IUser } from './user/types';
import App from './App';
import { coolColors } from './cool-colors';

interface IProps {
	store: Store<IAppState>;
}

// coolColors();

// Generate the store
localStorage.clear(); // !!!!!!!!!!!!

window.addEventListener("PassToBackground", function(evt) {
	alert('Dobio')
  }, false);
  alert('gh-pages rade!!!!')

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

const ApplyChangesFromOtherUser = (what: string) => {
	alert(what);
}

