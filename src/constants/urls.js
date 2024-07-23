const BASE_URL = import.meta.env.VITE_API_URL;

// auth endpoints
export const endpoints = {
  REGISTER_API: BASE_URL + "/auth/register",
  LOGIN_API: BASE_URL + "/auth/login",
  LOGOUT_API: BASE_URL + "/auth/logout",
  
  // error api endpoonts
  ERROR_API: BASE_URL + "/error",
  
 // token endpoints
 REFRESH_TOKEN_API: BASE_URL + "/refresh",
}

