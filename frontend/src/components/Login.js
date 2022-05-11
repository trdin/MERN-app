import { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import Button from './Button'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    async function Login(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            userContext.setUserContext(data);
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        }
    }

    return (

        <form onSubmit={Login} className="form-group">
            <div className="form-group">
                {userContext.user ? <Navigate replace to="/" /> : ""}
                <input type="username" className="form-control" name="username" placeholder="Username"
                    value={username} onChange={(e) => (setUsername(e.target.value))} required />
            </div>
            <div className="form-group">
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                    value={password} onChange={(e) => (setPassword(e.target.value))} required />
            </div>
            <div className="form-group">
                <Button text="Prijavi" onClick={Login} />
            </div>
            <div className="form-group">
                <label>{error}</label>
            </div>
        </form>

    );
}

export default Login;