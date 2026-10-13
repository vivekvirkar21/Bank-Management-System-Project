import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddAccount = ({add,acceptUpdate}) => {
    const [form,setForm] = useState({accNo:'',name:'',balance:'',pin:''});
    const navigateMe = useNavigate();

    useEffect(()=>{
        if(acceptUpdate){
            setForm(acceptUpdate);
            
        }
    },[acceptUpdate]);

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setForm({...form,[name]:value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const name = form.name.trim();
        if(name == "" || 'null' == name.toLowerCase() ){
            alert("enter valid name.");
            return;
        }
        if (form.balance < 500) {
            alert("minimum of Rs.500 required to open account.");
            return;
        }
        if(acceptUpdate){
            await axios.put(`http://localhost:8080/account/${acceptUpdate.accNo}`,form);
            // console.log(e);
        }else{
            await axios.post(`http://localhost:8080/account`,form);
        }
        add();
        setForm({accNo:'',name:'',balance:'',pin:''});
        navigateMe('/accounts');
    }

  return (
    <div className="form-container">
    <h3 className="page-title">
        {acceptUpdate ? 'Update Account' : 'Create a New Account'}
    </h3>
        <form onSubmit={handleSubmit}>
                {acceptUpdate? <> Account No. : <input type="number" id='accNo' name='accNo' value={form.accNo} onChange={handleChange} required readOnly/><br /></>
                            :  <>Account No. : <input type="number" id='accNo' name='accNo' value={form.accNo} onChange={handleChange} required /><br /></>}
                Name : <input type="text" id='name' name='name' value={form.name} onChange={handleChange} required /><br />
                {!acceptUpdate && <>Amount deposite: <input type="number" id='balance' name='balance' value={form.balance} onChange={handleChange} required /><br /></>}
                Pin : <input type="password" id='pin' name='pin' value={form.pin} onChange={handleChange} required /><br />
                
                <button>{acceptUpdate? 'update' : 'create account'}</button>
            </form>
    </div>
    
    // <div>
    //     <center>
    //         <h3>{acceptUpdate ? 'update' : 'Create a new Account'}</h3>
    //         <form onSubmit={handleSubmit}>
    //             {acceptUpdate? <> Account No. : <input type="number" id='accNo' name='accNo' value={form.accNo} onChange={handleChange} required readOnly/><br /></>
    //                         :  <>Account No. : <input type="number" id='accNo' name='accNo' value={form.accNo} onChange={handleChange} required /><br /></>}
    //             Name : <input type="text" id='name' name='name' value={form.name} onChange={handleChange} required /><br />
    //             {!acceptUpdate && <>Amount deposite: <input type="number" id='balance' name='balance' value={form.balance} onChange={handleChange} required /><br /></>}
    //             Pin : <input type="password" id='pin' name='pin' value={form.pin} onChange={handleChange} required /><br />
                
    //             <button>{acceptUpdate? 'update' : 'create account'}</button>
    //         </form>
    //     </center>
    // </div>
  )
}

export default AddAccount