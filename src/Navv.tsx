import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link, NavLink } from "react-router-dom";
import { IAppState } from "./store/Store";

interface IProps {
  isAuthenticated: boolean | null;
  uuid: string | null;
  signOut: () => void
}

const Navv = ({ isAuthenticated, uuid, signOut }: IProps) => {

  let navigate = useNavigate();

  const otkaciMe = () => {
    signOut();
    navigate('/landing');
  }

  return (
    <nav>
      {isAuthenticated ? (
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
          <li className="push-right">
            {/* <Link to="/log-out">Sign Out</Link> */}
            {/* <button title="Sign Out" onClick={() => otkaciMe()}>Sign Out</button> */}
            <a title="Sign Out" href="#" onClick={() => otkaciMe()}>Sign Out</a>
          </li>
        </ul>
      )
        : (
          <ul>
            <li>
              <Link to="/landing">Landing</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li className="push-right">
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
          </ul>
        )}
    </nav>
  );
};

const mapStateToProps = (store: IAppState) => ({
  isAuthenticated: store.topState.top.isAuthenticated,
  uuid: store.topState.top.uuid
});

export default connect(
  mapStateToProps
)(Navv);
