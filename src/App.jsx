import React from "react";
import Todo from "./components/todo";
import AddTodo from "./components/addTodo";
const App = () => {
  return (
    <>
      <h1 className="text-center font-bold text-2xl mt-4 bg-gray-200">redux practice </h1>
      <AddTodo />
      <Todo />
    </>
  );
};

export default App;
