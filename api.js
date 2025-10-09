import axios from "axios";

// Cambia la URL según tu puerto y protocolo
const API = axios.create({

  baseURL: "http://190.166.237.107/eparticipacion/api/" 

});

export default API;
