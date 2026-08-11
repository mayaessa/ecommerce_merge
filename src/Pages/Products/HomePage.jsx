import React from "react";
import { Link } from "react-router-dom";
import useAxiosGet from "../../hooks/UseAxiosGet";
// TEST GIT
function StarRating({ rating }) {
  const rounded = Math.round(Number(rating) || 0);
  return (
    <div className="d-flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={`bi ${i <= rounded ? "bi-star-fill" : "bi-star"} text-warning me-1`}
        ></i>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const price = Number(product.price);
  const discountRatio = Number(product.discount_ratio) || 0;
  const finalPrice = discountRatio > 0 ? price - (price * discountRatio) / 100 : price;

  return (
    <div className="col-lg-3 col-md-6 col-6 mb-4">
      <Link
        to={`/ProductDetails/${product.id}`}
        className="text-decoration-none text-dark"
      >
        <div
          className="bg-light rounded d-flex align-items-center justify-content-center position-relative"
          style={{ height: "250px" }}
        >
          {discountRatio > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-0 m-2">
              -{discountRatio}%
            </span>
          )}
          <img
            src={product.hero_image}
            alt={product.name}
            style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        <div className="pt-2">
          <h6 className="mb-2">{product.name}</h6>
          <div className="d-flex gap-2 mb-1">
            <span className="text-danger fw-semibold">${finalPrice.toFixed(2)}</span>
            {discountRatio > 0 && (
              <span className="text-muted text-decoration-line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          <StarRating rating={product.reviews} />
        </div>
      </Link>
    </div>
  );
}

const HomePage = () => {
 
  const { data, loading, error } = useAxiosGet("HomePage");

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <p>Could not load home page data.</p>
      </div>
    );
  }

  const homeData = data?.data || {};
  const sliders = homeData.sliders || [];
  const categories = homeData.categories || [];
  const flashSales = homeData.product_with_active_sales || [];
  const bestSelling = homeData.most_reviewed_products || [];
  const exploreProducts = homeData.latest_products || [];
  const newArrivals = homeData.featured_products || [];

  return (
    <div className="container py-4">

      {sliders[0] && (
        <div
          className="bg-dark text-white rounded mb-5 d-flex align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <img
            src={sliders[0].image_path}
            alt="hero"
            style={{ maxHeight: "280px", objectFit: "contain" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      )}

     
      {categories.length > 0 && (
        <section className="mb-5">
          <h5 className="text-danger mb-1">Categories</h5>
          <h2 className="fw-bold mb-4">Browse By Category</h2>
          <div className="row">
            {categories.map((cat) => (
              <div className="col-lg-2 col-md-4 col-4 mb-3" key={cat.id}>
                <div className="border rounded text-center py-4">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    style={{ width: "32px", height: "32px", objectFit: "contain" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <p className="mb-0 mt-2">{cat.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      
      {flashSales.length > 0 && (
        <section className="mb-5">
          <h5 className="text-danger mb-1">Today's</h5>
          <h2 className="fw-bold mb-4">Flash Sales</h2>
          <div className="row">
            {flashSales.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </section>
      )}

      
      {bestSelling.length > 0 && (
        <section className="mb-5">
          <h5 className="text-danger mb-1">This Month</h5>
          <h2 className="fw-bold mb-4">Best Selling Products</h2>
          <div className="row">
            {bestSelling.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </section>
      )}

    
      {exploreProducts.length > 0 && (
        <section className="mb-5">
          <h5 className="text-danger mb-1">Our Products</h5>
          <h2 className="fw-bold mb-4">Explore Our Products</h2>
          <div className="row">
            {exploreProducts.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </section>
      )}

      {newArrivals.length > 0 && (
        <section className="mb-5">
          <h5 className="text-danger mb-1">Featured</h5>
          <h2 className="fw-bold mb-4">New Arrival</h2>
          <div className="row">
            {newArrivals.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default HomePage;
