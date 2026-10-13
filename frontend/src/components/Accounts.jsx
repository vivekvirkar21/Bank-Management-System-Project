import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddAccount from './AddAccount';

const Accounts = ({refer,add}) => {
    const [accounts,setAccounts]=useState([]);

    const navigateMe = useNavigate();

    useEffect(()=>{
        loadAll();
    },[refer]);

    const loadAll=async()=>{
        const res = await axios.get(`http://localhost:8080/accounts`);
        setAccounts(res.data);
    }
    // const handleDelete=async(a)=>{
    //     const pin = (a.pin);
    //     await axios.delete(`http://localhost:8080/account/${a.accNo}`,
    //                                                         {
    //                                                             data:{
    //                                                                 pin : (a.pin)
    //                                                             }        
    //                                                         });
    //     loadAll();
    //     setPin(0);
    // }
    const handleDelete = async (a) => {
        const pin = prompt(`Enter PIN to delete account ${a.accNo}:`);

        // If user clicks Cancel or enters nothing
        if (pin === null || pin.trim() === "") {
            alert("Delete cancelled. Please enter your PIN.");
            return;
        }
        if(pin != a.pin){
            alert("Wrong pin...");
            return;
        }
        try {
            const res = await axios.delete(`http://localhost:8080/account/${a.accNo}`,
                                            {
                                                data: {
                                                    pin: Number(pin)
                                                }
                                            }
            );
            alert(res.data);
            loadAll();
        } catch (error) {
            alert(error.response?.data || "Failed to delete account");
        }
    };

    const handleUpdate=(a)=>{
        add(a);
        navigateMe('/addAccount');
    }

    const handleView=(accNo)=>{
        navigateMe('/accountDetails/'+accNo);
    }
    const handleAdd=()=>{
        navigateMe('/addAccount');
    }


    return (
        <div className="page-container">
            <div className="card">
            <h2 className="page-title">
                Welcome to MyBank Application
            </h2>

            <h3>All Accounts List</h3>

            <div className="button-row">
                <button onClick={handleAdd}>Add Account</button>
            </div>

            <div className="table-wrapper">
                <table className="account-table">
                    <thead>
                        <tr>
                            <th>Account No.</th>
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Pin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((a)=>(
                            <tr key={a.accNo}>
                                <td>{a.accNo}</td>
                                <td>{a.name}</td>
                                <td>{a.balance}</td>
                                <td>{a.pin}</td>
                                <td><button onClick={()=>handleView(a.accNo)}>View</button> {"  "}
                                    <button onClick={()=>handleUpdate(a)}>Update</button> {"  "}
                                    <button onClick={()=>handleDelete(a)}>Delete</button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );

  return (
    <div>
        <center>
            <h2>Welcome to MyBank Application</h2>
            <h3>All Accounts List</h3>
            <button onClick={handleAdd}>Add Account</button>
            <table border="1">
                <thead>
                    <tr>
                        <th>Account No.</th>
                        <th>Name</th>
                        <th>Balance</th>
                        <th>Pin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((a)=>(
                        <tr key={a.accNo}>
                            <td>{a.accNo}</td>
                            <td>{a.name}</td>
                            <td>{a.balance}</td>
                            <td>{a.pin}</td>
                            <td><button onClick={()=>handleView(a.accNo)}>View</button> {"  "}
                                <button onClick={()=>handleUpdate(a)}>Update</button> {"  "}
                                <button onClick={()=>handleDelete(a)}>Delete</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </center>
    </div>
  )
}

export default Accounts