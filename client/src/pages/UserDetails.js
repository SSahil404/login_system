import React, { useEffect, useState } from "react";
import Axios from "axios";

import User from "../components/User";

const UserDetails = ({ loginStatus, setLoginStatus }) => {
    let sno = 1;
    const [userDetails, setUserDetails] = useState([]);
    const [userStatus, setUserStatus] = useState(true);

    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((response) => {
            // console.log(response.data);
            if (response.data.userFound === true) {
                setUserDetails(response.data.result);
            } else {
                setUserStatus(false);
            }
        });
    }, [userDetails, userStatus]);

    const logoutHandler = () => {
        Axios.get("http://localhost:3001/logout").then((response) => {
            // console.log(response);
            if (response.data.auth === false) {
                setLoginStatus(false);
                alert(response.data.message);
            }
        });
    };
    return (
        <div className="d-flex flex-column">
            <div>
                <h1 className="title text-center mb-3">User Details</h1>
                {userStatus &&
                    userDetails.map((user) => (
                        <User
                            sno={sno++}
                            key={user.sno}
                            userId={user.sno}
                            username={user.username}
                            email={user.email}
                            address={user.address}
                            userStatus={userStatus}
                            setUserStatus={setUserStatus}
                        />
                    ))}
                {userStatus || <h4 className="text-center my-5">No User Found</h4>}
            </div>

            {loginStatus && (
                <button onClick={logoutHandler} className="btn btn-warning my-3">
                    Logout Yourself
                </button>
            )}
        </div>
    );
};

export default UserDetails;
