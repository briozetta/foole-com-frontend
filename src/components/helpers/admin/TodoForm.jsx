import React, { useRef } from 'react';

const TodoForm = ({ todoInput, setTodoInput, todoImageBase64, setTodoImageBase64, addTodo }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTodoImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold sm:text-2xl text-darker-gray mb-4">
        Add your categories
      </h2>
      {todoImageBase64 && (
        <div className="mb-4">
          <img
            src={todoImageBase64}
            alt="Selected category"
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>
      )}
      <div className="mb-4 flex flex-col sm:flex-row items-center">
        <input
          type="text"
          placeholder="Add new category..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-2 sm:mb-0"
        />
        <div className="relative w-full mb-2 sm:mb-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 z-10 cursor-pointer"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full focus:outline-none">
            Choose File
          </button>
        </div>
        <button
          onClick={addTodo}
          className="bg-darker-gray text-white px-9 py-2 ml-2 rounded-md hover:bg-darker-gray-medium focus:outline-none focus:bg-darker-gray-medium"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
