import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Pages/AuthPages/AuthContext.jsx";
import "./Navbar.css";

function NavBar() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const closeNavbar = () => {
    setShowNavbar(false);
    setShowAccountMenu(false);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    localStorage.setItem("i18nextLng", lang);
  };

  const handleLogout = () => {
    logout();
    closeNavbar();
    navigate("/login");
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
                {t("home")}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={closeNavbar}
              >
                {t("contact")}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={closeNavbar}
              >
                {t("about")}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                onClick={closeNavbar}
              >
                {t("signup")}
              </Link>
            </li>

          </ul>

          <div className="d-flex align-items-center gap-3">

            <input
              className="form-control"
              placeholder={t("search")}
            />

            <Link to="/account" className="text-dark">
              <i className="bi bi-heart fs-5"></i>
            </Link>

            <Link to="/cart" className="text-dark">
              <i className="bi bi-cart fs-5"></i>
            </Link>

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
                    {t("manageAccount")}
                  </Link>

                  <div className="dropdown-item">
                    <i className="bi bi-bag-check"></i>
                    {t("myOrder")}
                  </div>

                  <div className="dropdown-item">
                    <i className="bi bi-x-circle"></i>
                    {t("myCancellations")}
                  </div>

                  <div className="dropdown-item">
                    <i className="bi bi-star"></i>
                    {t("myReviews")}
                  </div>

                  {/* Logout */}
                  <button
                    type="button"
                    className="dropdown-item border-0 bg-transparent w-100 text-start"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    {t("logout")}
                  </button>

                </div>
              )}

            </div>

            <select
              value={i18n.language?.substring(0, 2)}
              onChange={(e) => changeLanguage(e.target.value)}
              className="form-select language-select"
            >
              <option value="en">🇬🇧 English</option>
              <option value="ar">🇸🇦 العربية</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
            </select>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default NavBar;