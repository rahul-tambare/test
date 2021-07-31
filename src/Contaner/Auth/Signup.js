import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

import axiosInstance from '../../Helper/axiosInstance'
// import user from '../../../../Models/Auth/User.model';

import classes from './Auth.module.css';
function validateEmails(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Signup = (props) => {
    const [errorRes, setErrorRes] = useState('');
    const [Authencate, setAuthencate] = useState(true);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setconformPassword] = useState("");
    const [validateUser, setvalidateUser] = useState(false);
    const [validatePassword, setValidatePassword] = useState(false);
    const [validateConformPassword, setvalidateConformPassword] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const userRef = useRef();
    const passwordRef = useRef();
    const conformpasswordRef = useRef();
    const emailRef = useRef();
    useEffect(() => {
        console.log(userName)
        if (userName.length >= 6) {
            validateUser && setvalidateUser(false);
        }
    }, [userName]);
    useEffect(() => {
        if (validateEmails(email)) {
            validateEmail && setValidateEmail(false);
        }
    }, [email])
    useEffect(() => {
        if (password.length > 6) {
            validatePassword && setValidatePassword(false);
        }
    }, [password])
    useEffect(() => {
        if (password === conformPassword) {
            validateConformPassword && setvalidateConformPassword(false);
        }
    }, [conformPassword])

    const onChangeHandeller = (e) => {
        // ref.current.focus()
        const id = e.target.id;
        const value = e.target.value
        if (id === 'userName') {
            setUserName(value);
        }
        if (id === 'email') {
            setEmail(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
        if (id === 'conformPassword') {
            setconformPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userName.length < 6) {
            userRef.current.focus();
            setvalidateUser(true);
            return
        }
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
        if (password !== conformPassword) {
            setvalidateConformPassword(true);
            conformpasswordRef.current.focus();
            return
        }
        const user = { userName, email, password, conformPassword }

        console.log(user, 'hi')
        // const resSignup = await axios.post('/auth/signup',);
        //
        axiosInstance()
            .post("/auth/signup", { username: userName, email, password })
            .then((res) => {
                localStorage.token = res.data.token;
                setAuthencate(true);
                props.redi()
            })
            .catch((err) => {
                console.log(err);
                setErrorRes(err.response.data.msg);
            });

    }

    const meee = async () => {
        try {
            let su;
            console.log(su);
            axiosInstance()
                .get("/auth/me")
                .then((res) => {
                    su = res;
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {

        }
    }
    return (<>
        {!localStorage.getItem('token') ? <div className={classes.topBox}>

            <form onSubmit={onSubmit}>
                <div className={classes.inrForm}>
                    <div className={classes.Title}>SIGNUP</div>
                    {errorRes ? <div>{errorRes}</div> : null}
                    <div className={classes.field}>
                        <div className={classes.labelDiv}><label >User Name</label></div>
                        {validateUser ? <div className={classes.eReflector}>user name must be atlist 6 character</div> : null}
                        <div className={classes.inputDiv}><input ref={userRef} id='userName' value={userName} onChange={onChangeHandeller} className={classes.input} type="text" /></div>
                    </div>
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
                        <div className={classes.labelDiv}><label >Conform Password</label></div>
                        {validateConformPassword ? <div className={classes.eReflector}>Conform password must be same as password</div> : null}

                        <div className={classes.inputDiv}><input ref={conformpasswordRef} id='conformPassword' vlaue={conformPassword} onChange={onChangeHandeller} className={classes.input} type="password" /></div>
                    </div>
                    <div className={classes.field}>
                        <div className={classes.inputDiv}><input className={classes.submit} type="submit" value="SignUp" /></div>
                    </div>
                </div>
            </form>

        </div> : <Redirect to="/home" />}
    </>)
}

export default Signup;