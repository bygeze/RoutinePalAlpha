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
          
        // checks if tasks array exists, if it doesn't, creates it.
        let tasks = localStorage.getItem('tasks');
        if (tasks === undefined) {
            localStorage.setItem('tasks', JSON.stringify([]));
        }

        // checks if  id counter exists, if it doesn't, creates it.
        let idGenerator = localStorage.getItem('idCounter');
        if (idGenerator === undefined) {
            localStorage.setItem("idCounter", 0);
        }

        // here should be
        // checks if matrix exists, if it doesn't, creates it.
        
        return true;
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

}

function generateId() {
    let id = parseInt(JSON.parse(localStorage.getItem('idCounter'))) + 1;
    localStorage.setItem("idCounter", id);
    return id;
}

export default Storage;