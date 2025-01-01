// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
// import { FallingLines } from 'react-loader-spinner';
// import { useNavigate } from 'react-router-dom';
// import { API_BASE_URL } from '../../config';

export default function Register() {
  // const [eerMsg, setEerMsg] = useState(null);
  // const [success, setSuccess] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

 

  // let user = {
  //   displayName: "",
  //   email: "",
  //   phoneNumber: "",
  //   password: "",
  //   rePassword: "",
  //   areas: ""
  // }


  // async function sendData(values) {
  //   setEerMsg(null);
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.post(`${API_BASE_URL}/api/Account/register`, values);
  //     if (data ) {
  //       setSuccess("Account has been created");
  //       setTimeout(function () { 
  //         navigate("/login");
  //       }, 1000);
  //     }
  //   } catch (err) {
  //     if (err.response.status === 400 && err.response.data.errors) {
  //       setEerMsg(err.response.data.errors[0]); 
  //     } else {
  //       console.error("Error:", err);
  //     }
  //   }
  //   setIsLoading(false);
  // }

  // const formikObj = useFormik({
  //   initialValues: user,
  //   onSubmit: sendData,
  //   validate: function (values) {
  //     setEerMsg(null);
  //     const errors = {};
      
  //     // Validate displayName
  //     if (!values.displayName || values.displayName.length < 4 || values.displayName.length > 10) {
  //       errors.displayName = "Name must be between 4 and 10 characters";
  //     }

  //     // Validate email
  //     if (!values.email || !values.email.includes("@") || !values.email.includes(".")) {
  //       errors.email = "Invalid email";
  //     }

  //     // Validate phoneNumber
  //     if (!values.phoneNumber || !values.phoneNumber.match(/^(02)?01[0125][0-9]{8}$/)) {
  //       errors.phoneNumber = "Invalid phone number";
  //     }

  //     // Validate password
  //     if (!values.password || values.password.length < 6 || values.password.length > 20) {
  //       errors.password = "Password must have Lowercase , Uppercase , Sepical character and Numbers";
  //     }

  //     // Validate rePassword
  //     if (!values.rePassword || values.rePassword !== values.password) {
  //       errors.rePassword = "Passwords do not match";
  //     }

  //     return errors;
  //   }
  // });

  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      
    </>
  );
}
