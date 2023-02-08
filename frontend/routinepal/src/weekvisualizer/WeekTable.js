import React, { useState } from 'react';

const WeekTable = ({ tasks }) => {
    const startTime = 8;
    const endTime = 24;
    const timeDivision = 1;

    const [matrix, setMatrix] = useState(createMatrix());

    function createMatrix() {
        const defaultValue = 0;
        const rows = (endTime - startTime) * timeDivision;
        const cols = 7;

        var matrix = [];
        

        for(let i = 0; i < rows; i++) {
            let row = Array(7).fill(defaultValue);
            matrix.push(row);
        }



        return matrix;
    }

  function handleInputChange(event, rowIndex, colIndex) {
    // En este método, puedes actualizar el estado del input y cambiar el background-color
    // de acuerdo al id de la tarea correspondiente
    setMatrix(prevMatrix => {
        const newMatrix = [...prevMatrix];
        newMatrix[rowIndex][colIndex] = parseInt(event.target.value);

        return newMatrix;
        
      });
  }

  return (
    <table>
      {matrix.map((row, i) => (
        <tr key={i}>
          {row.map((col, j) => (
            <td key={j}>
              <input
                type="number"
                value={col}
                onChange={event => handleInputChange(event, i, j)}
                onDrop={(e) => {
                    const taskId = e.dataTransfer.getData("text/plain");
                    e.target.value = taskId;
                    console.log(`Task id: ${taskId} dropped`);
                    handleInputChange(e, i, j);
                  }}
                onDragOver={(e) => e.preventDefault()}
                style={{ backgroundColor: col === 0 ? 'gray' : tasks.find(task => task.id === col)?.color }}
              />
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default WeekTable;