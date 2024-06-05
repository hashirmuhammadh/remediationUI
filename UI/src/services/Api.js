import axios from "axios";

const api = axios.create({
  baseURL: "http://54.255.249.171:5000/",
});

export default api;
