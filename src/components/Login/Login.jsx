



// import axios from 'axios';
// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { FallingLines } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
// import { jwtDecode } from 'jwt-decode';
// import { API_BASE_URL } from '../../config';
// import { AuthContext } from '../../context/authContext';

export default function Login() {
  // const { setToken } = useContext(AuthContext);
  // const [eerMsg, setEerMsg] = useState(null);
  // const [success, setSuccess] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  // let user = {
  //   email: "",
  //   password: ""
  // }

  // async function loginUser(values) {
  //   setEerMsg(null);
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.post(`${API_BASE_URL}/api/Account/login`, values);
  //     if (data && data.token) {
  //       const decodedToken = jwtDecode(data.token);
  //       if (decodedToken.IsAdmin === "false") {
  //         localStorage.setItem('tkn', data.token);
  //         setToken(data.token);
  //         setSuccess("Welcome Back User");
  //         setTimeout(function () {
  //           navigate("/home");
  //         }, 1000);
  //       } else {
  //         setEerMsg("You are not authorized to access this portal");
  //       }
  //     }
  //   } catch (err) {
  //     if (err.response && err.response.status === 401 && err.response.data.message === "UnAuthorize") {
  //       setEerMsg("Invalid email or password");
  //     } else {
  //       console.error("Error:", err);
  //     }
  //   }
  //   setIsLoading(false);
  // }

  // const formikObj = useFormik({
  //   initialValues: user,
  //   onSubmit: loginUser,
  //   validate: function (values) {
  //     setEerMsg(null);
  //     const errors = {};

  //     if (!values.email || !values.email.includes("@") || !values.email.includes(".")) {
  //       errors.email = "Invalid email";
  //     }
  //     if (!values.password || values.password.length < 6 || values.password.length > 20) {
  //       errors.password = "Password must have Lowercase , Uppercase , Sepical character and Numbers";
  //     }
  //     return errors;
  //   }
  // });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
     
    </>
  );
}
