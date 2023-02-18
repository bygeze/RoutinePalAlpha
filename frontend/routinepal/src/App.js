//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import Storage from "./storage/Storage";
import TasksTable from './tasks/TasksTable'
import WeekTable from './weekvisualizer/WeekTable'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [matrix, setMatrix] = useState([]);

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
      let fetchedTasks = Storage.fetchAllTasks();
      let fetchedMatrix = fetchMatrix();

      if(Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
      } else {
        console.error("Error fetching tasks." + fetchedTasks);
      }

      // if to detect load is correct needs to be developed
      setMatrix(fetchedMatrix);
    } else {
      console.error("LocalStorage is not working");
    }
   
  }, []);

  return (
  <div className="wrapper">
    <div className="AppContainer">
      <div className="Column1">
        
      </div>
      <div className="Column2">
        <WeekTable tasks={tasks} matrix={matrix} updateMatrix={updateMatrix}></WeekTable>
      </div>
      <div className="Column3">
        <TasksTable tasks={tasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask}>

        </TasksTable>
      </div>
    </div>
  </div>


  );
}

export default App;
