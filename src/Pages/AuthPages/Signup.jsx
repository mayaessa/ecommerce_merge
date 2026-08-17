import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./Signup.css";
import useAxiosPost from "../../hooks/UseAxiosPost";

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { postData, loading } = useAxiosPost("register");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    password_confirmation: "",
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setFormError(null);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.phone_number ||
      !form.address ||
      !form.password ||
      !form.password_confirmation
    ) {
      setFormError(t("fillAllFields"));
      return;
    }

    if (form.password !== form.password_confirmation) {
      setFormError(t("passwordsNotMatch"));
      return;
    }

    const response = await postData(form);

    if (response?.status && response.status < 400) {
      navigate("/login");
    }
  }

  return (
    <div className="container-fluid signup-page">
      <div className="row min-vh-100">

        {/* Image */}
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/Side_Image.png`}
            alt={t("createAccount")}
            className="signup-image"
          />
        </div>

        {/* Form */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center py-5">
          <div className="signup-box">

            <h2 className="fw-bold mb-2">
              {t("createAccount")}
            </h2>

            <p className="text-muted small mb-5">
              {t("enterDetails")}
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder={t("firstName")}
                  value={form.first_name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder={t("lastName")}
                  value={form.last_name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder={t("email")}
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="phone_number"
                  className="form-control"
                  placeholder={t("phone")}
                  value={form.phone_number}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder={t("address")}
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  minLength={6}
                  className="form-control"
                  placeholder={t("password")}
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="password_confirmation"
                  minLength={6}
                  className="form-control"
                  placeholder={t("confirmPassword")}
                  value={form.password_confirmation}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              <div className="d-flex flex-column mt-4">

                <button
                  className="btn btn-danger py-2 create-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? t("creating")
                    : t("createAccount")}
                </button>

                <p className="text-center mt-4">
                  {t("alreadyHaveAccount")}{" "}

                  <Link
                    to="/login"
                    className="text-danger text-decoration-none"
                  >
                    {t("login")}
                  </Link>
                </p>

              </div>

            </form>

            {formError && (
              <p className="text-danger mt-2">
                {formError}
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;