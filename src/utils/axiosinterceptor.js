import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001"
})
axiosInstance.interceptors.request.use((config) => {
    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDcwNjEzMzB9.KLZd-KcQv3reP44le-rQEdrylE4FO7BVtD9I4Bx6QKE"

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
})
export default axiosInstance;