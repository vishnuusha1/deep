import React from 'react';
import '../../style/login.css';
import { Link, useHistory } from 'react-router-dom'
import { Component, useState } from 'react'
import M from 'materialize-css'
import axioInstance from '../rootApi'

const Login = () => {
  const history=useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function Signin(){
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        M.toast({html:'invalid email',classes:"#f44336 red"})
        return
    }

     
        axioInstance
        .post("/login", {
          email: email,
          password: password
        })
        .then(
          (response) => {
            console.log(response.data);
            
            debugger;
            if(response.data.token){
              localStorage.setItem('token', response.data.token);
              M.toast({html:' login sucessfull ',classes:"#76ff03 light-green accent-3"})
              history.push('/Dashboard1')
            } 
            debugger;
     
          },
          (error) => {
            debugger;

            M.toast({html:'invalid user',classes:"#f44336 red"})
       
          }
        );
        
     }

    return (
        <div className='mycard'>
            <div className="card authcard">
                <h2>Login</h2>
                <input type="text" placeholder='email' value={email}
                    onChange={(e) => { setEmail(e.target.value) }} ></input>
                <input type="password" placeholder='password' value={password}
                    onChange={(e) => { setPassword(e.target.value) }} ></input>
                <button onClick={Signin} class="btn waves-effect waves-light #f44336 red">Login
       </button>
            </div>
        </div>

    )
}
export default Login