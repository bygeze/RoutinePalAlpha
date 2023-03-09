import { useState, useEffect } from 'react';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import LoginView from '.././views/LoginView'
import Main from '../Main';

export default function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = createBrowserRouter([
        {
          path: "/login",
          element: <LoginView isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></LoginView>,
        },
        {
          path: "/",
          element: <Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Main>,
        }
      ]);  
  
    // check if user is logged in on component mount and on location change
    useEffect(() => {
        //console.log(isLoggedIn);
        /*
      const checkLoginStatus = async () => {
        const result = false;//await api.checkLogin(); // make API call to check login status
        setIsLoggedIn(result); // set isLoggedIn to the result of the API call
      };
  
      checkLoginStatus();*/
    }, []);
  
    return <RouterProvider className="wrapper" router={router} />;

}