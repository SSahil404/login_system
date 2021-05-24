import React from "react";
import Axios from "axios";

const SignupPage = ({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    cPassword,
    setCPassword,
    address,
    setAddress,
}) => {
    const submitHandler = (e) => {
        e.preventDefault();
        if (!username || !email || !password || !address) {
            alert("All fields are required");
        } else if (cPassword !== password) {
            alert("Passwords didn't match");
        } else {
            Axios.post("http://localhost:3001/signup", {
                username: username,
                email: email,
                password: password,
                address: address,
            }).then((response) => {
                console.log(response);
            });
            setUsername("");
            setEmail("");
            setPassword("");
            setCPassword("");
            setAddress("");
            alert("Details Submitted Successfully\nYou can now login");
        }
    };

    const inputUsernameHandler = (e) => {
        setUsername(e.target.value);
    };
    const inputEmailHandler = (e) => {
        setEmail(e.target.value);
    };
    const inputPasswordHandler = (e) => {
        setPassword(e.target.value);
    };
    const inputCPasswordHandler = (e) => {
        setCPassword(e.target.value);
    };
    const inputAddressHandler = (e) => {
        setAddress(e.target.value);
    };
    return (
        <div>
            <form>
                <h1 className="title">Signup Form</h1>
                <div className="form-content">
                    <div className="userDetail">
                        <div className="mb-3">
                            <label htmlFor="InputUsername" className="form-label">
                                Username
                            </label>
                            <input
                                value={username}
                                onChange={inputUsernameHandler}
                                type="text"
                                className="form-control"
                                id="InputUsername"
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={inputEmailHandler}
                                className="form-control"
                                id="InputEmail1"
                                aria-describedby="emailHelp"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="userPassword">
                        <div className="mb-3">
                            <label htmlFor="InputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                value={password}
                                onChange={inputPasswordHandler}
                                type="password"
                                className="form-control"
                                id="InputPassword1"
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputCPassword1" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                value={cPassword}
                                onChange={inputCPasswordHandler}
                                type="password"
                                className="form-control"
                                id="InputCPassword1"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="FormControlTextarea1" className="form-label">
                            Address
                        </label>
                        <textarea
                            value={address}
                            onChange={inputAddressHandler}
                            className="form-control"
                            id="FormControlTextarea1"
                            rows="3"
                        ></textarea>
                    </div>

                    <button
                        onClick={submitHandler}
                        type="submit"
                        className="btn btn-primary form-control"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
