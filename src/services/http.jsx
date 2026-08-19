import Swal from "sweetalert2";

const API_URL = "https://ecommerce.monzeryshop.shop/api/";

function getAuthHeaders() {
  const token = localStorage.getItem("access_token");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
}

export async function callApiPost(url, bodyObj, GetErrorMsg) {
  try {
    const res = await fetch(API_URL + url, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(bodyObj),
    });

    const responseBody = await res.json();

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: `${GetErrorMsg(responseBody)} http ${res.status}`,
        confirmButtonText: "إغلاق",
      });

      return null;
    }

    return responseBody;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: error.message || "حدث خطأ في الاتصال بالخادم",
      confirmButtonText: "إغلاق",
    });

    return null;
  }
}

export async function callApiGet(url, GetErrorMsg) {
  try {
    const res = await fetch(API_URL + url, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const responseBody = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        Swal.fire({
          icon: "error",
          title: "انتهت الجلسة",
          text: "يرجى تسجيل الدخول مرة أخرى",
          confirmButtonText: "إغلاق",
        });
      } else if (GetErrorMsg) {
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: `${GetErrorMsg(responseBody)} http ${res.status}`,
          confirmButtonText: "إغلاق",
        });
      }

      return null;
    }

    return responseBody;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: error.message || "حدث خطأ في الاتصال بالخادم",
      confirmButtonText: "إغلاق",
    });

    return null;
  }
}