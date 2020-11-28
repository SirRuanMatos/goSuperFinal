import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.11:3333",
  validateStatus: (status) => status >= 200 && status < 600,
});

export default api;
