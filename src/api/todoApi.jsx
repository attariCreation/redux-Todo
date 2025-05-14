import axiosInstance from "../utils/axiosinterceptor"

 const createTodo = async (todoData) => {
    const response = await axiosInstance.post("http://localhost:3001/todo/createTodo", todoData )
    return response.data
}

 const getAllTodos = async () => {
    const response = await axiosInstance.get("http://localhost:3001/todo/getAllTodos")
    return response.data
}
const removeTodo = async (todoId) => {
    console.log("API call to delete Todo with ID:", todoId); 
    const response = await axiosInstance.delete(`http://localhost:3001/todo/deleteTodo/${todoId}`)
    return  response.data
}
const updateTodo = async (todoData) => {
    console.log("ne todo data", todoData)
    const response = await axiosInstance.patch(`http://localhost:3001/todo/updateTodo/${todoData._id}`, todoData)
    return response.data
}
export default getAllTodos
export {removeTodo, createTodo, updateTodo}