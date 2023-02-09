import React, { useState } from 'react';

/*
 * This class is meant to display a week table
 *   - configurable: quantity of rows depend on the start time of the day, the end time of the day and the division choosed.
*/

const WeekTable = (props) => {
    const startTime = 8;
    const endTime = 24;
    const timeDivision = 1;

    const [matrix, setMatrix] = useState(createMatrix());

    // this function is temporary, matrix creation should run on server side.
    function createMatrix() {
        const defaultValue = 43;
        const rows = (endTime - startTime) * timeDivision;
        const cols = 7;

        var matrix = [];
        

        for(let i = 0; i < rows; i++) {
            let row = Array(7).fill(defaultValue);
            matrix.push(row);
        }

        return matrix;
    }

    // change state (and later save the matrix to db)
    const handleDropChange = (event, rowIndex, colIndex) => {
        setMatrix(prevMatrix => {
          const newMatrix = [...prevMatrix];
          newMatrix[rowIndex][colIndex] = parseInt(event.dataTransfer.getData("text/plain"));
          return newMatrix;
        });
      };
    
    // tasks are sended via props so we can access them to find the task that matches the id in the matrix
    // we use it when rendering to find name and color.
    const findTaskById = (id) => {
        return props.tasks.find(task => task.id == id);
    }

    const getRowTime = (i) => {
        return (startTime + i) + " - " + (startTime + i + timeDivision);
    }

    // matrix is mapped into a table.
    // we use getrowtime to get the time to display in the first col of the
    // then we iterate throug the cols in the matrix selected row
    // we also handle a drop, cause task must be dragged to the view.

    return (
        <table>
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