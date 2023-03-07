import React from 'react';
import { useState, useEffect } from "react";

const TaskTableRow = (props) => {
    const [edit, setEdit] = useState(false);
    const [task, setTask] = useState(props.task);
  
    const handleEdit = () => {
      setEdit(!edit);
    };
  
    const handleSave = () => {
      setEdit(!edit);
      // aquí llamaríamos a la función que guarda la información en el storage o en la API
      props.updateTask(task);
    };

    const handleDelete = () => {
        props.deleteTask(task);
    }

    const toggleBrush = (id) => {
      // setBrush
      let brush = task;
      props.setBrush(brush);
    }
  
    return (
      <tr>
        <td>
          {edit ? (
            <input
              type="text"
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
            />
          ) : (
            task.name
          )}
        </td>
        <td>
          {edit ? (
            <input
              type="color"
              value={task.color}
              onChange={(e) => setTask({ ...task, color: e.target.value })}
            />
          ) : (
            task.color
          )}
        </td>
        <td>
            <button 
                draggable
                onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", task.id);
                }}
                onDragEnd={(e) => {
                console.log("Drag ended");
                }}
            >
                Drag
            </button>
        </td>
        <td>
          <button onClick={toggleBrush}>Brush</button>
        </td>
        <td>
          {edit ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </td>
        <td>
          <button onClick={handleDelete}>Delete</button>
        </td>


      </tr>
    );

}
    
export default TaskTableRow;