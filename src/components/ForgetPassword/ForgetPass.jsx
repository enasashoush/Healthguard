import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../context/authContext';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgetPassword() {
    const { setToken } = useContext(AuthContext);
    const [eerMsg, setEerMsg] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    let user = {
        email: "",
    };

    async function resetPassword(values) {
        setEerMsg(null);
        setIsLoading(true);
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/reset-password", values);
            if (data.message === "success") {
                setSuccess("Password reset email sent successfully!");
                navigate("/resetPassword")
            }
        } catch (err) {
            setEerMsg(err.response.data.message);
        }
        setIsLoading(false);
    }

    const formikObj = useFormik({
        initialValues: user,
        onSubmit: resetPassword,
        validate: function (values) {
            setEerMsg(null);
            const errors = {};

            if (values.email.includes("@") === false || values.email.includes(".") === false) {
                errors.email = "Invalid email format";
            }

            return errors;
        }
    });

    return (
        <>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
            <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>
            <div className="container mt-5">
                <div className="w-50 mx-auto p-5">
                    <div className="login-form">
                        <div className="w-75 m-auto py-5">
                            {eerMsg ? <div className="alert alert-danger">{eerMsg}</div> : ''}
                            {success ? <div className="alert alert-success">{success}</div> : ''}
                            <h2 className='text-center'>Forgot Password</h2>
                            <form onSubmit={formikObj.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor='email'>Email:</label>
                                    <div className="input-group">
                                        <input
                                            onBlur={formikObj.handleBlur}
                                            value={formikObj.values.email}
                                            onChange={formikObj.handleChange}
                                            id='email'
                                            type='email'
                                            placeholder='Enter your email'
                                            className='form-control mb-3 login-inputt'
                                        />
                                    </div>
                                    {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email}</div> : ''}
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        disabled={formikObj.isValid === false || formikObj.dirty === false}
                                        type="submit"
                                        className="btn btn-dark"
                                    >
                                        {isLoading ? (
                                            <FallingLines color="#072E33" width="50" visible={true} ariaLabel="falling-lines-loading" />
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </button>
                                    <div className="text-center">
                                        <Link to="/login" style={{ color: '#77fce1', textDecoration: 'none' }}>Back to Login</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
