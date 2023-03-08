import React, {useState} from 'react';

/*
 * This class is meant to display a week table
 *   - configurable: quantity of rows depend on the start time of the day, the end time of the day and the division choosed.
*/

const WeekTable = ({tasks, currentSchedule, updateSchedule, brush, isPainting, setIsPainting}) => {
    const [brushType, setBrushType] = useState(true);
    
    const toggleBrush = (clickType, i, j) => {
        if(clickType == 0) {
            setBrushType(true);
        } else if (clickType == 2) {
            setBrushType(false);
        }

        if(brush != null ) {
            if(brush !== "undefined") {
                if(brush.name != "") {
                    setIsPainting(!isPainting);
                    
                    if(!isPainting) { 
                        handleItemChange(brush.id, i, j) }
            
                    console.log(!isPainting + " - " + brush.id + " - " + i + " - " + j);
    
    
                } else {
                    console.log("No brush selected");
                }
            } else {
                console.log("No brush selected");
            }
        } else {
            console.log("No brush selected");
        }
    }

    const whenBrushHovers = (i, j) => {
        if(isPainting) {
            handleItemChange(brush.id, i, j);
        }
    }

    function changeMatrixCell (val, rowIndex, colIndex) {
        const newSchedule = {
            ...currentSchedule,
            matrix: [
              ...currentSchedule.matrix.slice(0, rowIndex),
              [
                ...currentSchedule.matrix[rowIndex].slice(0, colIndex),
                parseInt(val),
                ...currentSchedule.matrix[rowIndex].slice(colIndex + 1)
              ],
              ...currentSchedule.matrix.slice(rowIndex + 1)
            ]
          };
        
          return newSchedule;
    }
    
    // change state (and later save the matrix to db)
    const handleDropChange = (event, rowIndex, colIndex) => {
        let sch = changeMatrixCell(parseInt(event.dataTransfer.getData("text/plain")), rowIndex, colIndex);
        updateSchedule(sch);
      };

    // change state (and later save the matrix to db)
    const handleItemChange = (id, rowIndex, colIndex) => {
        if(!brushType) {
            id = 1;
        }
        updateSchedule(changeMatrixCell(id, rowIndex, colIndex));
      };
    
    // tasks are sended via props so we can access them to find the task that matches the id in the matrix
    // we use it when rendering to find name and color.
    const findTaskById = (id) => {
        return tasks.find(task => task.id == id);
    }

    function getRowTime(index) {
        const start_time = currentSchedule.startTime;
        const interval = currentSchedule.interval;
      
        // Convertimos la hora de inicio a un objeto de tipo Date
        const [start_hour, start_min] = start_time.split(":").map(Number);
        const start = new Date();
        start.setHours(start_hour);
        start.setMinutes(start_min);
      
        // Calculamos la hora de fin
        const delta_min = interval * index;
        const end_index = index + 1;
        const delta_min_end = interval * end_index;
        const end = new Date(start.getTime() + delta_min_end * 60000);
      
        // Sumamos la cantidad de minutos al objeto Date que representa la hora de inicio
        start.setTime(start.getTime() + delta_min * 60000);
      
        // Formateamos las horas a string
        const start_formatted = `${start.getHours().toString().padStart(2, "0")}:${start.getMinutes().toString().padStart(2, "0")}`;
        const end_formatted = `${end.getHours().toString().padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")}`;
      
        return `${start_formatted} - ${end_formatted}`;
      }


    // matrix is mapped into a table.
    // we use getrowtime to get the time to display in the first col of the
    // then we iterate throug the cols in the matrix selected row
    // we also handle a drop, cause task must be dragged to the view.

    return (
        <div className="WeekTableWrapper">
        <table className="WeekTableTimesColumn">
            <thead>
            <tr><td><p></p></td></tr>
            </thead>

            <tbody>
            {currentSchedule.matrix.map((row, i) => (
                <tr key={i}>
                    <td key={i}>{getRowTime(i)}</td>
                </tr>
            )) }
            </tbody>

        </table>

        <table className="WeekTable noselect">
            <thead>
                <tr><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td><td>Saturday</td><td>Sunday</td></tr>
            </thead>
            <tbody>        
                {currentSchedule.matrix.map((row, i) => (
                    <tr key={i}>
                    {row.map((col, j) => (
                        <td
                         key={j}
                         onContextMenu={(e) => e.preventDefault()}                             
                         onMouseDown={(e) => { 
                            e.preventDefault();
                            toggleBrush(e.button, i, j);
                            if (!e) e = window.event;
                            e.cancelBubble = true;
                            if (e.stopPropagation) e.stopPropagation();
                        }}
                        onMouseOver={(e) => whenBrushHovers(i, j)}
                        onMouseUp={(e) => toggleBrush(e.button, i, j)}
                        style={{ backgroundColor: col === 0 ? 'gray' : findTaskById(col)?.color }} >
                            <div
                                onDrop={(e) => {
                                    handleDropChange(e, i, j);
                                }}
                                onDragOver={(e) => e.preventDefault()}

                            >
                            {findTaskById(col)?.name}
                            </div>
                        </td>
                    ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default WeekTable;
