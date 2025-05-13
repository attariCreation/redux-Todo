  import Todo from "./components/todo";
  import AddTodo from "./components/addTodo";
  import "./App.css";
  import getAllTodos from "./api/todoApi";
  import { useEffect, useState } from "react";
  

  const App = () => {

    const [todos, setTodos ] = useState([])

    const fetchTodos = async () =>  {

      const data = await getAllTodos()
      console.log(data)
      setTodos(data.data)

      return todos;

    }

    useEffect(( )=> {

      fetchTodos()
    }, [] )


    
    return (
      <div className="app-container">
        <h1>Complete Todo MERN Stack App</h1>
        <AddTodo resetPage={fetchTodos} />
        <Todo todos={todos} resetPage={fetchTodos} />
      </div>
    );
  };

  export default App;
