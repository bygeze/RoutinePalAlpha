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

    const toggleBrush = () => {
      //if(task.id == props.activeBrush) {
        //props.setActiveBrush(null);
        //props.setBrush(null); 
      //} else {
        props.setBrush(task);
        props.setActiveBrush(task.id);
      //}
    }

    const getBrushButtonClass = (id) => {
      if (props.activeBrush == id) {
        return 'btn btn-outline-success';
      } else {
        return 'btn btn-outline-danger';
      }
    }
  
    return (
      <div>
        <div className="input-group mb-3" /*style={{width: '100%'}}*/>
            {edit ? (
                <input 
                style={{width: '28%', textAlign: "left"}}
                  type="text"
                  value={task.name}
                  onChange={(e) => setTask({ ...task, name: e.target.value })}
                  className="form-control"
                />
              ) : (
                <span style={{width: '28%'}} className="input-group-text" id="basic-addon1">{task.name}</span>
              )}
              {edit ? (
                <input
                  type="color"
                  className="form-control taskColorInput  "
                  value={task.color}
                  onChange={(e) => setTask({ ...task, color: e.target.value })}
                />
              ) : (
                <input
                type="color"
                className="form-control taskColorInput  "
                value={task.color}
                disabled
                ></input>
              )}

            <button
                className="btn btn-outline-secondary deleteTaskButton"
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
            <button className={getBrushButtonClass(task.id)} onClick={toggleBrush}>Brush</button>
            {edit ? (
              <button className="btn btn-success " onClick={handleSave}>Save</button>
            ) : (
              <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
            )}
            
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    );

}
    
export default TaskTableRow;

/*


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

      */