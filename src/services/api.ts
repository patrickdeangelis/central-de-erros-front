import axios from 'axios';
import {Token} from '../hooks/AuthContext'

const api = axios.create({
    baseURL: 'https://error-center-logs.herokuapp.com'
});

api.interceptors.request.use(
    config => {
        const data = localStorage.getItem('@Logs:token');
        
        if (data) {
            const token = JSON.parse(data) as Token;
            config.headers['Authorization'] = 'JWT ' + token.access;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)

api.interceptors.response.use((response) => {
    return response
 }, function (error) {
    const originalRequest = error.config;
 
    if (error.response.status === 401 && originalRequest.url === 'https://error-center-logs.herokuapp.com/auth/jwt/refresh/') {
        // eslint-disable-next-line no-restricted-globals
        location.href = '/'
        return Promise.reject(error);
    }


    if (error.response.status === 401 && !originalRequest._retry) {
 
        originalRequest._retry = true;
        const data = localStorage.getItem('@Logs:token');
        
        if (!data || data.length <= 0) {
            return Promise.reject(error)
        }

        const token = JSON.parse(data) as Token;

        const refreshToken = token.refresh;
        return axios.post('https://error-center-logs.herokuapp.com/auth/jwt/refresh/',
            {
                "refresh": refreshToken
            })
            .then(res => {
                if (res.status === 200) {
                    const tokenData  = res.data as Token;
                    localStorage.setItem('@Logs:token', JSON.stringify(tokenData));
                    
                    api.defaults.headers.common['Authorization'] = 'JWT ' + tokenData.access;
                    originalRequest.headers['Authorization'] = 'JWT ' + tokenData.access;
                    return axios(originalRequest);
                }
            })
    }
    return Promise.reject(error);
 });

export default api;