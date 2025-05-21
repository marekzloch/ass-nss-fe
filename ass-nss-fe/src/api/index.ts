import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://0321-195-113-216-26.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "skip-browser-warning",
  },
});

export { apiClient };