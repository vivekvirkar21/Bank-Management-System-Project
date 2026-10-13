import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const user = localStorage.getItem('user');
  return (
    <div>
        {user ? <Outlet/> : <Navigate to='/' /> }
    </div>
  )
}

export default ProtectedRoutes