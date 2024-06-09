import { format } from "date-fns";
import React from "react";

const ArticleItem = (props) => {
  const {
    article: { title, publishedAt, description, url, urlToImage, source },
  } = props;

  let pubDate = format(publishedAt, "MMMM do yyyy");
  return (
    <>
      <div className="d-md-flex post-entry-2 small-img">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="me-4 thumbnail"
        >
          <img src={urlToImage} alt="" className="img-fluid" />
        </a>
        <div>
          <div className="post-meta">
            <span className="date">{source?.name}</span>{" "}
            <span className="mx-1">&bullet;</span> <span>{pubDate}</span>
          </div>
          <h3>
            <a href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default ArticleItem;
