import React, { useEffect, useState } from 'react'
import './App.css';
import Accounts from './components/Accounts'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import Logout from './components/Logout'
import AddAccount from './components/AddAccount'
import AccountDetails from './components/AccountDetails'

const App = () => {
  const [user,setUser] = useState(()=>JSON.parse(localStorage.getItem('user')) || null);
  const [ref,setRef] = useState(0);
  const [edit,setEdit] = useState(null);

  return (
    <div>
      {/* <Accounts/> */}

      <header>
          {user && <Logout add={()=> setUser(null)} />}
      </header>
      <main>
          <Routes>
            <Route path='/' element={<Login add={()=> setUser('admin')}/>} />    
            <Route element={<ProtectedRoutes/>}>
                  <Route path='/accountDetails/:accNo' element={<AccountDetails/>}></Route>
                  <Route path='/accounts' element={<Accounts refer={ref}  add={(a)=>setEdit(a)}/>}></Route>
                  <Route path='/addAccount' element={<AddAccount add={()=>{setRef(ref+1); setEdit(null)}}  acceptUpdate={edit} />}></Route>
            </Route>
        </Routes>
      </main>
      
    </div>
  )
}

export default App