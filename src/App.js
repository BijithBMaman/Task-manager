import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (task) => {
    const updatedTasks = tasks.map((t, index) =>
      index === editingIndex ? task : t
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const handleEditTask = (index) => {
    setTaskToEdit(tasks[index]);
    setEditingIndex(index);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm
        addTask={addTask}
        editTask={editTask}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
      />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={handleEditTask} />
    </div>
  );
};

export default App;
