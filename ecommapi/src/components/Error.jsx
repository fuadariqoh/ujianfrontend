import React from "react";
import { Link } from "react-router-dom";
import "../colorlib-error-404-4/css/style.css";

const Error = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page can't be found</h2>
        </div>
        <Link to="/">
          <a href="/">Go TO Homepage</a>
        </Link>
      </div>
    </div>
  );
};

export default Error;
