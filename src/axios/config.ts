import axios from "axios";

const scheduleFetch = axios.create({
  baseURL: "http://teste-frontend.saperx.com.br/api",
});

export default scheduleFetch;
