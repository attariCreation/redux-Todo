import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";

const AddTodo = () => {
  const [input, setInput] = useState("");  // Initialize with an empty string
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    
      dispatch(addTodo({text:input } ));
      console.log(input)
      setInput("");  // Clear the input after dispatching
    
  };

  return (
    <>
      <div className="flex justify-center items-center my-10">
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value) ; console.log(e.target.value)} }
          className="border-2 border-zinc-300 px-7 py-3 mx-10 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          type="text"
          placeholder="Enter the name"
        />
        <button
          onClick={addTodoHandler}
          className="px-7 py-3 bg-zinc-900 font-bold text-white hover:bg-transparent hover:border-2 hover:border-zinc-900 transition-all duration-200 hover:text-zinc-900 rounded-md"
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddTodo;
