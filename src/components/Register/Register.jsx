import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function Register() {
  const [eerMsg, setEerMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState('');

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  let user = {
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
    rePassword: "",
    areas: ""
  }

  const areas = ['Cairo', 'Port Said', 'Alexandria'];

  async function sendData(values) {
    setEerMsg(null);
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/Account/register`, values);
      if (data ) {
        setSuccess("Account has been created");
        setTimeout(function () { 
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      if (err.response.status === 400 && err.response.data.errors) {
        setEerMsg(err.response.data.errors[0]); 
      } else {
        console.error("Error:", err);
      }
    }
    setIsLoading(false);
  }

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: sendData,
    validate: function (values) {
      setEerMsg(null);
      const errors = {};
      
      // Validate displayName
      if (!values.displayName || values.displayName.length < 4 || values.displayName.length > 10) {
        errors.displayName = "Name must be between 4 and 10 characters";
      }

      // Validate email
      if (!values.email || !values.email.includes("@") || !values.email.includes(".")) {
        errors.email = "Invalid email";
      }

      // Validate phoneNumber
      if (!values.phoneNumber || !values.phoneNumber.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phoneNumber = "Invalid phone number";
      }

      // Validate password
      if (!values.password || values.password.length < 6 || values.password.length > 12) {
        errors.password = "Password must have Lowercase , Uppercase , Sepical character and Numbers";
      }

      // Validate rePassword
      if (!values.rePassword || values.rePassword !== values.password) {
        errors.rePassword = "Passwords do not match";
      }

      return errors;
    }
  });

  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <style>{`
        body {
          background:linear-gradient(to top, #072E33, #009578) 
        }
      `}</style>
      <div className='container my-3'>
        <div className='w-50 mx-auto py-5 px-5'>
          <div className="reg-form">
            <div className="w-75 m-auto py-5 px-5">
              {eerMsg && <div className="alert alert-danger">{eerMsg}</div>}
              {success && <div className="alert alert-info">{success}</div>}
              <h2 className='text-center'>SIGN UP</h2>
              <form onSubmit={formikObj.handleSubmit}>
                <label htmlFor='displayName'>Name :</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.displayName} onChange={formikObj.handleChange} id='displayName' type='text' placeholder='Name' className="form-control reg-pp reg-inputt  mb-3"></input>
                {formikObj.errors.displayName && formikObj.touched.displayName && <div className='alert alert-info'>{formikObj.errors.displayName}</div>}

                <label htmlFor='phoneNumber'>Phone :</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.phoneNumber} onChange={formikObj.handleChange} id='phoneNumber' type='tel' placeholder='Phone' className='reg-pp reg-inputt form-control mb-3'></input>
                {formikObj.errors.phoneNumber && formikObj.touched.phoneNumber && <div className='alert alert-info'>{formikObj.errors.phoneNumber}</div>}

                <label htmlFor='email'>Email :</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange} id='email' type='email' placeholder='Email' className='reg-pp reg-inputt form-control mb-3'></input>
                {formikObj.errors.email && formikObj.touched.email && <div className='alert alert-info'>{formikObj.errors.email}</div>}

                <label htmlFor='password'>Password :</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.password} onChange={formikObj.handleChange} id='password' type='password' placeholder='Password' className='reg-pp reg-inputt form-control mb-3'></input>
                {formikObj.errors.password && formikObj.touched.password && <div className='alert alert-info'>{formikObj.errors.password}</div>}

                <label htmlFor='rePassword'>Confirm Password :</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.rePassword} onChange={formikObj.handleChange} id='rePassword' type='password' placeholder='Confirm password' className='reg-pp reg-inputt form-control mb-3'></input>
                {formikObj.errors.rePassword && formikObj.touched.rePassword && <div className='alert alert-info'>{formikObj.errors.rePassword}</div>}

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
                <button disabled={!formikObj.dirty || !formikObj.isValid || isLoading} type='submit' className='btn btn-dark '>
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
  );
}
