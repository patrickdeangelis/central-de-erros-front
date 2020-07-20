import axios from 'axios';

const api = axios.create({
    baseURL: 'https://error-center-logs.herokuapp.com'
});

export default api;