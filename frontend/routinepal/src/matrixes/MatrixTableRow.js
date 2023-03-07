import { useEffect, useState } from "react";

const MatrixTableRow = ({scheduleName}) => {
    return (
        <div>
            <div className="input-group mb-3">
                <input
                    className="form-control input-group-text"
                    type="text"
                    placeholder={scheduleName}
                    />
                <button className="form-control btn btn-primary submitTaskButton" type="submit" >Select</button>
            </div>       
        </div>
    );
}

export default MatrixTableRow;