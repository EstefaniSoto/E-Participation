import axios from "axios";

// Cambia la URL según tu puerto y protocolo
const API = axios.create({
  baseURL: "http://localhost:98/api/"
});

export default API;
