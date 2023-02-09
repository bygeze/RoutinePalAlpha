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
            <td>
            <input
                type="text"
                placeholder="?"
                size="1"
                disabled="disabled"
                />
            </td>
            <td>
                <input
                type="text"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
                placeholder="Name"
                size="12"
                />
            </td>
            <td>
                <input
                type="color"
                value={task.color}
                onChange={(e) => setTask({ ...task, color: e.target.value })}
                size="12"
                />
            </td>
            <td colSpan="2"><button type="submit" onClick={handleSubmit}>Submit</button></td>
        </tr>
    );
}
        
    
export default AddTaskTableRow;