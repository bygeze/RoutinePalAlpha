import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import Root from './routes/Root';
import LoginView from './views/LoginView'
import reportWebVitals from './reportWebVitals';

// Create a context for the authenticated state
export const AuthContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define the login and logout functions that can update the state
  function login() {
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  // Wrap the router provider in the auth context provider
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
  {
    path: "login",
    element: <LoginView></LoginView>,
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
