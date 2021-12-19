import React, { useState } from 'react';


import { HashRouter as Router, Route, Routes } from 'react-router-dom' // useRouteMatch

import { connect, Provider } from 'react-redux';
import { Store, Dispatch } from 'redux';

import { IAppState } from './store/Store';

import './index.css';

import 'bootstrap/dist/css/bootstrap.css'
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
import { Button, Col, Collapse, Container, Form, FormControl, Row } from 'react-bootstrap';
import Navig from './Navig';


interface IProps {
	isAuthenticated: boolean | null;
	uuid: string | null;
	auth?: IAuth,
	checkAuthentication: (login: ILogin) => void;
	signOut: () => void
}

const App = ({ isAuthenticated, uuid, auth, checkAuthentication, signOut }: IProps) => {

	const [open, setOpen] = useState(true);

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
						<Col xs={6} md={6}>
							Support Knowledge
						</Col>
						<Col xs={6} md={4}>
							Notifications | Help | WHo
						</Col>
					</Row>

					<Row style={{ border: '1px solid silver' }}>
						<Col sm={8}>
							{/* <Navigator /> */}
							<Button
								onClick={() => setOpen(!open)}
								aria-controls="example-collapse-text"
								aria-expanded={open}
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
					<Row style={{ border: '1px solid silver' }}>
						<Collapse in={open} dimension="width">
							<Col id="example-collapse-text" lg={2} md={2} style={{ border: '1px solid silver' }}>
								{/* <Card body>  */}
								<Nav signOut={signOut} />
								<Navig />
								{/* </Card> */}
							</Col>
						</Collapse>
						<Col lg={open ? 10 : 12} md={open ? 10 : 12} style={{ border: '1px solid silver' }}>
							<div>
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
							</div>
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



