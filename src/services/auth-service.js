import axios from 'axios';

const http = axios.create({
    baseURL: 'https://homelist.com/api'
})

http.interceptors.response.use(
    ({ data }) => data, 
    (error) => Promise.reject(error)
);

export const register = (user) => http.post('/users', user)

export const login = (user) => http.post('/auth', user)






