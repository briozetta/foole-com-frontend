import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from '../../components/helpers/admin/TodoForm';
import TodoList from '../../components/helpers/admin/TodoList';
import { toast } from 'react-toastify';


const AdminAddCategory = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [todoImageBase64, setTodoImageBase64] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editImageBase64, setEditImageBase64] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      if (todoInput.trim() !== "") {
        const response = await axios.post("/todos", {
          categories: todoInput,
          image: todoImageBase64,
        });
        setTodos([...todos, response.data]);
        setTodoInput("");
        setTodoImageBase64("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
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

  const toggleEditMode = (index, value, image) => {
    if (editMode && editIndex === index) {
      setEditMode(false);
      setEditIndex(null);
      setEditValue("");
      setEditImageBase64("");
    } else {
      setEditIndex(index);
      setEditValue(value);
      setEditImageBase64(image);
      setEditMode(true);
    }
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`/todos/${id}`, {
        categories: editValue,
        image: editImageBase64,
      });
      const newTodos = [...todos];
      newTodos[editIndex].categories = editValue;
      newTodos[editIndex].image = editImageBase64;
      setTodos(newTodos);
      setEditMode(false);
      setEditIndex(null);
      setEditValue("");
      setEditImageBase64("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error updating todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-darker-blue h-12 w-12 mr-2"></div>
        <p className="text-darker-gray-medium font-semibold">Loading please wait...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md overflow-hidden rounded-md">
      <TodoForm
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        todoImageBase64={todoImageBase64}
        setTodoImageBase64={setTodoImageBase64}
        addTodo={addTodo}
      />
      <TodoList
        todos={todos}
        editMode={editMode}
        editIndex={editIndex}
        editValue={editValue}
        setEditValue={setEditValue}
        editImageBase64={editImageBase64}
        setEditImageBase64={setEditImageBase64}
        toggleEditMode={toggleEditMode}
        saveEdit={saveEdit}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default AdminAddCategory;
