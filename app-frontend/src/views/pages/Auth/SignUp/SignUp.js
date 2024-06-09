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
import { signUpStart } from "../../../../store/actions/authActions";
import PageTitle from "../../../../components/PageTitle/PageTitle";

const SignUp = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const {
    auth: { isSignedIn = false },
  } = useSelector((state) => state);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Password is mendatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  // Submit form
  const onSubmit = async (data) => {
    dispatch(signUpStart(data));
    return false;
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
              <title>Sign Up</title>
            </Helmet>
            <PageTitle title="Sign Up" />
            <div className="form">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="php-email-form"
              >
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("name")}
                    className={`${errors.name ? "is-invalid" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name?.message}</p>
                  )}
                </Form.Group>
                <FormGroup className="mb-3" controlId="email">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    type="email"
                    {...register("email")}
                    className={`${errors.email ? "is-invalid" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email?.message}</p>
                  )}
                </FormGroup>
                <FormGroup className="mb-3" controlId="password">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    type="password"
                    {...register("password")}
                    className={`${errors.password ? "is-invalid" : ""}`}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password?.message}</p>
                  )}
                </FormGroup>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("confirmPassword")}
                    className={`${errors.confirmPassword ? "is-invalid" : ""}`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-danger">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                </Form.Group>
                <div className="mb-3">
                  <Button type="submit">Sign Up</Button>
                </div>
                <div className="mb-3">
                  Already have an account?{" "}
                  <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                </div>
              </Form>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default SignUp;
