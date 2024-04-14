
import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies'


// const baseURL = process.env.NEXT_SOME_API_URL || 'http://localhost:3333';

const http = axios.create({
    baseURL: 'http://localhost:3333',
})

http.interceptors.request.use(async (config) => {
    try {
        const cookieToken = await parseCookies();
        if (cookieToken.user_token) {
            config.headers['Authorization'] = `Bearer ${cookieToken.user_token}`;
        }
    } catch (error) {
        // Handle error if parsing cookies fails
        console.error('Failed to parse cookies:', error);
    }
    return config;
});

export { http };


// export { http, setToken }
// const setToken = (token: string) => {
//     http.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }