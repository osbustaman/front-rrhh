import React, { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/login.css';

// Cargar las variables de entorno
export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Cookie", "sessionid=0da0lgbdkmee79dny6fvvuh9qg68ghul");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${import.meta.env.VITE_API_URL}login-drf`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    };


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4 form login-form">
                        <form>
                            <h2 className="text-center">Login</h2>
                            <p className="text-center">Login with your email and password.</p>
                            <div className="form-group">
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" onClick={handleSubmit}>Login</button>
                            </div>
                            <p className="text-center">Don't have an account? <a href="/register">Register</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}