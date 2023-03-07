import React, { useState, useEffect } from 'react';
import AddTaskTableRow from './AddTaskTableRow'
import TaskTableRow from './TaskTableRow'

const TasksTable = ({tasks, addTask, updateTask, deleteTask, brush, setBrush}) => {
    const [activeBrush, setActiveBrush] = useState(null);
    
    /*
    tasks.slice(1)
    esto es por que asi quito la primera tarea que siempre es la tarea por defecto.
    */ 
    return (
        <div>
            <h1>Tasks</h1>
            <h5>Add a new task</h5>
            <AddTaskTableRow addTask={addTask} />

                    <h5>Your tasks</h5>
                    
                    {tasks.slice(1).map(task => (
                        <TaskTableRow 
                            key={task.id} 
                            task={task} 
                            updateTask={updateTask} 
                            deleteTask={deleteTask} 
                            setBrush={setBrush} 
                            activeBrush={activeBrush}
                            setActiveBrush={setActiveBrush}/>
                    ))}

        </div>
    );
}

export default TasksTable;