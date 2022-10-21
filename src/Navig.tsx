import * as React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { IAppState } from "./store/Store";

import logo from './logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faHome, faPlus, faSurprise, faUser, faUserFriends, faSignOutAlt, faSignInAlt, faRegistered, faAnchor } from '@fortawesome/free-solid-svg-icons'


interface IProps {
  isAuthenticated: boolean | null;
  uuid: string | null;
  signOut: () => void
}

function Navig({ isAuthenticated, uuid, signOut }: IProps) {

  let navigate = useNavigate();

  const otkaciMe = () => {
    signOut();
    navigate('/landing');
  }

  {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> 
           <Navbar.Toggle aria-controls="offcanvasNavbar" /> 
         <Nav className="justify-content-end flex-grow-1 pe-3"> */}

  /// defaultActiveKey="/questions"
  return (
    <div className="position-sticky pt-3">
      {isAuthenticated ? (
        <>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#/supporter/promo">
                <FontAwesomeIcon icon={faSurprise} color='lightblue' />
                {' '}Supporter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#/questions">
                <FontAwesomeIcon icon={faQuestion} color='lightblue' />
                {' '}Questions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/answers/pera">
                <FontAwesomeIcon icon={faAnchor} color='lightblue' />
                {' '}Answers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/users/2">
                <FontAwesomeIcon icon={faUserFriends} color='lightblue' />
                {' '}Users
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => otkaciMe()}>
                <FontAwesomeIcon icon={faSignOutAlt} color='lightblue' />
                {' '}Sign out
              </a>
            </li> */}
          </ul>
            {/*
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a className="link-secondary" href="#" aria-label="Add a new report">
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faHome} color='lightblue' />
                {' '}Current month
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faHome} color='lightblue' />
                {' '}Last quarter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faHome} color='lightblue' />
                {' '}Social engagement
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              {' '}Year-end sale
              </a>
            </li>
          </ul> */}
        </>
      ) : (
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#/landing">
              <FontAwesomeIcon icon={faSurprise} color='lightblue' />
              {' '}Landing
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#/About">
              <FontAwesomeIcon icon={faQuestion} color='lightblue' />
              {' '}About
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="#/Register">
              <FontAwesomeIcon icon={faRegistered} color='lightblue' />
              {' '}Register
            </a>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => otkaciMe()}>
              <FontAwesomeIcon icon={faSignInAlt} color='lightblue' />
              {' '}Sign in
            </a>
          </li> */}
        </ul>
      )}
    </div>

  );
}

const mapStateToProps = (store: IAppState) => ({
  isAuthenticated: store.topState.top.isAuthenticated,
  uuid: store.topState.top.uuid
});

export default connect(
  mapStateToProps
)(Navig);