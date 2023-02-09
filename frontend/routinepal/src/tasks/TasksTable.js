import React, { useEffect } from 'react';
import AddTaskTableRow from './AddTaskTableRow'
import TaskTableRow from './TaskTableRow'

const TasksTable = ({tasks, addTask, updateTask, deleteTask}) => {

    return (
        <table>
            <thead>
                <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Color</th>
                <th colSpan="2">Opciones</th>
                </tr>
            </thead>
            <tbody>
                <AddTaskTableRow addTask={addTask} />
                {tasks.map(task => (
                    <TaskTableRow key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
                    
                ))}
            </tbody>
            
        </table>
    );

}

export default TasksTable;