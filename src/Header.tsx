import * as React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { IAppState } from "./store/Store";

import logo from './logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faHome, faPlus, faSurprise, faUser, faUserFriends, faSignOutAlt, faSignInAlt, faAnchor } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleLeft, faAngleDoubleRight, faRegistered } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Collapse, Container, Form, FormControl, Nav, Row } from 'react-bootstrap';


interface IProps {
  isAuthenticated: boolean | null;
  uuid: string | null;
  open: boolean,
  setOpen: (open: boolean) => void
  register: () => void
  signIn: () => void
  signOut: () => void
}

function Header({ isAuthenticated, uuid, open, setOpen, register, signIn, signOut }: IProps) {

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
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-y-0 shadow">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        size='sm'
        variant="secondary"
      >
        <FontAwesomeIcon icon={open ? faAngleDoubleLeft : faAngleDoubleRight} color='lightblue' />
      </Button>
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Support Knowledge</a>
      <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          {isAuthenticated
            ? <a className="nav-link px-3" href="#" onClick={() => signOut()}>Sign out</a>
            : (
              <>
                <a className="nav-link px-3" href="#" onClick={() => signIn()}>Sign in</a>
                <a className="nav-link" href="#/Register">
                  <FontAwesomeIcon icon={faRegistered} color='lightblue' />
                  {' '}Register
                </a>
              </>
            )
          }
        </div>
      </div>
    </header>

  );
}

const mapStateToProps = (store: IAppState) => ({
  isAuthenticated: store.topState.top.isAuthenticated,
  uuid: store.topState.top.uuid
});

export default connect(
  mapStateToProps
)(Header);