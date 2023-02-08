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
                />
            </td>
            <td>
                <input
                type="text"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
                placeholder="Name"
                />
            </td>
            <td>
                <input
                type="number"
                value={task.duration}
                onChange={(e) => setTask({ ...task, duration: e.target.value })}
                placeholder="Duration"
                />
            </td>
            <td>
                <input
                type="number"
                value={task.repetition}     
                onChange={(e) => setTask({ ...task, repetition: e.target.value })}
                placeholder="Repetition"
                />
            </td>
            <td>
                <input
                type="color"
                value={task.color}
                onChange={(e) => setTask({ ...task, color: e.target.value })}
                />
            </td>
            <td colSpan="2"><button type="submit" onClick={handleSubmit}>Submit</button></td>
        </tr>
    );
}
        
    
export default AddTaskTableRow;