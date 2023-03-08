import { useEffect, useState } from "react";
import ScheduleTableRow from "./ScheduleTableRow";
import AddSchedule from "./AddSchedule";

const SchedulesTable = ({allSchedules, currentScheduleId, changeCurrentSchedule, createSchedule}) => {
    return (
        <div>
            <h1>Schedules</h1>
            <h5>Add a new schedule</h5>
            <AddSchedule createSchedule={createSchedule}></AddSchedule>
            <h5>Your schedules</h5>
            {
                allSchedules.map(schedule => (
                <ScheduleTableRow 
                key={schedule.id} 
                scheduleName={schedule.name} 
                scheduleId={schedule.id}
                currentScheduleId={currentScheduleId}
                changeCurrentSchedule={changeCurrentSchedule}
                ></ScheduleTableRow>))
            }
        </div>
    );
}

export default SchedulesTable;