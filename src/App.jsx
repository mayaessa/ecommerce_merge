import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Pages */
import Login from "./Pages/AuthPages/Login";
import Signup from "./Pages/AuthPages/Signup";
import HomePage from "./Pages/Products/HomePage";
import Cart from "./Pages/Products/Cart";
import Checkout from "./Pages/Products/Checkout";
import ProductDetails from "./Pages/Products/ProductDetails";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Account from "./Pages/Account/Account";
import { useSpinner } from "./Pages/AuthPages/SpinnerContext";

/* Layout */
import Layout from "./Layout/Layout";

/* Global Snackbar */
import AppSnackbar from "./Components/AppSnackbar";
const ErrorPage = () => {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Application Error</h2>
      <p>Something went wrong.</p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
          errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "account", element: <Account /> },
      { path: "checkout", element: <Checkout /> },
      { path: "cart", element: <Cart /> },
      { path: "ProductDetails/:id", element: <ProductDetails /> },
    ],
  },
],
{
    basename: "/ecommerce_merge",
  });

const App = () => {
  const { showSpinner } = useSpinner();

  return (
    <>
      <AppSnackbar />

      {showSpinner && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <RouterProvider router={router} />
    </>
  );
};

export default App;
