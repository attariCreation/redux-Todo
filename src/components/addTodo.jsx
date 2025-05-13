import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import { createTodo } from "../api/todoApi";

const AddTodo = ({resetPage}) => {

  const [input, setInput] = useState("");
  
  const dispatch = useDispatch();

  const addTodoHandler = async (e) => {
    e.preventDefault();
    
    const data = await createTodo({title: input, completed: "true"})
    dispatch(addTodo(data));
    resetPage()
    setInput("");
  };

  return (
    <form className="add-todo-form" onSubmit={addTodoHandler}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="add-todo-input"
        type="text"
        placeholder="Enter the name"
      />
      
      <button type="submit" className="add-todo-btn">
        Add
      </button>
    </form>
  );
};

export default AddTodo;
