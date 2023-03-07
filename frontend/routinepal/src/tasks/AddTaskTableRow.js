import React from 'react';
import { useState } from "react";

const AddTaskTableRow = ({addTask}) => {
    const [task, setTask] = useState({ name: "", duration: 0, repetition: 1, color: "#000000" });

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        setTask({ name: "", duration: 0, repetition: 1, color: "#000000" });
      };
    
    return (
            <div className="input-group mb-3">
                <input
                    className="form-control"
                    type="text"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                    placeholder="Name"
                    />
                <input
                    className="form-control taskColorInput"
                    type="color"
                    value={task.color}
                    onChange={(e) => setTask({ ...task, color: e.target.value })}
                />
                <button className="form-control btn btn-primary submitTaskButton" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
    );
}
        
    
export default AddTaskTableRow;

/*
            <td colSpan="3"> 

            </td>
            <td>
                <input
                type="color"
                value={task.color}
                onChange={(e) => setTask({ ...task, color: e.target.value })}
                size="12"
                />
            </td>

*/