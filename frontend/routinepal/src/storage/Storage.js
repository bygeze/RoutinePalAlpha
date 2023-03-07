/* 
 * Esta función contiene la lógica para utilizar localStorage
 * para guardar los datos de la aplicación.
 */

class Storage {
    static init = () => {
        // checks if localStorage is available
        if (typeof localStorage === 'undefined' || localStorage === null) {
            return false;
        }
          
        let tasks = localStorage.getItem('tasks');
        
        //if (tasks === undefined || tasks === "undefined" || tasks === null)  {
            // checks if tasks array exists, if it doesn't, creates it.


            localStorage.setItem('tasks', JSON.stringify([]));
                       
        //}

        let idGenerator = localStorage.getItem('idCounter');

        //if (idGenerator === undefined || idGenerator === "undefined" || idGenerator === null) {

            // checks if  id counter exists, if it doesn't, creates it.

            localStorage.setItem("idCounter", 0);
        //}

        let matrixStorage = localStorage.getItem("matrix");
;
        //if(matrixStorage === undefined || matrixStorage === "undefined" || matrixStorage === null) {
            localStorage.setItem("matrix", JSON.stringify(this.createMatrix()));
        //}
            // this function is temporary, matrix creation should run on server side.

        // here should be
        // checks if matrix exists, if it doesn't, creates it.

        localStorage.setItem("schedules", JSON.stringify([this.createSchedule()]));

        //localStorage.setItem("schedules", JSON.stringify(schedules));
        
        return true;
    }

    static createMatrix = () => {
        const startTime = 8;
        const endTime = 24;
        const timeDivision = 0.5;

        const defaultValue = 1;
        const rows = (endTime - startTime) / (timeDivision);
        const cols = 7;

        var matrix = [];

        for(let i = 0; i < rows; i++) {
            let row = Array(7).fill(defaultValue);
            matrix.push(row);
        }

        return matrix;
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
        schedule.id = 0;

        return schedule; 
    }

    // (C) save tasks method  
    static saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        task.id = generateId();
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

    static fetchSchedules() {
        let schedules = JSON.parse(localStorage.getItem("schedules"));

        return schedules;
    }

}

function generateId() {
    let id = parseInt(JSON.parse(localStorage.getItem('idCounter'))) + 1;
    localStorage.setItem("idCounter", id);
    return id;
}


export default Storage;