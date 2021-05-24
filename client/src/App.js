import React, { useState } from "react";
import Axios from "axios";

import "./App.css";

import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDetails from "./pages/UserDetails";

import { Switch, Route, useLocation } from "react-router-dom";

function App() {
    Axios.defaults.withCredentials = true;

    const location = useLocation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [address, setAddress] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);

    return (
        <>
            <Nav />
            <div className="App">
                <Switch location={location} key={location.pathname}>
                    <Route path="/" exact>
                        <LoginPage loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
                    </Route>
                    <Route path="/signup">
                        <SignupPage
                            username={username}
                            setUsername={setUsername}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            cPassword={cPassword}
                            setCPassword={setCPassword}
                            address={address}
                            setAddress={setAddress}
                        />
                    </Route>
                    <Route path="/users">
                        <UserDetails loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default App;
