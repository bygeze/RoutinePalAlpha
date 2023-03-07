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

  const updateMatrix = (m) => {
    Storage.updateMatrix(m);
    setMatrix(fetchMatrix());
  }

  useEffect(() => {
    if( Storage.init() ) {
      console.info("LocalStorage is working just fine.");

      // setTest Task
      Storage.saveTask({ name: "", duration: 0, repetition: 1, color: "#FAFAFA" })
      Storage.saveTask({ name: "default", duration: 0, repetition: 1, color: "#EAFB21" })

      let fetchedTasks = Storage.fetchAllTasks();
      let fetchedMatrix = fetchMatrix();

      //let fetchedSchedules = Storage.fetchSchedules();

      if(Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
      } else {
        console.error("Error fetching tasks." + fetchedTasks);
      }

      // if to detect load is correct needs to be developed
      setMatrix(fetchedMatrix);

      setAllSchedules(Storage.fetchSchedules());
    } else {
      console.error("LocalStorage is not working");
    }
   
  }, []);

  return (
  <div className="wrapper">
    <div className="AppContainer">
      <div className="Column1">
        <SchedulesTable allSchedules={allSchedules}></SchedulesTable>
      </div>
      <div className="Column2">
        <WeekTable tasks={tasks} matrix={matrix} updateMatrix={updateMatrix} brush={brush} isPainting={isPainting} setIsPainting={setIsPainting
        }></WeekTable>
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
