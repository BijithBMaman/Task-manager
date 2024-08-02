import React, { useState, useEffect } from 'react';
import {  isValidDueDate } from './TaskUtils';

const TaskForm = ({ addTask, editTask, taskToEdit, setTaskToEdit, onSubmit, onCancel, tasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
  });
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (taskToEdit) {
        setTask(taskToEdit);
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
    if (!isTitleUnique(task.title, tasks, taskToEdit?.id)) {
        alert('Task title must be unique');
        return;
      }
      if (!isValidDueDate(task.dueDate)) {
        alert('Due date must be today or in the future');
        return;
      }
      onSubmit(task);
      setTask({ title: '', description: '', dueDate: '', priority: 'Low' });
  };


  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
        {taskToEdit && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
};

  
const isTitleUnique = (title, tasks, taskId) => {
    return !tasks.some(task => task.title === title && task.id !== taskId);
  };
export default TaskForm;
