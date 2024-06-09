import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadArticleBySlugRequest } from "../../store/actions/ArticleActions";
import axios from "axios";

const Sources = (props) => {
  const [sourceQuery, setSourceQuery] = useState("");
  const dispatch = useDispatch();

  // State to store the fetched data
  const [sourcesData, setSourcesData] = useState([]);
  // Function to fetch data using Axios
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines/sources?apiKey=0c63237d674c492e85a49cbf8c3cb62f"
      );
      console.log("ok", response?.data?.sources);
      setSourcesData(response?.data?.sources);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const sourceOnClick = (source) => {
    if (sourceQuery !== "") {
      setSourceQuery(`sources=${source}`);
      dispatch(loadArticleBySlugRequest(sourceQuery));
    }
  };
  return (
    <>
      <div className="aside-block">
        <h3 className="aside-title">Sources</h3>
        <ul className="aside-links list-unstyled">
          {sourcesData.map((source, index) => (
            <li>
              <Link to="/#" onClick={(e) => sourceOnClick(source.id)}>
                {source.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Sources;
