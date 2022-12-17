import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../App.css";
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();
  const predictRedirect = () => {
    navigate("/predict");
  };
  return (
    <>
      <Navbar />
      <div className="homecontainer">
        <div className="banner">
          <div className="banner__title">
            <div className="banner__title_head">
              OnlineShopping<font>AI</font>
            </div>
            <div className="banner__title_tail">
              <div className="typing">
                A Machine Learning based Web Application for Predicting the
                intent of a customer making a <br />
                <strong>
                  purchase from an online shop within a browsing session using
                  the user's cookies information
                </strong>
              </div>
              <div className="banner__buttons">
                <Button
                  onClick={predictRedirect}
                  className="banner__button cropButton"
                >
                  Start Prediction
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
