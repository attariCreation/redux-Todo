import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addTodo, removeTodo } from "../redux/todoSlice";

const Todo = () => {
  const todos = useSelector((state) => state.todo.todos);  // Corrected selector
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <h2 className="text-2xl"> Todos list here !</h2>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            title: {todo.title}  {/* Corrected the property name from 'text' to 'title' */}
            <button
              className="text-red-500 cursor-pointer hover:text-red-700 hover:border-2 hover:border-red-600 transition-all duration-75 delay-100 px-5 py-2"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
