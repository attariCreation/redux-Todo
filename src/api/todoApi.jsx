import axiosInstance from "../utils/axiosinterceptor"
const render = import.meta.env.VITE_RENDER_SERVICE_PATH

 const createTodo = async (todoData) => {
    const response = await axiosInstance.post(`${render}/todo/createTodo`, todoData )
    return response.data
}

 const getAllTodos = async ({userId}) => {
    const response = await axiosInstance.get(`${render}/todo/getAllTodos`, userId)
    return response.data
}
const removeTodo = async (todoId) => {
    console.log("API call to delete Todo with ID:", todoId); 
    const response = await axiosInstance.delete(`${render}/deleteTodo/${todoId}`)
    return  response.data
}
const updateTodo = async (todoData) => {
    console.log("ne todo data", todoData)
    const response = await axiosInstance.patch(`${render}/todo/updateTodo/${todoData._id}`, todoData)
    return response.data
}
export default getAllTodos
export {removeTodo, createTodo, updateTodo}