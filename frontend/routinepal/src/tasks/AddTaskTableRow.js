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
        <tr>
            <td colSpan="5">
            <div class="input-group mb-3">
                <input
                    class="form-control"
                    type="text"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                    placeholder="Name"
                    />
                <input
                    class="form-control taskColorInput"
                    type="color"
                    value={task.color}
                    onChange={(e) => setTask({ ...task, color: e.target.value })}
                />
                <button class="form-control btn btn-primary submitTaskButton "type="submit" onClick={handleSubmit}>Submit</button>
            </div>

            </td>
        </tr>
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