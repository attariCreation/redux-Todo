import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import { createTodo } from "../api/todoApi";
import { useSnackbar } from 'notistack'

const AddTodo = ({resetPage}) => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar()

  const addTodoHandler = async (e) => {

    e.preventDefault();

    try{
      const data = await createTodo({title: input, completed: "true", userId: localStorage.getItem("userId")})
      dispatch(addTodo(data));
      resetPage()
      setInput("");
    }
    catch(e){
      alert("please enter the required data " + e)
    }finally{
      enqueueSnackbar("added your data successfully", {variant: 'success'})
    }
  };

  return (
    <form className="w-full max-w-3xl mx-auto p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-100" onSubmit={addTodoHandler}>
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">Add New Task</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-5 py-3 text-base border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          type="text"
          placeholder="What needs to be done?"
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-md"
        >

          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
