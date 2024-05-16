import { Helmet } from "react-helmet";
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


export default function BookForm() {

  const [eerMsg, setEerMsg] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [availableTime, setAvailableTime] = useState('');

  const handleAvailableTime = (e) => {
    setAvailableTime(e.target.value);
  };

  let user = {
    name: "",
    email: "",
    availableTime: ""
  }

  const time = ['9:00 AM', '10:00 AM', '11:00 AM'];

  async function sendData(values) {
    console.log(values)
    setEerMsg(null)
    setIsLoading(true)

    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      if (data.message === "success") {
        setSuccess("Nurse Booked Successfully")
        setTimeout(function () {
          navigate("/nurseBooking")

        }, 1000)
      }
    } catch (err) {
      console.log("error", err.response.data.message)
      setEerMsg(err.response.data.message)

    }
    setIsLoading(false)


  }

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
      return errors
    }
  });


  return <>

    <Helmet>
      <title>Book Form</title>
    </Helmet>
    <style>{`
        body {
          background:linear-gradient(to top, #072E33, #009578) 
        }
      `}</style>

    <div class="container" style={{ marginTop: "80px" }}>
      <form className="w-75 mx-auto py-5 px-5" onSubmit={formikObj.handleSubmit}>
        {eerMsg ? <div className="alert alert-danger" >{eerMsg}</div> : ''}
        {success ? <div className="alert alert-info" >{success}</div> : ''}
        <h2 className='text-center logo'> Book Nurse</h2>

        <div class="mb-3">
          <label htmlFor='name'>Name :</label>
          <input onBlur={formikObj.handleBlur} value={formikObj.values.name} onChange={formikObj.handleChange} id='name' type='text' placeholder='name' className="form-control reg-pp reg-inputt  mb-3"></input>
          {formikObj.errors.name && formikObj.touched.name ? <div className='alert alert-info'>{formikObj.errors.name}</div> : ''}
        </div>
        <div class="mb-3">
          <label htmlFor='email'>Email :</label>
          <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange} id='email' type='email' placeholder='email' className='reg-pp reg-inputt form-control mb-3'></input>
          {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-info'>{formikObj.errors.email}</div> : ''}
        </div>
        <div class="mb-3">
          <label htmlFor='address'>Address :</label>
          <textarea onBlur={formikObj.handleBlur} value={formikObj.values.name} onChange={formikObj.handleChange} id='textarea' type='text' placeholder='Address' className="form-control reg-pp reg-inputt  mb-3"></textarea>
          {formikObj.errors.name && formikObj.touched.name ? <div className='alert alert-info'>{formikObj.errors.name}</div> : ''}
        </div>
        <label htmlFor='availableTime'>Available Time:</label>
        <select
          id='availableTime'
          value={availableTime}
          onChange={handleAvailableTime}
          className='reg-select reg-inputt form-control mb-3'
        >
          <option value=''>Select Time</option>
          {time.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
        <div className="d-flex justify-content-around">
          <button disabled={formikObj.isValid === false || formikObj.dirty === false} type='submit' className='btn btn-dark '>
            {isLoading ? <FallingLines
              color="#072E33"
              width="50"
              visible={true}
              ariaLabel='falling-lines-loading'
            /> : 'Book'}
          </button>
          <button type="button" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>

  </>
}