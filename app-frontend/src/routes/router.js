import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "../views/pages/Home/Home";
import Layout from "../components/Layout/Layout";
import NotFound from "../views/pages/Page404/Page404"; 
import SignIn from "../views/pages/Auth/SignIn/SignIn";
import SignUp from "../views/pages/Auth/SignUp/SignUp";
import PreferenceSettings from "../views/pages/Auth/PreferenceSettings/PreferenceSettings";
import LoggedInProtection from "./LoggedInProtection";
import LoggedOutProtection from "./LoggedOutProtection";
import { useDispatch, useSelector } from "react-redux";
import { loadProfileStart } from "../store/actions/authActions";
import { getToken } from "../store/localStorage";

const Router = () => {
  const { user, isSignedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken();

  const renderRedirectToRoute = () => {
    return isSignedIn && user !== undefined ? "/" : "/signin";
  };

  // Load profile
  // useEffect(() => {
  //   if (token && isSignedIn ) {
  //     console.log("token",token);
  //     return () => dispatch(loadProfileStart());
  //   }
  // }, [dispatch, isSignedIn, token]);

  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <LoggedInProtection>
              <Home />
            </LoggedInProtection>
          ),
        },       
        {
          path: "/signin",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <SignIn />
            </LoggedOutProtection>
          ),
        },
        {
          path: "/signup",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <SignUp />
            </LoggedOutProtection>
          ),
        },
        {
          path: "/preference-settings",
          element: (
            <LoggedInProtection>
              <PreferenceSettings />
            </LoggedInProtection>
          ),
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

export default Router;
