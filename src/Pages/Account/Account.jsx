import { useState } from "react";
import "./Account.css";
import { useTranslation } from "react-i18next";

function Account() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    firstName: "Maya",
    lastName: "Essa",
    email: "mayaessa@gmail.com",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="account-page">
      <div className="container">

        <div className="account-top">
          <p className="breadcrumb-text">
            {t("home")} / <span>{t("myAccount")}</span>
          </p>

          <p className="welcome-text">
            {t("welcome")} <span>Maya</span>
          </p>
        </div>

        <div className="row account-row">

          <div className="col-lg-3">
            <div className="account-sidebar">

              <h6>{t("manageAccount")}</h6>

              <ul>
                <li className="active">{t("myProfile")}</li>
                <li>{t("addressBook")}</li>
                <li>{t("paymentOptions")}</li>
              </ul>

              <h6>{t("myOrders")}</h6>

              <ul>
                <li>{t("myReturns")}</li>
                <li>{t("myCancellations")}</li>
              </ul>

              <h6>{t("myWishlist")}</h6>

            </div>
          </div>

          <div className="col-lg-9">
            <div className="account-form-box">

              <h5 className="form-title">
                {t("editProfile")}
              </h5>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6">
                    <label>{t("firstName")}</label>

                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>{t("lastName")}</label>

                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>{t("email")}</label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>{t("address")}</label>

                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <p className="password-title">
                  {t("passwordChanges")}
                </p>

                <input
                  type="password"
                  name="currentPassword"
                  placeholder={t("currentPassword")}
                  className="form-control mb-3"
                  value={form.currentPassword}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="newPassword"
                  placeholder={t("newPassword")}
                  className="form-control mb-3"
                  value={form.newPassword}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t("confirmNewPassword")}
                  className="form-control mb-3"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />

                <div className="form-actions">

                  <button
                    type="button"
                    className="btn cancel-btn"
                  >
                    {t("cancel")}
                  </button>

                  <button
                    type="submit"
                    className="btn save-btn"
                  >
                    {t("saveChanges")}
                  </button>

                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Account;