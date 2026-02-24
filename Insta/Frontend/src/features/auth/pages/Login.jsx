import React,{useState} from 'react'
import "../style/form.scss"
import {Link, useNavigate} from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const {user,handleLogin,loading} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        await handleLogin(username,password)
        console.log("user loggedIn")
        navigate("/")
    }
    if(loading){
        return(<main>
                <h1>Loading....</h1>
            </main>)
    }
    


    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Create One.</Link></p>
            </div>
        </main>
    )
}

export default Login