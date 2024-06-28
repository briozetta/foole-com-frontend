import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const TodoItem = ({ todo, index, editMode, editIndex, editValue, setEditValue, editImageBase64, setEditImageBase64, toggleEditMode, saveEdit, deleteTodo }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <li className="flex justify-between items-center py-2 border-b padding-x border-gray-200">
      {todo.image && (
        <img
          src={todo.image}
          alt="category"
          className="w-12 h-12 object-cover rounded-md"
        />
      )}
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
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => saveEdit(todo._id)}
              className="text-blue-500 flex items-center hover:text-blue-700 px-2 focus:outline-none"
            >
              Save
            </button>
            <button
              onClick={() => toggleEditMode(index, todo.categories, todo.image)}
              className="text-red-500 flex items-center hover:text-red-700 focus:outline-none"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => toggleEditMode(index, todo.categories, todo.image)}
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
  );
};

export default TodoItem;
