import axios from "axios";

// this is the api client that is used to communicate with the backend
// it is created using axios and has base url set to the backend url 
// with current BE implementation it is set to the ngrok url that changes 
// on every restart 

// headers are set to skip browser warning -> after deploying to production this header should be removed


const apiClient = axios.create({
    baseURL: 'https://d71f-89-248-248-167.ngrok-free.app',
    headers: {
        'ngrok-skip-browser-warning': 'skip-browser-warning'
    }
});

export { apiClient };