import Todo from "./components/todo";
import AddTodo from "./components/addTodo";
import getAllTodos from "./api/todoApi";
import { useEffect, useState } from "react";
const App = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const data = await getAllTodos({userId: localStorage.getItem("userId")});
    console.log(data)
    console.log("logging to check userid from backend response", data.userId)
    setTodos(data.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
            Complete Todo MERN Stack App
          </h1>
        </div>
        <div className="p-4 md:p-8">
          <AddTodo resetPage={fetchTodos} />
          <Todo todos={todos} resetPage={fetchTodos} />
        </div>
      </div>
    </div>
  );
};

export default App;
