
const BASE_URL = "http://192.168.1.2:8000/api";

export const api = {
  register: `${BASE_URL}/register`,
  login: `${BASE_URL}/login`,
  user: `${BASE_URL}/user`,
  logout: `${BASE_URL}/logout`,
};

export default BASE_URL;
