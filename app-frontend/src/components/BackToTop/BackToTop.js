import React from "react";
import { Link } from "react-router-dom";

const BackToTop = (props) => {
  return (
    <>
      <Link to="/#" className="scroll-top d-flex align-items-center justify-content-center back-to-top">
        <i className="bi bi-arrow-up-short"></i>
      </Link>
    </>
  );
};

export default BackToTop;
