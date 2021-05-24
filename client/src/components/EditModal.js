import React, { useState } from "react";
import Axios from "axios";

const EditModal = ({ userId }) => {
    const [editUsername, setEditUsername] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAddress, setEditAddress] = useState("");

    const editUsernameHandler = (e) => {
        setEditUsername(e.target.value);
    };
    const editEmailHandler = (e) => {
        setEditEmail(e.target.value);
    };
    const editAddressHandler = (e) => {
        setEditAddress(e.target.value);
    };

    const submitHandler = () => {
        if (!editUsername || !editEmail || !editAddress) {
            alert("All fields are required");
        } else {
            Axios.post(`http://localhost:3001/editUser/${userId}`, {
                username: editUsername,
                email: editEmail,
                address: editAddress,
            }).then((response) => {
                console.log(response);
            });

            setEditUsername("");
            setEditEmail("");
            setEditAddress("");
            // alert("Details Edited Successfully");
        }
    };
    return (
        <div>
            <div
                className="modal fade"
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit Details
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* <h1 className="title">Edit Form</h1> */}
                                <div className="form-content">
                                    <div className="userDetail">
                                        <div className="mb-3">
                                            <label htmlFor="InputUsername" className="form-label">
                                                Username
                                            </label>
                                            <input
                                                value={editUsername}
                                                onChange={editUsernameHandler}
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
                                                value={editEmail}
                                                onChange={editEmailHandler}
                                                className="form-control"
                                                id="InputEmail1"
                                                aria-describedby="emailHelp"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="FormControlTextarea1"
                                            className="form-label"
                                        >
                                            Address
                                        </label>
                                        <textarea
                                            value={editAddress}
                                            onChange={editAddressHandler}
                                            className="form-control"
                                            id="FormControlTextarea1"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={submitHandler}
                                type="button"
                                className="btn btn-primary"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
