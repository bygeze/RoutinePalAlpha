import React from 'react';

/*
 * This class is meant to display a week table
 *   - configurable: quantity of rows depend on the start time of the day, the end time of the day and the division choosed.
*/

const WeekTable = ({tasks, matrix, updateMatrix}) => {
    const startTime = "08:00";
    const endTime = "02:00";
    const timeDivision = 30; // en minutos

    //const [matrix, setMatrix] = useState(createMatrix());

    // change state (and later save the matrix to db)
    const handleDropChange = (event, rowIndex, colIndex) => {
        const newMatrix = matrix;

        newMatrix[rowIndex][colIndex] = parseInt(event.dataTransfer.getData("text/plain"));
        
        console.log(newMatrix);
        console.log(updateMatrix(newMatrix));
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
        <table className="WeekTable">
            <tbody>
                {matrix.map((row, i) => (
                    <tr key={i}>
                        <td>{getRowTime(i)}</td>
                    {row.map((col, j) => (
                        <td key={j}
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