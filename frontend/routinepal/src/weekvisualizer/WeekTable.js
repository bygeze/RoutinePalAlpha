import React from 'react';

/*
 * This class is meant to display a week table
 *   - configurable: quantity of rows depend on the start time of the day, the end time of the day and the division choosed.
*/

const WeekTable = ({tasks, matrix, updateMatrix, brush, isPainting, setIsPainting}) => {
    const startTime = "08:00";
    const endTime = "02:00";
    const timeDivision = 30; // en minutos

    //const [matrix, setMatrix] = useState(createMatrix());
    const toggleBrush = (i, j) => {
        if(brush != null ) {
            if(brush !== "undefined") {
                if(brush.name != "") {
                    setIsPainting(!isPainting);
    
                    if(!isPainting) { 
                        console.log("handleChange");
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

    // change state (and later save the matrix to db)
    const handleDropChange = (event, rowIndex, colIndex) => {
        const newMatrix = matrix;

        newMatrix[rowIndex][colIndex] = parseInt(event.dataTransfer.getData("text/plain"));
        
        console.log(newMatrix);
        console.log(updateMatrix(newMatrix));
      };

    // change state (and later save the matrix to db)
    const handleItemChange = (id, rowIndex, colIndex) => {

        const newMatrix = matrix;

        newMatrix[rowIndex][colIndex] = id;
        
        updateMatrix(newMatrix)

      };
    
    // tasks are sended via props so we can access them to find the task that matches the id in the matrix
    // we use it when rendering to find name and color.
    const findTaskById = (id) => {
        return tasks.find(task => task.id == id);
    }

    /*const getRowTime = (i) => {
        return (startTime + (i / 2)) + " - " + (startTime + (i / 2) + timeDivision);
    }*/
    function getRowTime(index) {
        const startDate = new Date(`2022-02-07T${startTime}:00.000Z`);
        const endDate = new Date(`2022-02-08T${endTime}:00.000Z`);
        const timeDiff = (endDate - startDate) / 1000 / 60 / timeDivision;
      
        const currentDate = new Date(`2022-02-07T${startTime}:00.000Z`);
        currentDate.setMinutes(currentDate.getMinutes() + (index * timeDivision));
        if (currentDate > endDate) {
          const nextDate = new Date(`2022-02-08T00:00:00.000Z`);
          nextDate.setMinutes(nextDate.getMinutes() + ((index - timeDiff) * timeDivision));
          return `${startTime} - ${nextDate.toISOString().substr(11, 5)}`;
        }
        return `${currentDate.toISOString().substr(11, 5)} - ${(new Date(currentDate.setMinutes(currentDate.getMinutes() + timeDivision))).toISOString().substr(11, 5)}`;
      }


    // matrix is mapped into a table.
    // we use getrowtime to get the time to display in the first col of the
    // then we iterate throug the cols in the matrix selected row
    // we also handle a drop, cause task must be dragged to the view.

    return (
        <table className="WeekTable noselect">
            <tbody>
                <tr><td></td><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td><td>Saturday</td><td>Sunday</td></tr>
                {matrix.map((row, i) => (
                    <tr key={i}>
                        <td style={{width: "13%"}}>{getRowTime(i)}</td>
                    {row.map((col, j) => (
                        <td
                         key={j}                                 
                         onMouseDown={(e) => { toggleBrush(i, j);
                            if (!e) e = window.event;
                            e.cancelBubble = true;
                            if (e.stopPropagation) e.stopPropagation();
                        }}
                        onMouseOver={(e) => whenBrushHovers(i, j)}
                        onMouseUp={(e) => toggleBrush(i, j)}
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
    );
};

export default WeekTable;