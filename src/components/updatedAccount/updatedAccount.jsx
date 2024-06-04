import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export default function UpdateAccount() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const initialValues = {
        displayName: '',
        phoneNumber: '',
        newPassword: '',
        confirmPassword: ''
    };

    async function updateAccount(values) {
        setErrorMsg(null);
        setIsLoading(true);
        try {
            const { data } = await axios.put(`${API_BASE_URL}/api/Account/updateAccount`, {
                displayName: values.displayName,
                phoneNumber: values.phoneNumber,
                newPassword: values.newPassword
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
            });

            if (data.token) {
                localStorage.setItem('tkn', data.token);
                setSuccessMsg('Profile updated successfully!');
                setToken(data.token);

            }
            navigate("/account");
        } catch (err) {
            setErrorMsg(err.response.data.message || 'An error occurred');
        }
        setIsLoading(false);
    }

    const formikObj = useFormik({
        initialValues,
        onSubmit: updateAccount,
        validate: values => {
            setErrorMsg(null);
            const errors = {};

            if (!values.newPassword) {
                errors.newPassword = 'New password is required';
            } else if (values.newPassword.length < 6 || values.newPassword.length > 12) {
                errors.newPassword = 'Password must be between 6 and 12 characters';
            }

            if (!values.confirmPassword || values.confirmPassword !== values.newPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }

            return errors;
        }
    });

    return (
        <>
            <Helmet>
                <title>Update Profile</title>
            </Helmet>
            <style>{`
                body {
                    background: linear-gradient(to top, #072E33, #009578); 
                    margin: 0;
                    padding: 0; 
                }

                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .profile-form {
                    background-color: #fff;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }

                .profile-input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                .btn {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    background-color: #009578;
                    color: #fff;
                    cursor: pointer;
                }
            `}</style>
            <div className="container mt-5 pt-5" >
                <div className="login-form profile-form" style={{
                    borderColor: 'rgb(34, 33, 33)',
                    boxShadow: '1px 1px 30px 1px rgb(34, 33, 33)',
                    background: 'linear-gradient(to top, #072E33, #009578)'
                }}>
                    <h2 className="text-center">Update Profile</h2>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}
                    <form onSubmit={formikObj.handleSubmit}>
                        <input
                            onBlur={formikObj.handleBlur}
                            value={formikObj.values.displayName}
                            onChange={formikObj.handleChange}
                            id="displayName"
                            type="text"
                            placeholder="Enter display name"
                            className="profile-input login-inputt"
                        />
                        <input
                            onBlur={formikObj.handleBlur}
                            value={formikObj.values.phoneNumber}
                            onChange={formikObj.handleChange}
                            id="phoneNumber"
                            type="tel"
                            placeholder="Enter phone number"
                            className="profile-input login-inputt"
                        />
                        <input
                            onBlur={formikObj.handleBlur}
                            value={formikObj.values.newPassword}
                            onChange={formikObj.handleChange}
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            className="profile-input login-inputt"
                        />
                        <input
                            onBlur={formikObj.handleBlur}
                            value={formikObj.values.confirmPassword}
                            onChange={formikObj.handleChange}
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            className="profile-input login-inputt"
                        />
                        {formikObj.errors.newPassword && formikObj.touched.newPassword && (
                            <div className="alert alert-danger">{formikObj.errors.newPassword}</div>
                        )}
                        {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword && (
                            <div className="alert alert-danger">{formikObj.errors.confirmPassword}</div>
                        )}
                        <button
                            disabled={!formikObj.dirty || !formikObj.isValid || isLoading}
                            type='submit'
                            className='btn btn-dark'
                        >
                            {isLoading ? (
                                <FallingLines
                                    color="#072E33"
                                    width="50"
                                    visible={true}
                                    ariaLabel='falling-lines-loading'
                                />
                            ) : 'Update'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
