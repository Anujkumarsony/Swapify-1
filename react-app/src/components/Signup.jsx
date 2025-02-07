import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import './Signup.css'; // Import the CSS file for styling

function Signup() {
    const navigate = useNavigate();
     
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    
    const handleApi = () => {
        if (!username || !password) {
            alert("Username or password should not be empty");
            return; // Exit the function to prevent further execution
        }
        const url = 'http://localhost:4000/signup';
        const data = { username, password };
        axios.post(url, data)
        .then((res) => {
            if (res.data.message) {
                alert(res.data.message);
                navigate('/login');
            }
        })
        .catch((err) => {
            alert('SERVER ERR');
        });
    }

    return (
        <div className="signup-container">
            <Header />
            <div className="signup-box">
                <h2>Welcome to Signup Page</h2>
                <br/>
                <label htmlFor="username">USERNAME</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setusername(e.target.value)} 
                    className="signup-input"
                />
                <br />
                <label htmlFor="password">MOBILE</label>
                <input 
                    type="text" 
                    id="username" 
                    value={mobile} 
                    onChange={(e) => setmobile(e.target.value)} 
                    className="signup-input"
                />
                <label htmlFor="password">EMAIL</label>
                <input 
                    type="text" 
                    id="username" 
                    value={email} 
                    onChange={(e) => setemail(e.target.value)} 
                    className="signup-input"
                />
                <br />
                <label htmlFor="password">PASSWORD</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)} 
                    className="signup-input"
                />
                <br />
                <button onClick={handleApi} className="signup-button">Signup</button>
                <Link to="/login" className="login-link">Login</Link>
            </div>
        </div>
    );
}

export default Signup;