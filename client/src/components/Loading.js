import React from "react";
import "../styles/Loading.css";

function Loading() {
  return (
    <div style={{ marginTop: "10rem" }}>
      <center>
        <img
          className="loading_image"
          src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
          alt="Loading"
        />
      </center>
    </div>
  );
}

export default Loading;
