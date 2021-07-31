import React, { useState, useEffect, useRef } from 'react';
// import user from '../../../../Models/Auth/User.model';
import axios from 'axios';
import axiosInstance from '../../Helper/axiosInstance';
import { Redirect } from 'react-router-dom'


import classes from './Auth.module.css';
function validateEmails(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Login = (props) => {
    const [Authencate, setAuthencate] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validatePassword, setValidatePassword] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const passwordRef = useRef();
    const emailRef = useRef();
    const [errorRes, setErrorRes] = useState("");

    useEffect(() => {
        if (validateEmails(email)) {
            validateEmail && setValidateEmail(false);
        }
    }, [email])
    useEffect(() => {
        if (password.length > 6) {
            validatePassword && setValidatePassword(false);
        }
    }, [password]);
    const onChangeHandeller = (e) => {
        // ref.current.focus()
        const id = e.target.id;
        const value = e.target.value
        if (id === 'email') {
            setEmail(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmails(email)) {
            setValidateEmail(true)
            emailRef.current.focus();
            return
        }
        if (password.length < 6) {
            setValidatePassword(true);
            passwordRef.current.focus();
            return
        }
        // const user = { email, password, }
        axiosInstance()
            .post('auth/login', { email, password })
            .then((res) => {
                console.log(res)
                localStorage.token = res.data.token;
                setAuthencate(false);
                props.redi()
            })
            .catch((err) => {
                console.log(err.response);
                setErrorRes(err.response.data.msg)
            });
    }
    return <>{!localStorage.getItem('token') ? <div className={classes.topBox} >
        <form onSubmit={onSubmit}>
            <div className={classes.inrForm}>
                <div className={classes.Title}>Login</div>
                {errorRes ? < div > {errorRes} </div> : null}
                <div className={classes.field}>
                    <div className={classes.labelDiv}><label >E-mail</label></div>
                    {validateEmail ? <div className={classes.eReflector}>email not valid</div> : null}
                    <div className={classes.inputDiv}><input ref={emailRef} id='email' onChange={onChangeHandeller} vlaue={email} className={classes.input} type="text" /></div>
                </div>
                <div className={classes.field}>
                    <div className={classes.labelDiv}><label >Password</label></div>
                    {validatePassword ? <div className={classes.eReflector}>user password  must be atlist 6 character</div> : null}
                    <div className={classes.inputDiv}><input ref={passwordRef} id='password' vlaue={password} onChange={onChangeHandeller} className={classes.input} type="password" /></div>
                </div>
                <div className={classes.field}>
                    <div className={classes.inputDiv}><input className={classes.submit} type="submit" value="LogIn" /></div>
                </div>
            </div>
        </form>
    </div > : <Redirect to='/home' />
    }</>

}
export default Login;