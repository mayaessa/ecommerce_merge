import { useTranslation } from "react-i18next";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6 footer-col">
            <h3 className="footer-logo">Exclusive</h3>

            <h5>{t("subscribe")}</h5>

            <p>{t("getDiscount")}</p>

            <div className="subscribe-box">
              <input
                type="email"
                placeholder={t("enterEmail")}
              />

              <button type="button">
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>


          <div className="col-lg-3 col-md-6 footer-col">
            <h5>{t("support")}</h5>

            <p>
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>

            <p>exclusive@gmail.com</p>

            <p>+88015-88888-9999</p>
          </div>


          <div className="col-lg-2 col-md-6 footer-col">
            <h5>{t("account")}</h5>

            <ul>
              <li>{t("myAccount")}</li>
              <li>{t("loginRegister")}</li>
              <li>{t("cart")}</li>
              <li>{t("wishlist")}</li>
              <li>{t("shop")}</li>
            </ul>
          </div>


          <div className="col-lg-2 col-md-6 footer-col">
            <h5>{t("quickLink")}</h5>

            <ul>
              <li>{t("privacyPolicy")}</li>
              <li>{t("termsOfUse")}</li>
              <li>{t("faq")}</li>
              <li>{t("contact")}</li>
            </ul>
          </div>


          <div className="col-lg-2 col-md-6 footer-col">
            <h5>{t("downloadApp")}</h5>

            <p className="small-text">
              {t("saveApp")}
            </p>

            <div className="app-badges">
              <img
                src="/Qrcode 1.png"
                alt="qr code"
                className="qr-img"
              />

              <div className="store-badges">
                <img
                  src="/download-appstore.png"
                  alt="app store"
                />
              </div>
            </div>

            <div className="social-icons">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-linkedin"></i>
            </div>
          </div>

        </div>

        <hr />

        <p className="copyright">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;