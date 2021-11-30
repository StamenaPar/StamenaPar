import React from 'react';
import * as ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom' // useRouteMatch

import { Provider } from 'react-redux';

import { Store } from 'redux';

import configureStore, { IAppState } from './store/Store';
import { loadCategories } from './Categories/actions';
import { getAllAnswers } from './Answers/actions';

import './index.css';
import './App.css';

import App from './components/App';
import AnswersPage from './Answers/containers/Page'
import containers from './Categories/containers/CategoriesPage'

import './formik/formikStyles.css';
import { coolColors } from './cool-colors'
import { getAllUsers, storeUser } from './user/actions';
import { getAllTags } from './roleTags/actions';
import UsersPage from './user/containers/UsersPage';
import { authenticate, loadTop } from './Top/actions';
import { IUser } from './user/types';

interface IProps {
	store: Store<IAppState>;
}

// <Router basename={'/'}>
const Root: React.SFC<IProps> = props => {
	return (
		<Provider store={props.store} >
			<Router basename={'/'}>
				<nav>
					<ul>
						<li>
							<Link to="/supporter/promo">Supporter</Link>
						</li>
						<li>
							<Link to="/questions">Questions</Link>
						</li>
						<li>
							<Link to="/answers/pera">Answers</Link>
						</li>
						<li>
							<Link to="/users/2">Users</Link>
						</li>
						<li  className="push-right">
							<Link to="/answers/sima">Sign In</Link>
						</li>
					</ul>					
				</nav>
				<div>
					<Switch>
						{/* exact */}
						<Route exact path="/supporter/:tekst?">
							{<App />}
						</Route>
						<Route path="/questions">
							<containers.categories canEdit={true} />
						</Route>
						<Route path="/answers/:slug">
							<AnswersPage />
						</Route>
						<Route path="/users/:slug">
							<UsersPage canEdit={true} />
						</Route>
						{/* <Route
							path="/blog2/:slug"
							render={({ match }) => {
								// Do whatever you want with the match...
								return <div>{match}</div>;
							}}
						/> */}
					</Switch>
				</div>	
			</Router>
		</Provider>
	);
};

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
	const user = { 	
		roleId: 11,
		userId: userIdOwner,
		name: "Jack",
		department: "dept1",
		createdBy: userIdOwner,
		created: new Date()
	}
	store.dispatch(storeUser(user, 'add'))
	store.dispatch(authenticate(user))
}
else {
	console.log('state.topState', state.topState)
}

// Render the App
// ReactDOM.render(<Root store={store} />, document.getElementById(
//   'root'
// ) as HTMLElement);

// React.StrictMode
ReactDOM.render(
	<React.StrictMode>
	  <Root store={store} />
	</React.StrictMode>,
	document.getElementById('root') 
  );