import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
    const [eerMsg, setEerMsg] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    let user = {
        newPassword: "",
        confirmPassword: ""
    };

    async function resetPassword(values) {
        setEerMsg(null);
        setIsLoading(true);
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/reset-password", values);
            if (data.message === "success") {
                setSuccess("Password reset successfully!");
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

            if (!values.newPassword) {
                errors.newPassword = "New password is required";
            } else if (values.newPassword.length < 6 || values.newPassword.length > 12) {
                errors.newPassword = "Password must be between 6 and 12 characters";
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = "Please confirm your new password";
            } else if (values.newPassword !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
            }

            return errors;
        }
    });

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
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
                            <h2 className='text-center'>Reset Password</h2>
                            <form onSubmit={formikObj.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor='newPassword'>New Password:</label>
                                    <input
                                        onBlur={formikObj.handleBlur}
                                        value={formikObj.values.newPassword}
                                        onChange={formikObj.handleChange}
                                        id='newPassword'
                                        type='password'
                                        placeholder='Enter new password'
                                        className='form-control mb-3 login-inputt'
                                    />
                                    {formikObj.errors.newPassword && formikObj.touched.newPassword ? <div className='alert alert-danger'>{formikObj.errors.newPassword}</div> : ''}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='confirmPassword'>Confirm New Password:</label>
                                    <input
                                        onBlur={formikObj.handleBlur}
                                        value={formikObj.values.confirmPassword}
                                        onChange={formikObj.handleChange}
                                        id='confirmPassword'
                                        type='password'
                                        placeholder='Confirm new password'
                                        className='form-control mb-3 login-inputt'
                                    />
                                    {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword ? <div className='alert alert-danger'>{formikObj.errors.confirmPassword}</div> : ''}
                                </div>
                                <button
                                    disabled={formikObj.isValid === false || formikObj.dirty === false}
                                    type="submit"
                                    className="btn btn-dark"
                                >
                                    {isLoading ? 'Resetting Password...' : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

