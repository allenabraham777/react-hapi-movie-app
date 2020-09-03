import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"

function Nav() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/movies">
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
              <li className="nav-item active">
                <a className="nav-link" href="/api/logout">
                  <FaSignOutAlt className="h4 text-warning"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
