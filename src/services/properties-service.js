import axios from 'axios';

const http = axios.create({
    baseURL: 'https://homelist.com/api'
})

http.interceptors.response.use(
    ({ data }) => data,
    (error) => Promise.reject(error)
);

export const list = () => http.get('/properties');
export const getProperty = (id) => http.get(`/properties/${id}`);

export const toggleFavorite = (id) => {
    const users = JSON.parse(localStorage.getItem('users-db') || '[]');
    const currentUser = users[0]; 
    if (!currentUser) {
        console.error("Usuário não identificado para favoritar");
        return Promise.reject("No user logged in");
    }
    return http.post(`/properties/${id}/favorite`, {
        userId: currentUser.id
    });


};
export const getFavorites = () => {
    const users = JSON.parse(localStorage.getItem('users-db') || '[]');
    const currentUser = users[0];

    return http.get(`/properties?favorite=true&userId=${currentUser?.id}`);
};

