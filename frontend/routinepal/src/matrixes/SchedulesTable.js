import { useEffect, useState } from "react";
import MatrixTableRow from "./MatrixTableRow";

const SchedulesTable = ({allSchedules}) => {
    return (
        <div>
            <h1>Schedules</h1>
            <h5>Your schedules</h5>
            {
                allSchedules.map(schedule => (<MatrixTableRow key={schedule.id} scheduleName={schedule.name}></MatrixTableRow>))
            }
        </div>
    );
}

export default SchedulesTable;