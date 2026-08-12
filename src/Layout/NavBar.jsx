import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const closeNavbar = () => {
    setShowNavbar(false);
    setShowAccountMenu(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 border-bottom">
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
          onClick={closeNavbar}
        >
          Exclusive
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setShowNavbar(!showNavbar)}
          aria-expanded={showNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            showNavbar ? "show" : ""
          }`}
        >

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={closeNavbar}
              >
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={closeNavbar}
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                onClick={closeNavbar}
              >
                Sign Up
              </Link>
            </li>

          </ul>

          <div className="d-flex align-items-center gap-3">

            <input
              className="form-control"
              placeholder="What are you looking for?"
            />

            <i className="bi bi-heart fs-5"></i>

            <i className="bi bi-cart fs-5"></i>

            <div className="account-wrapper">

              <div
                className="account-icon"
                onClick={() =>
                  setShowAccountMenu(!showAccountMenu)
                }
              >
                <i className="bi bi-person-fill"></i>
              </div>

              {showAccountMenu && (
                <div className="account-dropdown">

                  <Link
                    to="/account"
                    className="dropdown-item"
                    onClick={closeNavbar}
                  >
                    <i className="bi bi-person"></i>
                    Manage My Account
                  </Link>

                  <div className="dropdown-item">
                    <i className="bi bi-bag-check"></i>
                    My Order
                  </div>

                  <div className="dropdown-item">
                    <i className="bi bi-x-circle"></i>
                    My Cancellations
                  </div>

                  <div className="dropdown-item">
                    <i className="bi bi-star"></i>
                    My Reviews
                  </div>

                  <div className="dropdown-item">
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default NavBar;