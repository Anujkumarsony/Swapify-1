import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";

function Login() {

    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        if (!username || !password) {
            alert("Username or password should not be empty");
            return; // Exit the function to prevent further execution
    }
        const url = 'http://localhost:4000/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                // console.log(res.data);
                if (res.data.message) {
                    if(res.data.token){
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    }
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }

    return (
        <div>
            <Header />
            Welcome to login page
            <br />
            USERNAME
            <input type="text" value={username} onChange={(e) => {
                setusername(e.target.value)
            }} />
            <br />
            PASSWORD
            <input type="text" value={password} onChange={(e) => {
                setpassword(e.target.value)
            }} />
            <br />
            <button onClick={handleApi}> Login</button>
            <Link to="/signup"> SIGNUP </Link>
        </div>
    )
}

export default Login;