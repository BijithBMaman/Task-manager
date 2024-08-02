import React from 'react';

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className="task-item" onClick={() => editTask(index)}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button className="delete-button" onClick={(e) => {
            e.stopPropagation();
            deleteTask(index);
          }}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
