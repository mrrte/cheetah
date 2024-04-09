import axios from "axios";
import { SERVER_URL } from "./constants/envConstants";

const apiClient = axios.create({
    baseURL: `${SERVER_URL}/api`,
  });



export default apiClient;