import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({add}) => {
    const [form,setForm] = useState({username:'',password:''});

    const navigateMe = useNavigate();

    const handleChange=(e)=>{
        const {name,value} =e.target;
        setForm({...form,[name]:value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const username="admin";
        const password=1234;
        if(username == (form.username) && password == (form.password)){
            localStorage.setItem("user",JSON.stringify('admin'));
            alert("login success..");
            navigateMe('/Accounts');
            add();
        }else{
            alert("invalid credentials..");
            return;
        }
        setForm({username:'',password:''});
    }

return (
  <div>
    <div className="marquee">
        <p>For login use these credentials: Username: admin | Password: 1234</p>
    </div>
    <div className="form-container">
      <h2 className="page-title">MyBank Application</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text"  id="username"  name="username"  value={form.username}  onChange={handleChange} placeholder='admin' required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input  type="password"  id="password"  name="password"  value={form.password}  onChange={handleChange}  placeholder='1234' required/>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
);

  return (
    <div>
        <center>
            <h3>MyBank Application</h3>
            
            <form onSubmit={handleSubmit}>
                UserName: <input type="text" name='username' id='username' value={form.username} onChange={handleChange} required/><br />
                password: <input type="password" name='password' id='password' value={form.password} onChange={handleChange} required/><br />
                <button>Login</button>
            </form>
        </center>
    </div>
  )
}

export default Login