import React, {useState, useEffect} from "react";

const timeIntervals = {
    15: 900000, // 15 minutes in milliseconds
    30: 1800000, // 30 minutes in milliseconds
    60: 3600000, // 60 minutes in milliseconds
  };
  
  function getHoursArray(interval) {
    const hours = [];
    const maxHours = 23;
    const intervalInMinutes = Number(interval);
  
    for (let i = 0; i <= maxHours; i++) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      for (let j = 0; j < 60; j += intervalInMinutes) {
        const minute = j < 10 ? `0${j}` : `${j}`;
        hours.push(`${hour}:${minute}`);
      }
    }
  
    return hours;
  }

const AddSchedule = ({createSchedule}) => {
    const [startHour, setStartHour] = useState("");
    const [endHour, setEndHour] = useState("");
    const [interval, setInterval] = useState("30");
    const [name, setName] = useState("");
    const [hours, setHours] = useState([]);
  
    useEffect(() => {
        setHours(getHoursArray(interval));
      }, [interval]);

    const handleIntervalChange = (event) => {
      setInterval(event.target.value);
    };
  
    const handleStartHourChange = (event) => {
      setStartHour(event.target.value);
    };
  
    const handleEndHourChange = (event) => {
      setEndHour(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
      };

    const handleSubmit = () => {
        createSchedule(startHour, endHour, interval, name);
    }

    return (
        <div>
            <div
                className="input-group mb-3">

                <input 
                    className="form-control"
                    value={name}
                    type="text"
                    onChange={handleNameChange}
                    placeholder="Schedule name"
                ></input>
            </div>
            <div
                className="input-group mb-3">

                <span className="input-group-text" id="basic-addon1">Select a time interval:</span>
                <select className="form-control" value={interval} onChange={handleIntervalChange}>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                </select>
            </div>

            <div
                className="input-group mb-3">

                <span className="input-group-text" id="basic-addon1">Starts at:</span>
                <select className="form-control" value={startHour} onChange={handleStartHourChange}>
                {hours.map((hour) => (
                    <option key={hour} value={hour}>
                    {hour}
                    </option>
                ))}
                </select>

                <span className="input-group-text" id="basic-addon1">Ends at:</span>
                <select className="form-control" value={endHour} onChange={handleEndHourChange}>
                    {hours.map((hour) => (
                        <option key={hour} value={hour}>
                        {hour}
                        </option>
                    ))}
                </select>
            </div>
            <div
                className="input-group mb-3">
                <button 
                onClick={handleSubmit}
                className="btn btn-primary">Submit schedule</button>
            </div>
        </div>

    );
}

export default AddSchedule;