//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import Storage from "./storage/Storage";
import TasksTable from './tasks/TasksTable'
import WeekTable from './weekvisualizer/WeekTable'
import SchedulesTable from './matrixes/SchedulesTable'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [brush, setBrush] = useState({name: ""});
  const [isPainting, setIsPainting] = useState(false);

  const [isLoading, setLoading] = useState(true);
  
  
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [allSchedules, setAllSchedules] = useState([]);

  const addTask = (task) => {
    
    Storage.saveTask(task);

    setTasks([...tasks, task]);
  }

  const updateTask = (updatedTask) => {
    Storage.updateTask(updatedTask);

    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  }

  const deleteTask = (t) => {
    Storage.deleteTask(t);

    const updatedTasks = tasks.filter(task => task.id !== t.id);
    setTasks(updatedTasks);
  }

  const fetchMatrix = () => {
    let matrix = Storage.fetchMatrix();
    return matrix;
  }

  const fetchSchedules = () => {
    let schedules = Storage.fetchSchedules();
    return schedules;
  }

  const updateMatrix = (m) => {
    Storage.updateMatrix(m);
    setMatrix(fetchMatrix());
  }

  const updateSchedule = (sch) => {
    Storage.updateSchedule(sch);
  }

  const changeCurrentSchedule = (id) => {
    setCurrentSchedule(allSchedules.find(s => s.id == id));
  }

  useEffect(() => {
    if( Storage.init() ) {
      console.info("LocalStorage is working just fine.");

      // setTest Task

      let fetchedTasks = Storage.fetchAllTasks();

      if(Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
      } else {
        console.error("Error fetching tasks." + fetchedTasks);
      }

      let fetchedSchedules = Storage.fetchSchedules();

      let current = fetchedSchedules.find(elem => elem.id === 1);

      setAllSchedules(fetchedSchedules);
      setCurrentSchedule(current);


      setLoading(false);

    } else {
      console.error("LocalStorage is not working");
    }
   
  }, []);

  return (
  <div className="wrapper">
    <div className="AppContainer">
      <div className="Column1">
      {
          isLoading ? ("Loading") : (                <SchedulesTable allSchedules={allSchedules} currentScheduleId={currentSchedule.id} changeCurrentSchedule={changeCurrentSchedule}></SchedulesTable>)
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

export default App;

/*
  <div className="wrapper">
    <div className="AppContainer">
      <div className="Column1">
        <SchedulesTable allSchedules={allSchedules} currentScheduleId={currentSchedule.id}></SchedulesTable>
      </div>
      <div className="Column2">
      <WeekTable tasks={tasks} currentSchedule={currentSchedule} updateMatrix={updateMatrix} brush={brush} isPainting={isPainting} setIsPainting={setIsPainting
        }></WeekTable>
      </div>
      <div className="Column3">
        <TasksTable tasks={tasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask} brush={brush} setBrush={setBrush}  >

        </TasksTable>
      </div>
    </div>
  </div>
*/