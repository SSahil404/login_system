import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

import { Link } from "react-router-dom";

const LoginPage = ({ loginStatus, setLoginStatus }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [loginDetails, setLoginDetails] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            // console.log(response);
            if (response.data.auth === true) {
                setLoginStatus(true);
                setLoginDetails(response.data.user[0].username);
            } else {
                setLoginDetails("");
            }
        });
    }, [setLoginStatus]);

    const loginHandler = (e) => {
        e.preventDefault();
        if (!userEmail || !userPassword) {
            alert("All fields are required");
        } else {
            Axios.post("http://localhost:3001/login", {
                email: userEmail,
                password: userPassword,
            }).then((response) => {
                // console.log(response);
                if (!response.data.auth) {
                    setLoginStatus(false);
                    setLoginDetails(response.data.message);
                } else {
                    setLoginStatus(true);
                    localStorage.setItem("token", response.data.token);
                }
            });
            setUserEmail("");
            setUserPassword("");
        }
    };

    const logoutHandler = () => {
        Axios.get("http://localhost:3001/logout").then((response) => {
            // console.log(response);
            if (response.data.auth === false) {
                setLoginStatus(false);
                alert(response.data.message);
            }
        });
    };

    const inputEmailHandler = (e) => {
        setUserEmail(e.target.value);
    };
    const inputPasswordHandler = (e) => {
        setUserPassword(e.target.value);
    };
    const userAuthHandler = () => {
        Axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            console.log(response);
            alert(response.data);
        });
    };

    return (
        <div>
            {loginStatus || (
                <>
                    <h4 className="text-center mb-5">{loginDetails}</h4>
                    <form>
                        <h1 className="title">Login Form</h1>
                        <div className="mb-3">
                            <label htmlFor="InputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                value={userEmail}
                                onChange={inputEmailHandler}
                                type="email"
                                className="form-control"
                                id="InputEmail1"
                                aria-describedby="emailHelp"
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                value={userPassword}
                                onChange={inputPasswordHandler}
                                type="password"
                                className="form-control"
                                id="InputPassword1"
                                autoComplete="off"
                            />
                        </div>
                        <button
                            onClick={loginHandler}
                            type="submit"
                            className="btn btn-primary form-control"
                        >
                            Login
                        </button>
                        <div className="signup-call">
                            <h6>Don't have an account?</h6>
                            <h5 className="text-submit">
                                <Link to="/signup">Sign up</Link>
                            </h5>
                        </div>
                    </form>
                </>
            )}
            {loginStatus && (
                <div className="d-flex flex-column">
                    <h3>You are logged in as {loginDetails}</h3>
                    <button onClick={userAuthHandler} className="btn btn-success my-2">
                        Check Authentication
                    </button>
                    <button onClick={logoutHandler} className="btn btn-warning">
                        Logout Yourself
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
