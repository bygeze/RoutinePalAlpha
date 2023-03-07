import { useEffect, useState } from "react";

const MatrixTableRow = ({scheduleName, scheduleId, currentScheduleId, changeCurrentSchedule}) => {
    return (
        <div>
            <div className="input-group mb-3">
                <input
                    className="form-control input-group-text"
                    type="text"
                    placeholder={scheduleName}
                    />
                {
                    scheduleId == currentScheduleId ? (
                        <button className="form-control btn btn-success submitTaskButton" type="submit" >Selected</button>
                    ) : (
                        <button 
                        className="form-control btn btn-primary submitTaskButton" 

                        onClick={changeCurrentSchedule.bind(this, scheduleId)}
                        type="submit" >Select</button>
                    )
                }
            </div>       
        </div>
    );
}

export default MatrixTableRow;