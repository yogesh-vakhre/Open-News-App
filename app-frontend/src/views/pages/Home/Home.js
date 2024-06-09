import React from "react";
import { loadArticlesRequest } from "../../../store/actions/ArticleActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Preloader from "../../../components/Preloader/Preloader";
import MessageBox from "../../../components/MessageBox/MessageBox";
import ArticleItem from "../../../components/ArticleItem/ArticleItem";
import Categories from "../../../components/Categories/Categories";
import Sources from "../../../components/Sources/Sources";
const Home = () => {
  const { articles, error, loader, success } = useSelector(
    (state) => state.article
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(loadArticlesRequest());
  }, []);

  //Show lodder
  if (loader) {
    return <Preloader />;
  }

  return (
    <>
      <main id="main">
        <Container className="mt-3">
          <Helmet>
            <title>Home</title>
          </Helmet>
          <section id="search-result" className="search-result">
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  {error && success === false ? (
                    <MessageBox variant="error">{error}</MessageBox>
                  ) : (
                    <>
                      {articles.map((article, index) => (
                        <ArticleItem article={article} key={index} />
                      ))}
                    </>
                  )}
                </div>
                <div className="col-md-3">
                  <Categories />
                  <Sources />
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
};

export default Home;
