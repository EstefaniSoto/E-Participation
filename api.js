import axios from "axios";

// Cambia la URL según tu puerto y protocolo
const API = axios.create({
  baseURL: "https://localhost:7192/api" 
});

export default API;
