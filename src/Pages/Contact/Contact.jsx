import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

function Contact() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };


  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = t("nameRequired");
    }

    if (!form.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t("invalidEmail");
    }

    if (!form.phone.trim()) {
      newErrors.phone = t("phoneRequired");
    }

    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log(form);

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };


  return (
    <div className="contact-page">
      <div className="container">

        <p className="breadcrumb-text">
          {t("home")} / <span>{t("contact")}</span>
        </p>


        <div className="row contact-row">

          {/* Contact Information */}

          <div className="col-lg-4">
            <div className="contact-info-box">

              <div className="info-item">

                <div className="info-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>

                <h5>{t("callToUs")}</h5>

                <p>
                  {t("available247")}
                </p>

                <p>
                  {t("phone")}: +8801611112222
                </p>

              </div>


              <hr />


              <div className="info-item">

                <div className="info-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>

                <h5>{t("writeToUs")}</h5>

                <p>
                  {t("contactWithin24")}
                </p>

                <p>
                  {t("emails")}: customer@exclusive.com
                </p>

                <p>
                  {t("emails")}: support@exclusive.com
                </p>

              </div>

            </div>
          </div>


          {/* Contact Form */}

          <div className="col-lg-8">

            <div className="contact-form-box">

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-4">

                    <input
                      type="text"
                      name="name"
                      placeholder={t("yourName")}
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                    />

                    {errors.name && (
                      <small className="text-danger">
                        {errors.name}
                      </small>
                    )}

                  </div>


                  <div className="col-md-4">

                    <input
                      type="email"
                      name="email"
                      placeholder={t("yourEmail")}
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                    />

                    {errors.email && (
                      <small className="text-danger">
                        {errors.email}
                      </small>
                    )}

                  </div>


                  <div className="col-md-4">

                    <input
                      type="text"
                      name="phone"
                      placeholder={t("yourPhone")}
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                    />

                    {errors.phone && (
                      <small className="text-danger">
                        {errors.phone}
                      </small>
                    )}

                  </div>

                </div>


                <textarea
                  name="message"
                  placeholder={t("yourMessage")}
                  className="form-control message-box mt-3"
                  value={form.message}
                  onChange={handleChange}
                ></textarea>


                <div className="text-end mt-3">

                  <button
                    type="submit"
                    className="btn send-btn"
                  >
                    {t("sendMessage")}
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

export default Contact;