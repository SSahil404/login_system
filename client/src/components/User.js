import React from "react";
import Axios from "axios";

import EditModal from "./EditModal";

const User = ({ sno, userId, username, email, address }) => {
    const deleteUserHandler = () => {
        Axios.get(`http://localhost:3001/deleteUser/${userId}`);
    };

    return (
        <div>
            <EditModal userId={userId} />
            <div className="userDetails">
                <h5 className="sno">{sno})</h5>
                <h5>{username}</h5>
                <h5>{email}</h5>
                <h5>{address}</h5>
                <div className="ActionButtons">
                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className="btn btn-sm btn-primary mx-2"
                    >
                        <i className="fas fa-user-edit"></i>
                    </button>
                    <button onClick={deleteUserHandler} className="btn btn-sm btn-danger">
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default User;
