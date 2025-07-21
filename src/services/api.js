import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getBookById = (id) => API.get(`/books/${id}`);
export const getAllBooks = (sort = "newest") => API.get(`/books?sort=${sort}`);
export const getFeaturedBooks = (sort = "rating") => API.get(`/books?sort=${sort}`);
export const getUserInfo = () => API.get("/users/me");
export const getRelatedBooks = (id) => { return API.get(`/books/${id}/related`)}
export const login = (email, password) => API.post("/auth/login", { email, password });
export default API;