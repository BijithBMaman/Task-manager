import React, { useState } from 'react';
import { isTitleUnique, isValidDueDate } from './TaskUtils';

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit, setEditingTask }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
    <div className="task-list">
        {filteredTasks.map(task => (
            <div key={task.id} style={taskStyle(task.completed)}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <button onClick={() => onToggleComplete(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => setEditingTask(task)}>Edit</button>
              <button onClick={() => onDelete(task.id)}>Delete</button>
              
            </div>
          ))} 
      
    </div>
    </div>
  );
};

const taskStyle = (completed) => ({
    textDecoration: completed ? 'line-through' : 'none',
    backgroundColor: completed ? '#d3ffd3' : 'white',
  });

export default TaskList;
