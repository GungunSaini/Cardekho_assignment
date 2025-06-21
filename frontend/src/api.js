// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://cardekho-assignment.onrender.com/api",
});


export default API;
