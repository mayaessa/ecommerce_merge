import { useTranslation } from "react-i18next";
import "./About.css";

const team = [
  {
    name: "Tom Cruise",
    role: "founder",
    img: "/image 47.png",
  },
  {
    name: "Emma Watson",
    role: "director",
    img: "/image 46.png",
  },
  {
    name: "Will Smith",
    role: "designer",
    img: "/image 51.png",
  },
];

const stats = [
  {
    icon: "/icon_shop.png",
    value: "10.5k",
    label: "activeSellers",
    highlight: false,
  },
  {
    icon: "/Services.png",
    value: "33k",
    label: "monthlySales",
    highlight: true,
  },
  {
    icon: "/Icon-Shopping bag.png",
    value: "45.5k",
    label: "activeCustomers",
    highlight: false,
  },
  {
    icon: "/Services (1).png",
    value: "25k",
    label: "annualSales",
    highlight: false,
  },
];

const features = [
  {
    icon: "/Services (2).png",
    title: "freeDelivery",
    desc: "freeDeliveryDesc",
  },
  {
    icon: "/Services (3).png",
    title: "customerService",
    desc: "customerServiceDesc",
  },
  {
    icon: "/Services (4).png",
    title: "moneyGuarantee",
    desc: "moneyGuaranteeDesc",
  },
];

function About() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="container">

        {/* Breadcrumb */}
        <p className="breadcrumb-text">
          {t("home")} / <span>{t("about")}</span>
        </p>

        {/* Our Story */}
        <div className="row align-items-center our-story-section">

          <div className="col-lg-6">
            <h1 className="story-title">
              {t("ourStory")}
            </h1>

            <p className="story-text">
              {t("storyText1")}
            </p>

            <p className="story-text">
              {t("storyText2")}
            </p>
          </div>

          <div className="col-lg-6">
            <img
              src="/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1 (1).png"
              alt={t("ourStory")}
              className="story-image"
            />
          </div>

        </div>

        {/* Stats */}
        <div className="row stats-section">
          {stats.map((stat, index) => (
            <div className="col-md-3 col-6" key={index}>
              <div
                className={`stat-card ${
                  stat.highlight ? "highlight" : ""
                }`}
              >
                <div className="stat-icon">
                  <img src={stat.icon} alt="" />
                </div>

                <h3>{stat.value}</h3>

                <p>{t(stat.label)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="row team-section">
          {team.map((member, index) => (
            <div className="col-lg-4" key={index}>
              <div className="team-card">

                <img
                  src={member.img}
                  alt={member.name}
                  className="team-photo"
                />

                <h4>{member.name}</h4>

                <p>{t(member.role)}</p>

                <div className="team-socials">
                  <i className="bi bi-twitter"></i>
                  <i className="bi bi-instagram"></i>
                  <i className="bi bi-linkedin"></i>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="row features-section">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="feature-card">

                <div className="feature-icon">
                  <img src={feature.icon} alt="" />
                </div>

                <h5>{t(feature.title)}</h5>

                <p>{t(feature.desc)}</p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default About;