import React from "react";

const PageTitle = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12 text-center mb-5">
          <h1 className="page-title">{props?.title}</h1>
        </div>
      </div>
    </>
  );
};

export default PageTitle;
