import { Helmet } from "react-helmet";
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

export default function BookForm() {
  const [errMsg, setErrMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const cityOptions = ['Cairo', 'Alexandria', 'Port Said'];

  async function bookNurse(values) {
    setErrMsg(null);
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/Nurse/book-appointment/${id}`,
        values,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
        });
      if (data && data.message) {
        setSuccess(data.message);
        setTimeout(() => {
          navigate("/nurseBooking");
        }, 1000);
      }
      console.log("response", data);
      return data;
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.errors) {
        setErrMsg(err.response.data.errors[0]);
      } else {
        console.error("Error:", err);
      }
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      patientName: "",
      street: "",
      city: "",
      startTime: "",
      endTime: ""
    },
    onSubmit: bookNurse,
    validate: values => {
      setErrMsg(null);
      const errors = {};
      if (values.patientName.length < 4 || values.patientName.length > 10) {
        errors.patientName = "Name must be at least 4 characters and at most 10 characters";
      }
      if (values.street.length < 10 || values.street.length > 100) {
        errors.street = "Street must be at least 10 characters and at most 100 characters";
      }
      if (!values.city) {
        errors.city = "City is required";
      }
      if (!values.startTime) {
        errors.startTime = "Start time is required";
      }
      if (!values.endTime) {
        errors.endTime = "End time is required";
      }

      return errors;
    }
  });

  return (
    <>
      <Helmet>
        <title>Book Form</title>
      </Helmet>
      <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578);
        }
      `}</style>

      <div className="container" style={{ marginTop: "80px" }}>
        <form className="w-75 mx-auto py-5 px-5" onSubmit={formik.handleSubmit}>
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}
          {success && <div className="alert alert-info">{success}</div>}
          <h2 className="text-center logo">Book Nurse</h2>

          <div className="mb-3">
            <label htmlFor="patientName">Name:</label>
            <input
              onBlur={formik.handleBlur}
              value={formik.values.patientName}
              onChange={formik.handleChange}
              id="patientName"
              name="patientName"
              type="text"
              placeholder="Name"
              className="form-control reg-pp reg-inputt mb-3"
            />
            {formik.errors.patientName && formik.touched.patientName && <div className="alert alert-info">{formik.errors.patientName}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="street">Street:</label>
            <textarea
              onBlur={formik.handleBlur}
              value={formik.values.street}
              onChange={formik.handleChange}
              id="street"
              name="street"
              placeholder="Street"
              className="form-control reg-pp reg-inputt mb-3"
            />
            {formik.errors.street && formik.touched.street && <div className="alert alert-info">{formik.errors.street}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="city">City:</label>
            <select
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              className="reg-select reg-inputt form-control mb-3"
            >
              <option value="">Select City</option>
              {cityOptions.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {formik.errors.city && formik.touched.city && <div className="alert alert-info">{formik.errors.city}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="startTime">Start Time:</label>
            <input
              onBlur={formik.handleBlur}
              value={formik.values.startTime}
              onChange={formik.handleChange}
              id="startTime"
              name="startTime"
              type="datetime-local"
              className="form-control reg-pp reg-inputt mb-3"
            />
            {formik.errors.startTime && formik.touched.startTime && <div className="alert alert-info">{formik.errors.startTime}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="endTime">End Time:</label>
            <input
              onBlur={formik.handleBlur}
              value={formik.values.endTime}
              onChange={formik.handleChange}
              id="endTime"
              name="endTime"
              type="datetime-local"
              className="form-control reg-pp reg-inputt mb-3"
            />
            {formik.errors.endTime && formik.touched.endTime && <div className="alert alert-info">{formik.errors.endTime}</div>}
          </div>

          <div className="d-flex justify-content-around">
            <button disabled={!formik.isValid || !formik.dirty} type="submit" className="btn btn-primary">
              {isLoading ? (
                <FallingLines color="#072E33" width="50" visible={true} ariaLabel="falling-lines-loading" />
              ) : (
                'Book'
              )}
            </button>
            <button type="button" className="btn btn-danger" onClick={() => navigate('/home')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
