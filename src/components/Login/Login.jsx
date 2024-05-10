import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../context/authContext';

export default function Login() {

  const { setToken } = useContext(AuthContext);
  const [eerMsg, setEerMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  //user array
  let user = {
    email: "",
    password: ""
  }
  //function that hand values and api
  async function loginUser(values) {
    console.log(values)
    setEerMsg(null)
    setIsLoading(true)
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      console.log(data)
      if (data.message === "success") {
        localStorage.setItem('tkn', data.token)
        setToken(data.token)
        setSuccess("Welcome Back")
        setTimeout(function () {
          navigate("/home")

        }, 1000)
      }
    } catch (err) {
      console.log("error", err.response.data.message)
      setEerMsg(err.response.data.message)

    }
    setIsLoading(false)


  }
  //handle form with formik
  const formikObj = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validate: function (values) {
      setEerMsg(null)
      const errors = {};

      if (values.email.includes("@") === false || values.email.includes(".") === false) {
        errors.email = "Email is invalide"
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "password must be at least 6 character at most 12 charactar"
      }
      return errors
    }
  });






  return <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
          height: 100vh; 
        }
      `}</style>
    <div className='container '>
      <div className='  w-50 mx-auto py-5 px-5 '>
        <div className="login-form">
          <div className="w-75 m-auto py-5 ">
            {eerMsg ? <div className="alert alert-danger" >{eerMsg}</div> : ''}
            {success ? <div className="alert alert-info" >{success}</div> : ''}
            <h2 className='text-center'> Login</h2>
            <form onSubmit={formikObj.handleSubmit}>
              
              <label htmlFor='email'>Email :</label>
              <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange} id='email' type='email' placeholder='email' className='form-control login-pp login-inputt  mb-3'></input>
              {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-info'>{formikObj.errors.email}</div> : ''}

              <label htmlFor='password'>Password :</label>
              <input onBlur={formikObj.handleBlur} value={formikObj.values.password} onChange={formikObj.handleChange} id='password' type='password' placeholder='password' className='form-control login-pp login-inputt  mb-3'></input>
              {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-info'>{formikObj.errors.password}</div> : ''}

              <button disabled={formikObj.isValid === false || formikObj.dirty === false} type='submit' className='btn btn-dark'>
                {isLoading ? <FallingLines
                  color="#072E33"
                  width="50"
                  visible={true}
                  ariaLabel='falling-lines-loading'
                /> : 'Login'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}