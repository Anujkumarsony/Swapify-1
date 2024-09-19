import {Link, useNavigate} from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";

function Signup(){

    const navigate = useNavigate();
     
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    
    
    const handleApi = () => {
        if (!username || !password) {
            alert("Username or password should not be empty");
            return; // Exit the function to prevent further execution
        }
        const url = 'http://localhost:4000/signup';
        const data = { username, password };
        axios.post(url,data)
        .then((res) => {
            if(res.data.message) {
                alert(res.data.message);
                navigate('/login')
            }
        })
        .catch((err) => {
            alert('SERVER ERR')
        })
    }
    return (
        <div>
            <Header/>
            Welcome to signup page
            <br />
             USERNAME
            <input type="text" value={username} onChange={(e) => {
                setusername(e.target.value)
            }}/>
            <br />
             PASSWORD
            <input type="text" value={password} onChange={(e)=> {
                setpassword(e.target.value)
            }} />
            <br />
            <button onClick={handleApi}> Signup</button>
            <Link to="/login"> LOGIN </Link>
        </div>
    )
}

export default Signup;