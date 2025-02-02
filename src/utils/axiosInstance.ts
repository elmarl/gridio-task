import axios from "axios";

const instance = axios.create({
  // assuming this is the backend api in a real application
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
    timeout: 5000,
  },
});

export default instance;
