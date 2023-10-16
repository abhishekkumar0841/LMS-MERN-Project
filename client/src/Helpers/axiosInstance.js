import axios from "axios";

const BASE_URL = "http://localhost:5014/api/v1";

//creating axios instance
const axiosInstance = axios.create();

//setting BASE_URL to baseUrl of axiosInstance
axiosInstance.defaults.baseURL = BASE_URL;

//setting credentials to true in axiosInstance
axiosInstance.defaults.withCredentials = true;

//exporting axiosInstance
export default axiosInstance;
