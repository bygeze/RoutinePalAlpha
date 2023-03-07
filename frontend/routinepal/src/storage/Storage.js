/* 
 * Esta función contiene la lógica para utilizar localStorage
 * para guardar los datos de la aplicación.
 */

class Storage {
    static init = () => {
        const FLAG_TEST_RESET = true;

        // checks if localStorage is available
        if (typeof localStorage === 'undefined' || localStorage === null) {
            return false;
        }

        // gets tasks
        if(!FLAG_TEST_RESET) {
            localStorage.setItem('tasks', JSON.stringify([{ id: 1, name: "empty", duration: 0, repetition: 1, color: "#FAFAFA" }, { id: 0, name: "default", duration: 0, repetition: 1, color: "#EAFB21" }]));
        } else {
            let tasks = localStorage.getItem('tasks');
            if (tasks === undefined || tasks === "undefined" || tasks === null)  {
                // checks if tasks array exists, if it doesn't, creates it.
                localStorage.setItem('tasks', JSON.stringify([]));                  
            }
        }

        // get task id counter
        if(!FLAG_TEST_RESET) {
            localStorage.setItem("taskIdCounter", 1);
        } else {
            let taskIdCounter = localStorage.getItem('taskIdCounter');
            if (taskIdCounter === undefined || taskIdCounter === "undefined" || taskIdCounter === null) {
                // checks if  id counter exists, if it doesn't, creates it.
                localStorage.setItem("taskIdCounter", 1);
            }
        }

        // get schedule id counter
        if(FLAG_TEST_RESET) {
            localStorage.setItem("scheduleIdCounter", 0);
        } else {
            let scheduleIdCounter = localStorage.getItem('scheduleIdCounter');
            if (scheduleIdCounter === undefined || scheduleIdCounter === "undefined" || scheduleIdCounter === null) {
                // checks if  id counter exists, if it doesn't, creates it.
                localStorage.setItem("scheduleIdCounter", 0);
            }
        }

        // here should be
        // checks if matrix exists, if it doesn't, creates it.
        if(!FLAG_TEST_RESET) {
            localStorage.setItem("schedules", JSON.stringify([this.createSchedule(), this.createSchedule()]));
        } else {
            let schedules = localStorage.getItem('schedules');
            if (schedules === undefined || schedules === "undefined" || schedules === null) {
                // checks if  id counter exists, if it doesn't, creates it.
                localStorage.setItem("schedules", JSON.stringify([this.createSchedule(), this.createSchedule()]));
            }

        }

        
        return true;
    }

    static createSchedule = () => {
        var schedule = {};

        const startTime = 8;
        const endTime = 24;
        const timeDivision = 0.5;

        const defaultValue = 1;
        const rows = (endTime - startTime) / (timeDivision);
        const cols = 7;

        var matrix = [];

        for(let i = 0; i < rows; i++) {
            let row = Array(cols).fill(defaultValue);
            matrix.push(row);
        }

        schedule.name = "default";
        schedule.matrix = matrix;
        schedule.id = parseInt(generateScheduleId());

        return schedule; 
    }

    // (C) save tasks method  
    static saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        task.id = generateTaskId();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // (R) fetch all tasks method
    static fetchAllTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        return tasks;
      }

    // (U) update tasks method  
    static updateTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            tasks[index] = task;
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // (D) delete task method
    static deleteTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        //let index = tasks.findIndex(t => t.id === task.id);
        tasks = tasks.filter(t => t.id !== task.id)
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // MATRIX CRUD´
    // (C) 
    static fetchMatrix() {
        let matrix = JSON.parse(localStorage.getItem("matrix"));

        return matrix;
    }

    static updateMatrix(m) {
        localStorage.setItem("matrix", JSON.stringify(m));
    }

    static updateSchedule(sch) {
        let schedules = JSON.parse(localStorage.getItem("schedules"));
        let index = schedules.findIndex(s => s.id === sch.id);

        if(index !== -1) {
            schedules[index] = sch;
        }

        localStorage.setItem("schedules", JSON.stringify(schedules));
    }

    static fetchSchedules() {
        let schedules = JSON.parse(localStorage.getItem("schedules"));

        return schedules;
    }

}

function generateTaskId() {
    let id = parseInt(JSON.parse(localStorage.getItem('taskIdCounter'))) + 1;
    localStorage.setItem("taskIdCounter", id);
    return id;
}


function generateScheduleId() {
    let id = parseInt(JSON.parse(localStorage.getItem('scheduleIdCounter'))) + 1;
    localStorage.setItem("scheduleIdCounter", id);
    return id;
}

export default Storage;