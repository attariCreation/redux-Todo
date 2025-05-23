import { removeTodo as removeTodoApi, updateTodo } from "../api/todoApi";
import { useEffect, useState } from "react";

const Todo = ({ todos, resetPage }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");

  const deleteTodo = async (id) => {
    const response = await removeTodoApi(id);

    console.log(id)
    if (!response) {
      console.log("❌ Error with the response");
    } else {
      resetPage();
    }
  };

  useEffect(() => {
    resetPage()   
  }, [token])

  const handleBlur = async (todo) => {
    const id = todo._id;
    const newTitle = editedData[id]?.trim();

    setEditingId(null);

    if (!newTitle) {
      setErrors((prev) => ({
        ...prev,
        [id]: "❗ You must enter a value.",
      }));
      return;
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });

    if (newTitle !== todo.title) {
      await updateTodo({
        title: newTitle,
        completed: todo.completed,
        _id: id,
      });

      resetPage();
    }
  };

  const todoMap = () => {
    return todos.map((todo, index) => {
      const id = todo._id;
      const isEditing = editingId === id;
      const isEven = index % 2 === 0;

      return (
        <div
          key={id}
          className={`w-full max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center ${isEven ? 'bg-gradient-to-r from-purple-50 to-blue-50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} rounded-xl p-5 mb-5 border ${isEven ? 'border-purple-200' : 'border-blue-200'} hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
        >
          <div className="w-full flex-1 mb-3 sm:mb-0">
            {!isEditing && (
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full mr-2 ${isEven ? 'bg-purple-400' : 'bg-blue-400'}`}></div>
                <span className="text-xs font-semibold text-gray-500">TASK #{index + 1}</span>
              </div>
            )}
            
            <input
              readOnly={!isEditing}
              onClick={() => setEditingId(id)}
              onBlur={() => handleBlur(todo)}
              value={isEditing ? editedData[id] ?? todo.title : todo.title}
              onChange={(e) => {
                setEditedData((prev) => ({
                  ...prev,
                  [id]: e.target.value,
                }));
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors[id];
                  return newErrors;
                });
              }}
              className={`w-full text-base sm:text-lg font-medium px-4 py-3 rounded-lg border transition-all duration-200 ${
                isEditing
                  ? "bg-white border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-inner"
                  : "bg-opacity-50 border-transparent cursor-pointer"
              } "text-gray-700"`}
            />
      
            {errors[id] && (
              <p className="text-sm text-red-500 mt-1 font-medium bg-red-50 p-2 rounded-lg border border-red-100">{errors[id]}</p>
            )}
          </div>
      
          <button
            onClick={async () => await deleteTodo(id)}
            className="self-end sm:self-auto sm:ml-4 px-5 py-2.5 w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md"
          >
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
        Your Tasks
      </h2>
      {todos && todos.length > 0 ? todoMap() : (
        <div className="text-gray-500 text-center py-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100 shadow-md">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <p className="text-lg font-medium">Your task list is empty</p>
          <p className="text-sm text-gray-400 mt-1">Add a new task to get started</p>
        </div>
      )}
    </div>
  );
};

export default Todo;
