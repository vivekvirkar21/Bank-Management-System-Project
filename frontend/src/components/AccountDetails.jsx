import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AccountDetails = () => {
    const [account,setAccount] = useState({accNo:'',name:'',balance:'',pin:''});
    const [amount,setAmount] = useState({deposit:'',withdraw:''});
    const {accNo} = useParams();

    useEffect(()=>{
        if (accNo) {
            loadAccount();
        }
    },[accNo]);

    const loadAccount=async()=>{
        const res= await axios.get(`http://localhost:8080/accounts/${accNo}`);
        const a=res.data;
        setAccount(a);
    }

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setAmount({...amount,[name]:Number(value)});
    }

    const handleDeposit=async(e)=>{
        e.preventDefault();
        if (amount.deposit <= 0) {
            alert('enter valid amount.');
            return;
        }
        try {
           const res = await axios.put(`http://localhost:8080/account/${accNo}/deposit`,{
                                                                                balance:Number(amount.deposit)
                                                                                });
           alert(res.data);
           const total = account.balance + amount.deposit;
           setAccount({...account,balance:total});
        } catch (error) {
            alert(error.response?.data || 'failed to deposit.');
        }
        setAmount({deposit:'',withdraw:''});
    }


    const handleWithdraw=async(e)=>{
        e.preventDefault();
        if (amount.withdraw <= 0) {
            alert("enter Valid amount.");
            return;
        }
        if (amount.withdraw >= account.balance) {
            alert("Insufficient Balance..");
            return;
        }
        const remain = account.balance - amount.withdraw;
        if (remain <= 500) {
            alert(" maintain minimum of Rs.500 balance..  ");
            return;
        }
        try {
            const res = await axios.put(`http://localhost:8080/account/${accNo}/withdraw`,{
                                                                                balance:Number(amount.withdraw)
                                                                                });
            alert(res.data);
            setAccount({...account,balance:remain});
        } catch (error) {
            alert(error.response?.data || "failed to withdraw.");
        }

        setAmount({deposit:'',withdraw:''});
    }


return (
  <div className="page-container">
    <div className="card">
      <h3 className="page-title">Account Details</h3>

      <div className="account-grid">
        <div className="account-item">
          <div className="account-label">Account Number</div>
          <div className="account-value">{account.accNo}</div>
        </div>

        <div className="account-item">
          <div className="account-label">Account Holder</div>
          <div className="account-value">{account.name}</div>
        </div>

        <div className="account-item">
          <div className="account-label">Balance</div>
          <div className="account-value balance-value">
            ₹{account.balance}
          </div>
        </div>
        <div className="account-item">
          <div className="account-label">Pin</div>
          <div className="account-value">{account.pin}</div>
        </div>
      </div>

      <div className="transaction-grid">
        <div className="transaction-card">
          <h4>Deposit</h4>
                <form onSubmit={handleDeposit}>
                    <input type="number" id='deposit' name='deposit' value={amount.deposit} onChange={handleChange} required /><br />
                    <button>deposit</button>
                </form>
        </div>

        <div className="transaction-card">
          <h4>Withdraw</h4>
                <form onSubmit={handleWithdraw}>
                    <input type="number" id='withdraw' name='withdraw' value={amount.withdraw} onChange={handleChange} required /><br />
                    <button>withdraw</button>
                </form>
        </div>
      </div>
    </div>
  </div>
);

  return (
    <div>
        <center>
            <div>
                <h3>Account Details</h3>
                <p>Account No.:{account.accNo}</p>
                <p>Name: {account.name}</p>
                <p>Balance:{account.balance}</p>
                <p>Pin:{account.pin}</p>
            </div>
            <div>
                <span>
                    <h4>Deposit</h4>
                    <form onSubmit={handleDeposit}>
                        <input type="number" id='deposit' name='deposit' value={amount.deposit} onChange={handleChange} required /><br />
                        <button>deposit</button>
                    </form>
                </span>
                <span>
                    <h4>Withdraw</h4>
                    <form onSubmit={handleWithdraw}>
                        <input type="number" id='withdraw' name='withdraw' value={amount.withdraw} onChange={handleChange} required /><br />
                        <button>withdraw</button>
                    </form>
                </span>
            </div>
        </center>
    </div>
  )
}

export default AccountDetails