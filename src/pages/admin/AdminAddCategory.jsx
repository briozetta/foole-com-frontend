import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const AdminAddCategory = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      if (todoInput.trim() !== "") {
        const response = await axios.post("/todos", {
          categories: todoInput,
        });
        setTodos([...todos, response.data]);
        setTodoInput("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      const newTodos = todos.filter((todo) => todo._id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleEditMode = (index, value) => {
    if (editMode && editIndex === index) {
      setEditMode(false);
      setEditIndex(null);
      setEditValue("");
    } else {
      setEditIndex(index);
      setEditValue(value);
      setEditMode(true);
    }
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`/todos/${id}`, {
        categories: editValue,
      });
      const newTodos = [...todos];
      newTodos[editIndex].categories = editValue;
      setTodos(newTodos);
      setEditMode(false);
      setEditIndex(null);
      setEditValue("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if(loading){
    return <>
     <div className="flex justify-center h-screen items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-darker-blue h-12 w-12 mr-2"></div>
        <p className="text-darker-gray-medium font-semibold">Loading please wait...</p>
      </div>
    </>
  }
 
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md overflow-hidden rounded-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold sm:text-2xl text-darker-gray mb-4">
          Add your categories
        </h2>
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Add new category..."
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-darker-gray text-white px-9 py-2 ml-2 rounded-md hover:bg-darker-gray-medium focus:outline-none focus:bg-darker-gray-medium"
          >
            Add
          </button>
        </div>
        <ul className="overflow-y-auto max-h-80">
          {todos.map((todo, index) => (
            <li
              key={todo._id}
              className="flex justify-between items-center py-2 border-b padding-x border-gray-200"
            >
              {editMode && editIndex === index ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              ) : (
                <span className="text-darker-gray-medium font-semibold sm:text-lg">
                  {todo.categories}
                </span>
              )}
              <div className="sm:flex justify-center items-center gap-2">
                {editMode && editIndex === index ? (
                  <>
                    <button
                      onClick={() => saveEdit(todo._id)}
                      className="text-blue-500 flex items-center hover:text-blue-700 px-2 focus:outline-none"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => toggleEditMode(index, todo.categories)}
                      className="text-red-500 flex items-center hover:text-red-700 focus:outline-none"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => toggleEditMode(index, todo.categories)}
                    className="text-gray-500 flex items-center hover:text-gray-700 mr-2 focus:outline-none"
                  >
                    <FaEdit /> Edit
                  </button>
                )}
                {!editMode && (
                  <button
                    className="text-red-500 flex items-center hover:text-red-700 focus:outline-none"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    <MdDelete /> Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAddCategory;
