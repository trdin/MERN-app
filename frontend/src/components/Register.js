import { useState } from 'react';
import Button from './Button';
import ReCAPTCHA from "react-google-recaptcha";



function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState("");
    const [ReCaptcha, setReCaptcha] = useState("");
    console.log(ReCaptcha)
    async function Register(e) {
        e.preventDefault();
        if (ReCaptcha != "") {
            const res = await fetch("http://localhost:3001/users", {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                    token: ReCaptcha
                })
            });

            const data = await res.json();
            if (data._id !== undefined) {
                window.location.href = "/";
            }
            else {
                setUsername("");
                setPassword("");
                setEmail("");
                setError("Registration failed");
            }
        } else {
            setError("Not verified");
        }
    }



    return (

        <form onSubmit={Register}>
            <div className="form-group">
                <input type="text" className="form-control" name="email" placeholder="Email" value={email} onChange={(e) => (setEmail(e.target.value))} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" name="username" placeholder="Username" value={username} onChange={(e) => (setUsername(e.target.value))} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e) => (setPassword(e.target.value))} />
            </div>
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={setReCaptcha}
            />
            <div className="form-group">
                <Button text="Login" />
            </div>

            {error != "" ? <label class="alert alert-danger">{error}</label> : ""}

        </form>

    );
}

export default Register;