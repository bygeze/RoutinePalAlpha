import React, { useEffect } from 'react';
import AddTaskTableRow from './AddTaskTableRow'
import TaskTableRow from './TaskTableRow'

const TasksTable = ({tasks, addTask, updateTask, deleteTask, brush, setBrush}) => {

    return (
        <div>
            <h1>Tasklist</h1>
            <table className="TaskTable">

                <h5>Add a new task:</h5>
                <tbody>
                    <AddTaskTableRow addTask={addTask} />
                    <br />
                    Brush: {brush.name}
                    <br />
                    <h5>Your tasks:</h5>
                    {tasks.map(task => (
                        <TaskTableRow key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} setBrush={setBrush}/>
                        
                    ))}
                </tbody> 
            </table>
        </div>

    );

}

export default TasksTable;