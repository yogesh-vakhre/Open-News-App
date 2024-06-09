import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadArticleBySlugRequest } from "../../store/actions/ArticleActions";

const SearchBar = (props) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (query !== "") {
      dispatch(loadArticleBySlugRequest(`q=${query}`));
    }
    //navigate(query ? `/?query=${query}` : "/");
  };
  return (
    <>
      <Form className="d-flex me-auto w-100" onSubmit={submitHandler}>
        <InputGroup>
          <FormControl
            type="text"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search alrticles..."
            aria-label="Search alrticles"
            aria-describedby="button-search"
          ></FormControl>
          <Button variant="outline-primary" type="submit" id="button-search">
            <i className="icon bi-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default SearchBar;
