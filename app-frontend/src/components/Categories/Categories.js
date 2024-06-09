import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadArticleBySlugRequest } from "../../store/actions/ArticleActions";

const Categories = (props) => {
  const [categoryQuery, setCategoryQuery] = useState("");
  const dispatch = useDispatch();

  const categoryOnClick = (category) => {
    if (category !== "") {
      setCategoryQuery(`category=${category}`);
      dispatch(loadArticleBySlugRequest(categoryQuery));
    }
  };
  return (
    <>
      <div className="aside-block">
        <h3 className="aside-title">Categories</h3>
        <ul className="aside-links list-unstyled">
          <li>
            <Link to="/#" onClick={(e) => categoryOnClick("business")}>
              <i className="bi bi-chevron-right"></i> Business
            </Link>
          </li>
          <li>
            <Link to="/#" onClick={(e) => categoryOnClick("entertainment")}>
              <i className="bi bi-chevron-right"></i> Entertainment
            </Link>
          </li>
          <li>
            <Link to="/#" onClick={(e) => categoryOnClick("health")}>
              <i className="bi bi-chevron-right"></i> Health
            </Link>
          </li>
          <li>
            <Link to="/#" onClick={(e) => categoryOnClick("sports")}>
              <i className="bi bi-chevron-right"></i> Sports
            </Link>
          </li>
          <li>
            <Link to="/#" onClick={(e) => categoryOnClick("science")}>
              <i className="bi bi-chevron-right"></i> Science
            </Link>
          </li>
          <li>
            <Link to="/#" onClick={(e) => categoryOnClick("technology")}>
              <i className="bi bi-chevron-right"></i> Science
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Categories;
