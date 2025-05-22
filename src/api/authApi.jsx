import axios from "axios";

const render = "https://todo-backend-8b06.onrender.com"

const loginUser = async (userData) => {

   const response = await axios.post(`${render}/auth/login`, userData)

   
   console.log(response.data)
   return response.data
}
const createUser = async (userData) => {
   const response = await axios.post(`${render}/auth/sign-up`, userData)

   console.log("create user api test", response.data)

   return response.data
}
export {loginUser, createUser}