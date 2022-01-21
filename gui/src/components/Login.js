import React, { useState } from 'react'
import './Login.css'
import PropTypes from 'prop-types'


async function loginUser(credentials) {
    return fetch('http://localhost:8080/app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

async function registerUser(credentials) {
    return fetch('http://localhost:8080/app/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export default function Login({setToken}) {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [emailReg, setEmailReg] = useState('')

    const handleSubmitLogin = async e => {
        e.preventDefault()
        const userDetails = await loginUser({
            username: username,
            password: password
        })
        // console.log(userDetails.userDetails)
        // console.log(userDetails.token)
        // console.log(userDetails.message)
        setToken(userDetails.userDetails)

        if(userDetails.message){
            alert(userDetails.message)
        }
    }

    const handleSubmitRegister = async e => {
        e.preventDefault()
        const userDetails = await registerUser({
            username: usernameReg,
            password: passwordReg,
            email: emailReg
        })
        if(userDetails.message){
            alert(userDetails.message);
        } else {
            alert("Account created! You can now log in!")
        }
        // console.log(userDetails)
    }

    return(
        <div className='authentication-wrapper'>
            <div className='login-wrapper'>
                {/* <h1>Please Log In</h1>
                <form onSubmit={handleSubmitLogin}>
                    <label>
                        <p>Username</p>
                        <input type='text' onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type='password' onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form> */}

                <form onSubmit={handleSubmitLogin}>
                    <h2>Welcome Back!</h2>
                    <fieldset>
                    <legend>Log In</legend>
                    <ul>
                        <li>
                        <label for="username">Username:</label>
                        <input type="text" id="username" required onChange={e => setUsername(e.target.value)}/>
                        </li>
                        <li>
                        <label for="password">Password:</label>
                        <input type="password" id="password" required onChange={e => setPassword(e.target.value)}/>
                        </li>
                    </ul>
                    </fieldset>
                    <button type='submit'>Login</button>
                </form>
            </div>

            <div className='register-wrapper'>
                {/* <h1> Or Register Here </h1>
                <form onSubmit={handleSubmitRegister}>
                    <label>
                        <p>Username</p>
                        <input type='text' onChange={e => setUsernameReg(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type='password' onChange={e => setPasswordReg(e.target.value)}/>
                    </label>
                    <label>
                        <p>Email</p>
                        <input type='email' onChange={e => setEmailReg(e.target.value)}/>
                    </label>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form> */}
                <form onSubmit={handleSubmitRegister}>
                    <h2> Or Sign Up!</h2>
                    <fieldset>
                        <legend>Create Account</legend>
                        <ul>
                            <li>
                                <label for="username">Username:</label>
                                <input type="text" id="username" required onChange={e => setUsernameReg(e.target.value)}/>
                                </li>
                            <li>
                                <label for="password">Password:</label>
                                <input type="password" id="password" required onChange={e => setPasswordReg(e.target.value)}/>
                            </li>
                            <li>
                                <label for="email">Email:</label>
                                <input type="email" id="email" required onChange={e => setEmailReg(e.target.value)}/>
                            </li>
                        </ul>
                    </fieldset>
                    <button type='submit'>Submit</button>
                </form>
                
            </div>
        </div>


    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}