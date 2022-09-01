import React, { useCallback, useRef, useState, useEffect } from 'react';


import { HashRouter as Router, Route, Routes } from 'react-router-dom' // useRouteMatch

import { connect, Provider } from 'react-redux';
import { Store, Dispatch } from 'redux';

import { IAppState } from './store/Store';

import Support from './components/Support';
import AnswersPage from './Answers/containers/Page'
import containers from './Categories/containers/CategoriesPage'

import UsersPage from './user/containers/UsersPage';
import { authenticate, unAuthenticate, TopActions, navbarToggle } from './Top/actions';
import LoginForm from './Top/containers/LoginForm';
import Landing from './components/Landing';
import { ILogin, IAuth } from './Top/types';
import Navig from './Navig';
import Navv from './Navv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faRegistered } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Collapse, Container, Form, FormControl, Nav, Row } from 'react-bootstrap';
import Header from './Header';


interface IProps {
	navbarOpen: boolean,
	isAuthenticated: boolean | null;
	uuid: string | null;
	auth?: IAuth,
	toggleNavbar: () => void,
	checkAuthentication: (login: ILogin) => void;
	signOut: () => void
}

const App = ({ navbarOpen, isAuthenticated, uuid, auth, toggleNavbar, checkAuthentication, signOut }: IProps) => {

	//const [navbarOpen, setNavbarOpen] = useState(true);
	let main: null | HTMLDivElement = null;

	const [open, setOpen] = useState(navbarOpen);
	const [mainMd, setMainMd] = useState(9);
	const [mainLg, setMainLg] = useState(10);

	useEffect(() => {
		const login = {
			userName: 'Jack',
			pwd: 'Daniels'
		}
		checkAuthentication(login);
	}, []);

	const signIn = () => {
		const login = {
			userName: 'Jack',
			pwd: 'Daniels'
		}
		checkAuthentication(login);
	}

	const register = () => {
		
	}

	
	// null is the third state false/true/null in reducer
	const app = //isAuthenticated !== null ? (  
		<Router>
			<Header open={open} setOpen={setOpen} register={register} signIn={signIn} signOut={signOut} />

			<Container fluid>
				<Row>
					<Collapse
						in={open}
						dimension="width"
						onEnter={() => { console.log('onEnter'); setMainMd(9); setMainLg(10) }}
						onEntering={() => { console.log('onEntering'); }}
						onEntered={() => { console.log('onEntered'); }}
						onExit={() => { console.log('onExit'); }}
						onExiting={() => { console.log('onExiting'); }}
						onExited={() => { console.log('onExited'); setMainMd(12); setMainLg(12) }}
					>
						{/* <Col id="example-collapse-text" className="position-sticky pt-3"> */}
						{/* <Col id="example-collapse-text" className="position-sticky p-0 m-0 col-md-3 ms-sm-auto col-lg-2"> */}
						<Col
							id="example-collapse-text"
							md={3}
							lg={2}
							className="p-3 m-3 ms-sm-auto sidebar"
							style={{ border: '1px solid silver', backgroundColor: 'yellow' }}
						>
							<Navig signOut={signOut} />
						</Col>
					</Collapse>

					<Col id="main" md={mainMd} lg={mainLg} className="ms-sm-auto px-md-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 className="h2">Dashboard</h1>
							<div className="btn-toolbar mb-2 mb-md-0">
								<div className="btn-group me-2">
									<button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
									<button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
								</div>
								<button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
									<span data-feather="calendar"></span>
									This week
								</button>
							</div>
						</div>

						<div style={{ border: '1px solid navy' }}>
							<Routes>
								<Route path="/" element={<Landing />} />
								<Route path="/sign-in" element={
									<LoginForm canEdit={true} isRegister={false} />
								} />
								<Route path="/register" element={
									<LoginForm canEdit={true} isRegister={true} />
								} />
								<Route path="/supporter/:tekst" element={<Support />} />
								<Route path="/questions" element={<containers.categories canEdit={true} />} />
								<Route path="/answers/:slug" element={<AnswersPage />} />
								<Route path="/users/:slug" element={<UsersPage canEdit={true} />} />
							</Routes>
						</div>

					</Col>
				</Row>

			</Container>

		</Router>
	// )
	// : (
	// 	null
	// );

	return (
		<div className="App">
			{app}
		</div>
	);
}

const mapStateToProps = (store: IAppState) => ({
	navbarOpen: store.topState.top.navbarOpen,
	isAuthenticated: store.topState.top.isAuthenticated,
	auth: store.topState.top.auth,
	uuid: store.topState.top.uuid
});

const mapDispatchToProps = (dispatch: Dispatch<TopActions>) => {
	return {
		toggleNavbar: () => dispatch<any>(navbarToggle()),
		checkAuthentication: async(login: ILogin) => await dispatch<any>(authenticate(login)),
		signOut: () => dispatch<any>(unAuthenticate())
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);



