import { useEffect, useState } from "react";
import MatrixTableRow from "./MatrixTableRow";

const SchedulesTable = ({allSchedules, currentScheduleId, changeCurrentSchedule}) => {
    return (
        <div>
            <h1>Schedules</h1>
            <h5>Your schedules</h5>
            {
                allSchedules.map(schedule => (
                <MatrixTableRow 
                key={schedule.id} 
                scheduleName={schedule.name} 
                scheduleId={schedule.id}
                currentScheduleId={currentScheduleId}
                changeCurrentSchedule={changeCurrentSchedule}
                ></MatrixTableRow>))
            }
        </div>
    );
}

export default SchedulesTable;