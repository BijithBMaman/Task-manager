import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask, taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit !== null) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      if (taskToEdit !== null) {
        editTask({ title, description });
        setTaskToEdit(null);
      } else {
        addTask({ title, description });
      }
      setTitle('');
      setDescription('');
    }
  };

  const handleCancel = () => {
    setTaskToEdit(null);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{taskToEdit !== null ? 'Update Task' : 'Add Task'}</button>
        {taskToEdit !== null && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>
    </div>
  );
};

export default TaskForm;
