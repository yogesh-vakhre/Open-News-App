import React from "react";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="footer-legal">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <div className="copyright">
                  © {new Date().getFullYear()} Copyright{" "}
                  <strong>
                    <span>News</span>
                  </strong>
                  . All Rights Reserved
                </div>
              </div>

              <div className="col-md-6">
                <div className="social-links mb-3 mb-lg-0 text-center text-md-end">
                  <Link to="/#" className="twitter">
                    <i className="bi bi-twitter"></i>
                  </Link>
                  <Link to="/#" className="facebook">
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link to="/#" className="instagram">
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link to="/#" className="google-plus">
                    <i className="bi bi-skype"></i>
                  </Link>
                  <Link to="/#" className="linkedin">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
