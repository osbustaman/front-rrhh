import React, { useState } from 'react';
import { ErrorModal } from './error/ErrorModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/login.css';

// Cargar las variables de entorno
export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [typeError, setTypeError] = useState('');


    const validateFields = (message_error, type_error) => {
        if (!email || !password) {
            setErrorMessage(message_error);
            setShowModal(true);
            setTypeError(type_error);
            return false;
        }

        // Aquí puedes agregar más validaciones si lo necesitas

        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateFields("Campos vacios, favor revisar e intentar nuevamente.", "error")) {
            return;
        }

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
        .then(result => {
            const resultJson = JSON.parse(result);
            console.log(resultJson)

            if (resultJson.error) {
                setErrorMessage(resultJson.error);
                setShowModal(true);
                setTypeError("error");
                return;
            }else{
                localStorage.setItem('token', resultJson.token);
                setErrorMessage(resultJson.message);
                setShowModal(true);
                setTypeError("success");
                return;
            }
        })
        .catch(error => {
            if (!validateFields(error, "error")) {
                return;
            }
        });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4 form login-form">
                        <form className="text-center">
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

            <ErrorModal show={showModal} handleClose={() => setShowModal(false)} errorMessage={errorMessage} />
        </>
    );
}