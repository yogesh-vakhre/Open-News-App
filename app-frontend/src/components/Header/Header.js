import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { signOutStart } from "../../store/actions/authActions";
import SearchBar from "../SearchBar/SearchBar";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  // Load auth user data
  useEffect(() => {
    if (auth?.isSignedIn) {
      setUserData(auth.user);
    }
  }, [dispatch, userData, auth]);

  // User sign out
  const signoutHandler = async (e) => {
    e.preventDefault();
    dispatch(signOutStart());
  };

  return (
    <>
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <h1>News</h1>
          </Link>

          <nav id="navbar" className="navbar">
            <SearchBar />
          </nav>

          <div className="position-relative">
            <nav id="navbar" className="navbar">
              <ul>
                {auth?.isSignedIn ? (
                  <li className="dropdown">
                    <Link href="#">
                      <span>
                        <span className="fa fa-user"></span> {userData?.name}
                      </span>
                      <i className="bi bi-chevron-down dropdown-indicator"></i>
                    </Link>
                    <ul>
                      <li>
                        <Link to="/preference-settings">
                          Preference Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={(e) => signoutHandler(e)}
                        >
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li>
                    <Link className="" to="/signin">
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
