import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/">
                        <div className="navbar-brand">Login System</div>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/">
                                    <div className="nav-link active">Login</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup">
                                    <div className="nav-link active">Signup</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="users">
                                    <div className="nav-link active">User Details</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
