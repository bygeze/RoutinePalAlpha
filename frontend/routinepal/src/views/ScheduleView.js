import React from 'react';
import TasksTable from '.././tasks/TasksTable'
import WeekTable from '.././weekvisualizer/WeekTable'
import SchedulesTable from '.././matrixes/SchedulesTable'


const ScheduleView = ({isLoading, createSchedule, allSchedules, currentSchedule, changeCurrentSchedule, tasks, updateSchedule, brush, isPainting, setIsPainting, addTask, updateTask, deleteTask, setBrush}) => {
    
    
    return (
    
        <div className="wrapper">
          <div className="AppContainer">
            <div className="Column1">
            {
                isLoading ? ("Loading") : (                
                <SchedulesTable 
                  allSchedules={allSchedules} 
                  currentScheduleId={currentSchedule.id} 
                  changeCurrentSchedule={changeCurrentSchedule}
                  createSchedule={createSchedule}>
                    
                  </SchedulesTable>)
              }
      
            </div>
            <div className="Column2">
                
            {
                isLoading ? ("Loading") : (        <WeekTable tasks={tasks} currentSchedule={currentSchedule} updateSchedule={updateSchedule} brush={brush} isPainting={isPainting} setIsPainting={setIsPainting
                }></WeekTable>)
            }
      
            </div>
            <div className="Column3">
              <TasksTable tasks={tasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask} brush={brush} setBrush={setBrush}  >
      
              </TasksTable>
            </div>
          </div>
        </div>
      
      
        );
}

export default ScheduleView;