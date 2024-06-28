import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, editMode, editIndex, editValue, setEditValue, editImageBase64, setEditImageBase64, toggleEditMode, saveEdit, deleteTodo }) => {
  return (
    <ul className="overflow-y-auto max-h-80">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          index={index}
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
      ))}
    </ul>
  );
};

export default TodoList;
