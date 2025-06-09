import axios from "axios";
import { toast } from "react-toastify";


// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:9000/'
});
instance.defaults.withCredentials = true;

// // Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const status = error && error.response && error.response.status || 500;
    switch (status) {
        case 400: {
            toast.error("Bad request!");
            return Promise.reject(error)
        }
        case 401: {
            toast.error("Not Authenticated JWT! FE");
            // window.location.href = ("/login");
            return Promise.reject(error);
        }
        case 402: {
            return Promise.reject(error)
        }
        case 403: {
            toast.error("Do NOT have permission to access the feature! FE");
            return Promise.reject(error)
        }
        case 404: {
            toast.error("Không thấy đường dẫn");
            return Promise.reject(error)
        }
        case 405: {
            return Promise.reject(error)
        }
        default: {
            return Promise.reject(error)
        }
    }

    return Promise.reject(error);
});

export default instance;