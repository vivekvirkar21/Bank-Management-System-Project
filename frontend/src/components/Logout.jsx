import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({add}) => {

    const navigateMe = useNavigate();
    const handleLogout=async()=>{
        await localStorage.removeItem('user');
        alert('logout success...');
        navigateMe('/');
        add();
    }
  return (
    <div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout