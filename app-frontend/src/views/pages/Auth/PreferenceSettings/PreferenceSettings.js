import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePreferenceStart } from "../../../../store/actions/authActions";
import Preloader from "../../../../components/Preloader/Preloader";
import PageTitle from "../../../../components/PageTitle/PageTitle";

const PreferenceSettings = () => {
  const {
    isSignedIn = false,
    user,
    loader,
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Category is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  // Submit form
  const onSubmit = async (data) => {
    console.log("okkkkk");
    dispatch(updatePreferenceStart(data));
  };
  // Show lodder
  if (loader) {
    return <Preloader />;
  }
  console.log(user);
  return (
    <>
      <main id="main">
        <section id="contact" className="contact mb-5">
          <Container>
            <Helmet>
              <title>Preference Settings</title>
            </Helmet>
            <PageTitle title="Preference Settings" />
            <div className="form">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="php-email-form"
              >
                {/* <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("name")}
                    className={`${errors.name ? "is-invalid" : ""}`}
                    defaultValue={user?.name}
                    disabled
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name?.message}</p>
                  )}
                </Form.Group>             
                <FormGroup className="mb-3" controlId="email">
                  <FormLabel>Email</FormLabel>
                  <FormControl type="email" defaultValue={user?.email} disabled />
                  {errors.email && (
                    <p className="text-danger">{errors.email?.message}</p>
                  )}
                </FormGroup> */}

                <Form.Group className="mb-3" controlId="source">
                  <Form.Label>Source</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("source")}
                    className={`${errors.source ? "is-invalid" : ""}`}
                    defaultValue={user?.source}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("category")}
                    className={`${errors.category ? "is-invalid" : ""}`}
                    defaultValue={user?.category}
                  />
                  {errors.category && (
                    <p className="text-danger">{errors.category?.message}</p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("author")}
                    className={`${errors.author ? "is-invalid" : ""}`}
                    defaultValue={user?.author}
                  />
                </Form.Group>
                <div className="mb-3">
                  <Button type="submit">Update</Button>
                </div>
              </Form>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default PreferenceSettings;
