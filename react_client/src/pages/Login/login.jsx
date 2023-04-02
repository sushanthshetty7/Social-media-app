import React, { useContext, useRef } from 'react'
import "./login.css"
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material' 

export default function Login() {
  const email = useRef()
  const password = useRef()
  const {user, isFetching, error, dispatch} = useContext(AuthContext)
  const handleClick=(e)=>{
    e.preventDefault()
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }

  console.log(user)
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social</h3>
                <span className="LoginDisc">connect with friends around you on social</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick }>
                  <input placeholder='Email' type="text" required className="loginInput" ref={email}/>
                  <input placeholder='Password' type="password" required minLength="6" className="loginInput" ref={password} />
                <button className="loginButton" disabled={isFetching} >{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}</button>
                  <span className="loginForget">Forget Password?</span>
                  <button className="loginRegister">{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create new Account "}</button>
                </form>
            </div>
        </div>
    </div>
  )
}
