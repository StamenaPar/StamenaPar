import React from 'react';
import * as ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Link } from 'react-router-dom' // useRouteMatch

import { Provider } from 'react-redux';

import { Store } from 'redux';

import configureStore, { IAppState } from './store/Store';
import { loadCategories, 
	removeCategory, storeCategory, updateCategory,
	removeQuestion, storeQuestion, editQuestion, updateQuestion 
} from './Categories/actions';
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
import { IQuestion } from './Categories/types';

interface IProps {
	store: Store<IAppState>;
}

// coolColors();

// Generate the store
localStorage.clear(); // !!!!!!!!!!!!

interface IEvt {
	type: string;
	entity: IQuestion;
}


const store = configureStore();
store.dispatch(loadCategories());
store.dispatch(getAllAnswers());
store.dispatch(getAllUsers())
store.dispatch(loadTop());
store.dispatch(getAllTags());

const sessionId = Math.floor((Math.random() * 10000) + 1);
sessionStorage.setItem('sessionId', sessionId.toString())

window.addEventListener("PassToBackground", function (evt: any) {
	// alert('Dobio')
	const { detail } = evt;
	const sessionId = sessionStorage.getItem('sessionId');
	console.log('Session breeeeeee:', sessionId, ' detail:', detail)
	if (sessionId !== detail.sessionId) {
		switch (detail.type) {
			case "STORE_CATEGORY":
				detail.entity.created = new Date(detail.entity.created);
				store.dispatch(storeCategory(false, detail.entity));
				break;
			case "UPDATE_CATEGORY":
				detail.entity.created = new Date(detail.entity.created);
				store.dispatch(updateCategory(false, detail.entity));
				break;
			case "REMOVE_CATEGORY":
				store.dispatch(removeCategory(false, detail.entity));
				break;
			case "STORE_QUESTION":
				detail.entity.created = new Date(detail.entity.created);
				store.dispatch(storeQuestion(false, detail.entity));
				break;
			case "UPDATE_QUESTION": {
					const question = detail.entity;
					question.created = new Date(question.created);
					for (let i=0; i < question.answers.length; i++) {
						const a = question.answers[i];
						a.assigned = new Date(a.assigned);
					}
					store.dispatch(updateQuestion(false, question));
				}
				break;			
			case "REMOVE_Question": {
					const { categoryId, questionId } = detail.entity
					store.dispatch(removeQuestion(false, categoryId, questionId));
				}
				break;
			default:
				break;
		}
	}

}, false);


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

