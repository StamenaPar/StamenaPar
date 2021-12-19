import React, { useState } from 'react';


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
import { Button, Col, Collapse, Container, Form, FormControl, Nav, Row } from 'react-bootstrap';
import Navig from './Navig';
import Navv from './Navv';


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

				{/* <Container className="vh-100 d-flex flex-column"> min-vh-100 */}
				<Container>
					{/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
					<Row style={{ border: '1px solid silver' }}>
						<Col xs={6} md={2}>
						</Col>
						<Col xs={6} md={5}>
							Support Knowledge
						</Col>
						<Col xs={6} md={5}>
							<Row>
								<Col>Notifications</Col>
								<Col>Help</Col>
								<Col>{auth?.who.userName}</Col>
							</Row>
						</Col>
					</Row>

					<Row style={{ border: '1px solid silver' }}>
						<Col sm={8}>
							{/* <Navigator /> */}
							<Button
								onClick={() => toggleNavbar()}
								aria-controls="example-collapse-text"
								aria-expanded={navbarOpen}
							>
								Open/Close
							</Button>
						</Col>
						<Col sm={4} className="justify-content-center">
							<Form className="d-flex">
								<FormControl
									type="search"
									placeholder="Search"
									className="me-2"
									aria-label="Search"
								/>
								<Button variant="outline-success">Search</Button>
							</Form>
						</Col>
					</Row>

					{/* Columns are always 50% wide, on mobile and desktop */}
					{/* <Row className="h-100"> */}
					<Row style={{ border: '0px solid silver' }}>
						<Collapse in={navbarOpen} dimension="width">
							<Col id="example-collapse-text" lg={2} md={2} style={{ border: '1px solid silver' }}>
								{/* <Navv  signOut={signOut}/> */}
								<Navig signOut={signOut} />
							</Col>
						</Collapse>
						<Col lg={navbarOpen ? 10 : 12} md={navbarOpen ? 10 : 12} style={{ border: '1px solid silver' }}>
							<Routes>
								<Route path="/" element={<Landing />} />
								<Route path="/sign-in" element={
									<LoginForm canEdit={true} isRegister={false} />
								} />
								<Route path="/register" element={
									<LoginForm canEdit={true} isRegister={true} />
								} />
								<Route path="/supporter/:tekst?" element={<Support />} />
								<Route path="/questions" element={<containers.categories canEdit={true} />} />
								<Route path="/answers/:slug" element={<AnswersPage />} />
								<Route path="/users/:slug" element={<UsersPage canEdit={true} />} />
							</Routes>
						</Col>
					</Row>


					{/* Columns are always 50% wide, on mobile and desktop */}
					<Row style={{ border: '1px solid silver' }}>
						<Col xs={6}>xs=6</Col>
						<Col xs={6}>xs=6</Col>
					</Row>
				</Container>);


			</Router>
		)
		: (
			null
		);

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
		checkAuthentication: (login: ILogin) => dispatch<any>(authenticate(login)),
		signOut: () => dispatch<any>(unAuthenticate())
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);



