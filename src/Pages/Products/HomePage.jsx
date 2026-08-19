import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosGet from "../../hooks/UseAxiosGet";
import useAxiosPost from "../../hooks/UseAxiosPost";
import Countdown from "../../Components/Countdown";
import ProductRow from "../../Components/ProductRow";
import { useTranslation } from "react-i18next";
import "./HomePage.css";

// 
// public/assets/logo.png
const LOGO = `${import.meta.env.BASE_URL}assets/logo.png`;


/* =========================
   Image Fallback
========================= */

const handleImageError = (e) => {
  
  if (e.currentTarget.dataset.fallback === "true") {
    return;
  }

  e.currentTarget.dataset.fallback = "true";
  e.currentTarget.onerror = null;
  e.currentTarget.src = LOGO;
};


/* =========================
   Star Rating
========================= */

function StarRating({ rating }) {
  const rounded = Math.round(Number(rating) || 0);

  return (
    <div className="d-flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={`bi ${
            i <= rounded ? "bi-star-fill" : "bi-star"
          } text-warning me-1`}
        />
      ))}
    </div>
  );
}


/* =========================
   Product Card
========================= */

function ProductCard({ product }) {
  const { t } = useTranslation();
  const price = Number(product.price) || 0;
  const discountRatio = Number(product.discount_ratio) || 0;

  const finalPrice =
    discountRatio > 0
      ? price - (price * discountRatio) / 100
      : price;

  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    postData: addToCart,
    loading: addingToCart,
  } = useAxiosPost("add-to-cart");

  const {
    postData: toggleWishlist,
    loading: togglingWishlist,
  } = useAxiosPost("toggle");


  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await addToCart({
      product_id: product.id,
      quantity: 1,
    });
  };


  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await toggleWishlist(
      {},
      `/${product.id}`
    );

    if (response && response.status && response.status < 400) {
      setIsWishlisted((prev) => !prev);
    }
  };


  return (
    <Link
      to={`/ProductDetails/${product.id}`}
      className="text-decoration-none text-dark d-block"
    >
      <div className="hp-product-image bg-light rounded d-flex align-items-center justify-content-center position-relative">

        {/* Discount */}
        {discountRatio > 0 && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            -{discountRatio}%
          </span>
        )}


        {/* Wishlist */}
        <button
          type="button"
          className="hp-wishlist-btn"
          onClick={handleToggleWishlist}
          disabled={togglingWishlist}
          aria-label="toggle wishlist"
        >
          <i
            className={`bi ${
              isWishlisted
                ? "bi-heart-fill text-danger"
                : "bi-heart"
            }`}
          />
        </button>


        {/* Product Image */}
        <img
          src={product.hero_image || LOGO}
          alt={product.name || "Product"}
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            objectFit: "contain",
          }}
          onError={handleImageError}
        />


        {/* Add To Cart */}
        <button
          type="button"
          className="hp-add-cart-btn"
          onClick={handleAddToCart}
          disabled={addingToCart}
        >
          {addingToCart ? t("adding") : t("addToCart")}
        </button>

      </div>


      {/* Product Info */}
      <div className="pt-2">

        <h6 className="mb-2 hp-product-name">
          {product.name || "Product"}
        </h6>

        <div className="d-flex gap-2 mb-1 flex-wrap">

          <span className="text-danger fw-semibold">
            ${finalPrice.toFixed(2)}
          </span>

          {discountRatio > 0 && (
            <span className="text-muted text-decoration-line-through">
              ${price.toFixed(2)}
            </span>
          )}

        </div>

        <StarRating rating={product.reviews} />

      </div>
    </Link>
  );
}


/* =========================
   Home Page
========================= */

const HomePage = () => {
  const { t } = useTranslation();

  const {
    data,
    loading,
    error,
  } = useAxiosGet("HomePage");

  /* =========================
     Category Filter
  ========================= */
  const [activeCategory, setActiveCategory] = useState(null);

  const filterUrl = activeCategory
    ? `products?category=${activeCategory.id}`
    : null;

  const {
    data: filteredData,
    loading: filteredLoading,
    error: filteredError,
  } = useAxiosGet(filterUrl);

  const handleCategoryClick = (cat) => {
    setActiveCategory((prev) => (prev?.id === cat.id ? null : cat));
  };

  const filteredProducts = filteredData?.data || [];


  /* Loading */
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <p>{t("loading")}</p>
      </div>
    );
  }


  /* Error */
  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <p>{t("couldNotLoad")}</p>
      </div>
    );
  }


  const homeData = data?.data || {};

  const sliders = homeData.sliders || [];
  const categories = homeData.categories || [];
  const flashSales =
    homeData.product_with_active_sales || [];
  const bestSelling =
    homeData.most_reviewed_products || [];
  const exploreProducts =
    homeData.latest_products || [];
  const newArrivals =
    homeData.featured_products || [];


  return (
    <div className="container py-4 hp-container">


      {/* =========================
          HERO
      ========================= */}

      {sliders.length > 0 && (
        <div className="hp-hero bg-dark text-white rounded mb-5 d-flex align-items-center justify-content-center">

          <img
            src={sliders[0]?.image_path || LOGO}
            alt="hero"
            className="hp-hero-img"
            onError={handleImageError}
          />

        </div>
      )}


      {/* =========================
          CATEGORIES
      ========================= */}

      {categories.length > 0 && (
        <section className="mb-5">

          <h5 className="text-danger mb-1">
            {t("categories")}
          </h5>

          <h2 className="hp-section-title fw-bold mb-4">
            {t("browseCategory")}
          </h2>


          <div className="row g-2 g-md-3">

            {categories.map((cat) => (

              <div
                className="col-4 col-sm-3 col-md-2"
                key={cat.id}
              >

                <div
                  className={`hp-category-card border rounded text-center ${
                    activeCategory?.id === cat.id ? "active" : ""
                  }`}
                  role="button"
                  onClick={() => handleCategoryClick(cat)}
                >

                  <img
                    src={cat.icon || LOGO}
                    alt={cat.name || "Category"}
                    className="hp-category-icon"
                    onError={handleImageError}
                  />

                  <p className="mb-0 mt-2 hp-category-name">
                    {cat.name}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>
      )}


      {/* =========================
          FILTERED BY CATEGORY
      ========================= */}

      {activeCategory && (
        <section className="mb-5 hp-filtered-section">

          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">

            <h2 className="hp-section-title fw-bold mb-0">
              {activeCategory.name}
            </h2>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setActiveCategory(null)}
            >
              <i className="bi bi-x-lg me-1"></i>
              {t("clearFilter")}
            </button>

          </div>

          {filteredLoading && <p>{t("loading")}</p>}

          {filteredError && (
            <p className="text-danger">{t("couldNotLoadCategoryProducts")}</p>
          )}

          {!filteredLoading && !filteredError && filteredProducts.length === 0 && (
            <p className="text-muted">{t("noProductsInCategory")}</p>
          )}

          {!filteredLoading && filteredProducts.length > 0 && (
            <div className="row">
              {filteredProducts.map((p) => (
                <div className="col-6 col-md-4 col-lg-3 mb-4" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}

        </section>
      )}


      {/* =========================
          FLASH SALES
      ========================= */}

      {flashSales.length > 0 && (
        <section className="mb-5">

          <div className="d-flex justify-content-between align-items-end flex-wrap mb-4">

            <div>

              <h5 className="text-danger mb-1">
                {t("todays")}
              </h5>

              <div className="d-flex align-items-center gap-4 flex-wrap">

                <h2 className="hp-section-title fw-bold mb-0">
                  {t("flashSales")}
                </h2>

                <Countdown
                  endsAt={flashSales[0]?.sale_ends_at}
                />

              </div>

            </div>

          </div>


          <ProductRow>

            {flashSales.map((p) => (

              <div
                className="hp-scroll-item"
                key={p.id}
              >
                <ProductCard product={p} />
              </div>

            ))}

          </ProductRow>

        </section>
      )}


      {/* =========================
          BEST SELLING
      ========================= */}

      {bestSelling.length > 0 && (
        <section className="mb-5">

          <h5 className="text-danger mb-1">
            {t("thisMonth")}
          </h5>

          <h2 className="hp-section-title fw-bold mb-4">
            {t("bestSelling")}
          </h2>


          <ProductRow>

            {bestSelling.map((p) => (

              <div
                className="hp-scroll-item"
                key={p.id}
              >
                <ProductCard product={p} />
              </div>

            ))}

          </ProductRow>

        </section>
      )}


      {/* =========================
          EXPLORE PRODUCTS
      ========================= */}

      {exploreProducts.length > 0 && (
        <section className="mb-5">

          <h5 className="text-danger mb-1">
            {t("ourProducts")}
          </h5>

          <h2 className="hp-section-title fw-bold mb-4">
            {t("exploreProducts")}
          </h2>


          <ProductRow>

            {exploreProducts.map((p) => (

              <div
                className="hp-scroll-item"
                key={p.id}
              >
                <ProductCard product={p} />
              </div>

            ))}

          </ProductRow>

        </section>
      )}


      {/* =========================
          NEW ARRIVAL
      ========================= */}

      {newArrivals.length > 0 && (
        <section className="mb-5">

          <h5 className="text-danger mb-1">
            {t("featured")}
          </h5>

          <h2 className="hp-section-title fw-bold mb-4">
            {t("newArrival")}
          </h2>


          <div className="row">

            {newArrivals.map((p) => (

              <div
                className="col-6 col-md-4 col-lg-3 mb-4"
                key={p.id}
              >
                <ProductCard product={p} />
              </div>

            ))}

          </div>

        </section>
      )}

    </div>
  );
};


export default HomePage;