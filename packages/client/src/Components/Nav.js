import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-info">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Movie App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar-right"
            id="navbarCollapse"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/movies/add">
                  Add Movie
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/generes/add">
                  Add Genere
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;