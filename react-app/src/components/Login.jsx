import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import './Login.css'; // Import the CSS file for styling

function Login() {
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        if (!username || !password) {
            alert("Username or password should not be empty");
            return;
        }
        const url = 'http://localhost:4000/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
<<<<<<< HEAD
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
=======
                    if(res.data.token){
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
>>>>>>> bd03d83ece5303b0a85744d4e760f5f29f844d61
                        navigate('/');
                    }
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            });
    };

    return (
        <div className="login-container">
            <Header />
            <div className="login-box">
                <h2>Welcome to Login Page</h2>
                <label htmlFor="username">USERNAME</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setusername(e.target.value)} 
                    className="login-input"
                />
                <label htmlFor="password">PASSWORD</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)} 
                    className="login-input"
                />
                <button onClick={handleApi} className="login-button">Login</button>
                <Link to="/signup" className="signup-link">Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;
