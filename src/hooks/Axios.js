import axios from "axios";

const baseURL = "https://ecommerce.monzeryshop.shop/api/";

const privateAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const Axios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});


// اللغة + التوكن مع كل request
const setHeaders = (config) => {
  const lang = localStorage.getItem("i18nextLng") || "en";
  const token = localStorage.getItem("token");

  config.headers["Accept-Language"] = lang;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};


privateAxios.interceptors.request.use(
  (config) => {
    return setHeaders(config);
  },
  (error) => Promise.reject(error)
);


Axios.interceptors.request.use(
  (config) => {
    return setHeaders(config);
  },
  (error) => Promise.reject(error)
);


export { privateAxios, Axios };