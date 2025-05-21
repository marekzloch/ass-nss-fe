import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://d71f-89-248-248-167.ngrok-free.app',
    headers: {
        'ngrok-skip-browser-warning': 'skip-browser-warning'
    }
});

export { apiClient };