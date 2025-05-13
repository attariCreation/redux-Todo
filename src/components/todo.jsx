import { removeTodo as removeTodoApi, updateTodo } from "../api/todoApi";
import { useState } from "react";

const Todo = ({ todos, resetPage }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [errors, setErrors] = useState({}); // ✅ error state

  const deleteTodo = async (id) => {
    const response = await removeTodoApi(id);
    if (!response) {
      console.log("❌ Error with the response");
    } else {
      resetPage();
    }
  };

  const handleBlur = async (todo) => {
    const id = todo._id;
    const newTitle = editedData[id]?.trim();

    setEditingId(null);

    // ✅ Check if empty
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
    return todos.map((todo) => {
      const id = todo._id;
      const isEditing = editingId === id;

      return (
        <div className="todo-item" key={id} style={{ marginBottom: "1rem" }}>
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
                delete newErrors[id]; // Clear error on typing
                return newErrors;
              });
            }}
            className="todo-title"
          />
          {errors[id] && (
            <div style={{ color: "red", fontSize: "0.85rem", marginTop: "4px" }}>
              {errors[id]}
            </div>
          )}
          <button
            className="delete-btn"
            onClick={async () => {
              await deleteTodo(id);
            }}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <div className="todo-list">
      <h2 style={{ textAlign: "center", marginBottom: 12 }}>
        Todos list here!
      </h2>
      {todos && todos.length > 0 ? todoMap() : <div>Sorry, no todos found.</div>}
    </div>
  );
};

export default Todo;
