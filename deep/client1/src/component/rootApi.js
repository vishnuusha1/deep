import axios from "axios";
const accessToken=localStorage.getItem('token')
export const axioInstance = axios.create({
  baseURL: "http://localhost:5000/",

  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

export default axioInstance;