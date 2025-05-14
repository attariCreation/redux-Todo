import axios from "axios";

const loginUser = async (userData) => {
   const response = await axios.post("http://localhost:3001/auth/login", userData)
   console.log(response.data)
   return response.data
}
const createUser = async (userData) => {
   const response = await axios.post("http://localhost:3001/auth/sign-up", userData)

   console.log("create user api test", response.data)

   return response.data
}
export {loginUser, createUser}