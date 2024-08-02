import React, { useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css';

const initialState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (task) => {
    if (editingTask) {
      dispatch({ type: 'EDIT_TASK', payload: { id: editingTask.id, updates: task } });
      setEditingTask(null);
    } else {
      const newTask = {
        id: uuidv4(), // Generate a unique ID
        ...task,
        completed: false // Initialize completed status
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
    }
  };

  const toggleComplete = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: { id } });
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: { id } });
    console.log(id)
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm
        onSubmit={addTask}
        tasks={state.tasks}
        taskToEdit={editingTask}
        onCancel={handleCancelEdit}
      />

      <TaskList
        tasks={state.tasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={editTask}
        setEditingTask={setEditingTask}
      />
    </div>
  );
};

export default App;
