import { useContext, useEffect } from 'react';
import { AuthContext } from '../index';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Root() {
    const { isAuthenticated } = useContext(AuthContext);
    const history = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
          history('/login');
        }
      }, [isAuthenticated, history]);

      return (
        <div>
          <h1>Welcome to the main view!</h1>
        </div>
      );
    
  }