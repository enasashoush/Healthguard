import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [eerMsg, setEerMsg] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [selectedArea, setSelectedArea] = useState('');
  //to can select area 
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };
  //user array
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
    areas: ""
  }
  // List of areas
  const areas = ['Cairo', 'Port Said', 'Alexandria'];
  // funcation taht send data and api 
  async function sendData(values) {
    console.log(values)
    setEerMsg(null)
    setIsLoading(true)
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      console.log(data)
      if (data.message === "success") {
        setSuccess("Account has been created")
        setTimeout(function () {
          navigate("/login")
        }, 1000)
      }
    } catch (err) {
      console.log("error", err.response.data.message)
      setEerMsg(err.response.data.message)

    }
    setIsLoading(false)


  }

  // handel form with formik
  const formikObj = useFormik({
    initialValues: user,
    onSubmit: sendData,
    validate: function (values) {
      setEerMsg(null)
      const errors = {};
      if (values.name.length < 4 || values.name.length > 10) {
        errors.name = "Name must be at least 4 character at most 10 charactar"
      }
      if (values.email.includes("@") === false || values.email.includes(".") === false) {
        errors.email = "Email is invalide"
      }
      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phone = "phone is invalide"
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "password must be at least 6 character at most 12 charactar"
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "Confirm Password not match with Password"
      }
      return errors
    }
  });






  return <>
    <Helmet>
      <title>Registration</title>
    </Helmet>
    <style>{`
        body {
          background:linear-gradient(to top, #072E33, #009578) 
        }
      `}</style>
    <div className='container my-3'>
      <div className='  w-50 mx-auto py-5 px-5 '>
        <div className="reg-form">
          <div className="w-75 m-auto py-5 px-5}">
            {eerMsg ? <div className="alert alert-danger" >{eerMsg}</div> : ''}
            {success ? <div className="alert alert-info" >{success}</div> : ''}
            <h2 className='text-center'> SIGN UP</h2>
            <form onSubmit={formikObj.handleSubmit}>
              <label htmlFor='name'>Name :</label>
              <input onBlur={formikObj.handleBlur} value={formikObj.values.name} onChange={formikObj.handleChange} id='name' type='text' placeholder='name' className="form-control reg-pp reg-inputt  mb-3"></input>
              {formikObj.errors.name && formikObj.touched.name ? <div className='alert alert-info'>{formikObj.errors.name}</div> : ''}

              <label htmlFor='phone'>Phone :</label>
              <input onBlur={formikObj.handleBlur} value={formikObj.values.phone} onChange={formikObj.handleChange} id='phone' type='tel' placeholder='phone' className='reg-pp reg-inputt form-control mb-3'></input>
              {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-info'>{formikObj.errors.phone}</div> : ''}


              <label htmlFor='email'>Email :</label>
              <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange} id='email' type='email' placeholder='email' className='reg-pp reg-inputt form-control mb-3'></input>
              {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-info'>{formikObj.errors.email}</div> : ''}

              <label htmlFor='password'>Password :</label>
              <input onBlur={formikObj.handleBlur} value={formikObj.values.password} onChange={formikObj.handleChange} id='password' type='password' placeholder='password' className='reg-pp reg-inputt form-control mb-3'></input>
              {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-info'>{formikObj.errors.password}</div> : ''}

              <label htmlFor='rePassword'>Confirm Password :</label>
              <input onBlur={formikObj.handleBlur} value={formikObj.values.rePassword} onChange={formikObj.handleChange} id='rePassword' type='password' placeholder='confirm password' className='reg-pp reg-inputt form-control mb-3'></input>
              {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className='alert alert-info'>{formikObj.errors.rePassword}</div> : ''}

              <label htmlFor='area'>Area:</label>
              <select
                id='area'
                value={selectedArea}
                onChange={handleAreaChange}
                className='reg-select reg-inputt form-control mb-3'
              >
                <option value=''>Select Area</option>
                {areas.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <button disabled={formikObj.isValid === false || formikObj.dirty === false} type='submit' className='btn btn-dark '>
                {isLoading ? <FallingLines
                  color="#072E33"
                  width="50"
                  visible={true}
                  ariaLabel='falling-lines-loading'
                /> : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}
