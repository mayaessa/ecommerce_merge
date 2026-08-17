import React, { useState } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "./AuthContext";
import { callApiPost } from "../../services/http";
import { useSpinner } from "./SpinnerContext";

const Login = () => {
  const { t } = useTranslation();

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState(null);
  const [lockButton, setLockButton] = useState(false);

  const { show, hide } = useSpinner();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setFormError(t("enterEmailPassword"));
      return;
    }

    setFormError(null);
    show();
    setLockButton(true);

    try {
      const result = await callApiPost(
        "login",
        {
          email,
          password,
        },
        (data) => data.message || t("loginFailed")
      );

      console.log("LOGIN RESPONSE:", result);

      if (result?.data) {
        login(
          result.data.user,
          result.data.access_token,
          result.data.refresh_token
        );

        navigate("/");
      }
    } catch (error) {
      setFormError(
        error?.response?.data?.message ||
        t("invalidCredentials")
      );
    } finally {
      hide();
      setLockButton(false);
    }
  }

  return (
    <div className="container-fluid login-page">
      <div className="row min-vh-100">

        {/* Left Side */}
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/Side_Image.png`}
            alt={t("login")}
            className="login-image"
          />
        </div>

        {/* Right Side */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center py-5">
          <div className="login-box">

            <h2 className="fw-bold mb-2">
              {t("loginToExclusive")}
            </h2>

            <p className="text-muted small mb-5">
              {t("enterDetails")}
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder={t("emailOrPhone")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  minLength={8}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  minLength={6}
                  className="form-control"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4 gap-3">

                <button
                  className="btn btn-danger px-5 py-2"
                  type="submit"
                  disabled={lockButton}
                >
                  {lockButton
                    ? t("loggingIn")
                    : t("login")}
                </button>

                <Link
                  to="/forgot-password"
                  className="text-danger text-decoration-none"
                >
                  {t("forgotPassword")}
                </Link>

              </div>

            </form>

            {formError && (
              <p className="text-danger mt-3">
                {formError}
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;