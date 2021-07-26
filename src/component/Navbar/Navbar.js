import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/style.css'
import './css/reset.css'
import './css/base.css'

const Navbar = ({ setUser, login, setLogin }) => {
  const handleClick = () => {
    if (login === "LOGOUT") {
      setLogin((login) => "LOGIN");
      setUser({
        token: null,
        userID: null,
      });
    }
  };
  return (
    <div>
      <header className="masthead">
        <div className="overlay"></div>
        <nav className="navbar">
          <div className="container">
            <span className="navbar-brand" >
              <img src="/img/logo.png" alt="logo" />
            </span>
            <div className="app-container">
              <ul className="top-nav">
                <li className="top-nav--list">
                  <Link to="/home">HOME</Link>
                </li>
                <li className="top-nav--list">
                  <Link to="/posts">POSTS</Link>
                </li>
                <li className="top-nav--list">
                  <Link to="/profile">PROFILE</Link>
                </li>
                <li className="top-nav--list">
                  <Link to="/login" onClick={handleClick}>
                    {login}
                  </Link>
                </li>
                <li className="top-nav--list">
                  <Link to="/register">REGISTER</Link>
                </li>
              </ul>

              <div className="search-bar clearfix">
                <form action="/search" method="GET">
                  <input
                    name="searchTerm"
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                  />
                  <button className="search-button" type="submit">
                    <FontAwesomeIcon 
                      icon="fa-solid fa-magnifying-glass"
                      area-hidden="true"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>
        <div className="clearfix"></div>
        <div className="page-heading">
          <div className="container">
            <h1>BLOGGER</h1>
            <span className="sub-heading">Engineer/Content Creater</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
