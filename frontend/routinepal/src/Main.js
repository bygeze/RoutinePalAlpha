//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import {
  useNavigate,
    } from "react-router-dom";
import Storage from "./storage/Storage";
import ScheduleView from "./views/ScheduleView"
import 'bootstrap/dist/css/bootstrap.min.css';

function Main(props) {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
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

  const fetchSchedules = () => {
    let schedules = Storage.fetchSchedules();
    return schedules;
  }

  const updateSchedule = (sch) => {
    Storage.updateSchedule(sch);
    setCurrentSchedule(sch);
  }

  const createSchedule = (startTime, endTime, interval, name) => {
    Storage.createSchedule(startTime, endTime, interval, name);
    setAllSchedules(Storage.fetchSchedules());
  }

  const changeCurrentSchedule = (id) => {
    setAllSchedules(Storage.fetchSchedules());
    setCurrentSchedule(allSchedules.find(s => s.id == id));
    
  }

  useEffect(() => {
    // checks log in
    if(!props.isLoggedIn) {
      navigate("/login")
    }

    console.log(props.isLoggedIn);
    if( Storage.init() ) {
      console.info("LocalStorage is working just fine.");

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
      {props.isLoggedIn ? (
          <ScheduleView
          isLoading={isLoading}
          createSchedule={createSchedule}
          allSchedules={allSchedules}
          currentSchedule={currentSchedule}
          changeCurrentSchedule={changeCurrentSchedule}
          tasks={tasks}
          updateSchedule={updateSchedule}
          brush={brush}
          isPainting={isPainting}
          setIsPainting={setIsPainting}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          setBrush={setBrush}
          ></ScheduleView>
      ) : (
        
        <button onClick={() => window.location.href='/login'}>Login Main</button>
      )}
    </div>
  );
}

export default Main;

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