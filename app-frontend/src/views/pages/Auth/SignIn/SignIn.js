import React, { useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInStart } from "../../../../store/actions/authActions";
import PageTitle from "../../../../components/PageTitle/PageTitle";

const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const {
    auth: { isSignedIn = false },
  } = useSelector((state) => state);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  // Submit form
  const onSubmit = async (data) => {
    dispatch(signInStart(data));
  };

  useEffect(() => {
    // Check user login
    if (isSignedIn) {
      navigate(redirect);
    }
  }, [navigate, redirect, isSignedIn]);

  return (
    <>
      <main id="main">
        <section id="contact" className="contact mb-5">
          <Container>
            <Helmet>
              <title>Sign In</title>
            </Helmet>
            <PageTitle title="Sign In" />
            <div className="form">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="php-email-form"
              >
                <FormGroup className="mb-3" controlId="email">
                  <FormLabel>Email</FormLabel>
                  <FormControl type="email" required {...register("email")} />
                  <p className="text-danger">{errors.email?.message}</p>
                </FormGroup>
                <FormGroup className="mb-3" controlId="password">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    type="password"
                    required
                    {...register("password")}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </FormGroup>
                <div className="mb-3">
                  <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                  New customer?{" "}
                  <Link to={`/signup?redirect=${redirect}`}>
                    Create your account
                  </Link>
                </div>
              </Form>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default SignIn;
