import React, {useState} from "react";
import {
useNavigate,
  } from "react-router-dom";

//import api from "../api";

function LoginView(props) {
    const navigate = useNavigate();
    
    const [wantsRegister, setWantsRegister] = useState(false);


  const handleLogin = async () => {
    const result = true;//await api.login(); // make API call to log in
    if (result) {
        props.setIsLoggedIn(result);
        navigate('/');
    }
  };

  const toggleRegister = () => {
    let val = !wantsRegister;
    setWantsRegister(val);
  }

  return (
    <div
        className="container-fluid LoginViewWrapper h-100 d-flex align-items-center justify-content-center"
        >
            <div
                className="LoginMiddleBox">
                <h1 className="text-center">Welcome to SchedulePal</h1>
                {
                    !wantsRegister ? 
                    (<div>
                        <h5 className="text-center">Please sign in order to use the application</h5>
                        <br />
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" placeholder="Username"></input>
                        </div>
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" placeholder="Password"></input>
                        </div>
                        <div className="input-group mb-4">
                        <button className="btn btn-primary form-control" onClick={handleLogin}>Login</button>
                        </div>
                        <p className="text-center">You don't have an account? <span onClick={toggleRegister}>Click here to register</span></p>
                    </div>) 
                    : (<div>
                        <h5 className="text-center">Please fill up the blanks to create your account</h5>
                        <br />
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" placeholder="Name"></input>
                        </div>
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" placeholder="Username"></input>
                        </div>
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" placeholder="Password"></input>
                        </div>
                        <div className="input-group mb-4">
                        <button className="btn btn-primary form-control">Register</button>
                        </div>
                        <p className="text-center">You already have an account? <span onClick={toggleRegister}>Click here to login</span></p>
                    </div>) 
                }
  
                

            </div>



    </div>
  );
}

export default LoginView;