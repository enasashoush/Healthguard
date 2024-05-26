import { Helmet } from 'react-helmet';
import './book.css'
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Puff } from 'react-loader-spinner';

// import { FallingLines } from 'react-loader-spinner';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/authContext';
// import { useState } from 'react';

export default function NurseBooking() {
    // const [isLoading, setIsLoading] = useState(false)

    // setIsLoading(true)

    // const { userInfo } = useContext(AuthContext);

    // // Access the user information as needed
    // // For example:
    // const userName = userInfo ? userInfo.name : "";

    const {id}= useParams()

    
    
    const getNurseReservation = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}}/api/Nurse/booking-info/${id}`);
            console.log("respone", response);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Error fetching data');
        }
    };

    const { isLoading, data } = useQuery('nurseReservation', getNurseReservation)



    if (isLoading) {
        return <div className="vh-100 d-flex justify-content-center align-items-center">
            <Puff
                visible={true}
                height="80"
                width="80"
                color="#0F969C"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }
    return <>

        <Helmet>
            <title>Nurse Resirvation</title>
        </Helmet>

        <style>{`
        body {
          background:linear-gradient(to top, #072E33, #009578) 
        }
      `}</style>

        <div className='container d-flex justify-content-around m-5 gap-4'>
        {data?.map(function (nurse, idx) {

            return <div key={idx} className='doctor-cards'>
            {/* we will add nurse name variable instead of static */}
            <h6 className='text-muted'><i class=" logo fa-regular fa-envelope"></i> We notified Nurse: {nurse.nurseName} of your booking</h6>
            {/* we will add price fees variable */}
            <h6 className='text-muted my-4'><i class="logo fa-solid fa-money-bill-wave"></i> Examination Fees: 200 EGP</h6>
            <h6 className='text-muted'><i class="logo fa-regular fa-calendar-days"></i> Booking details</h6>
            <div className='container-fluid mt-4'>
                <div className="d-flex justify-content-between">
                    <h6 className='text-main'>Patient name</h6>
                    {/* we will add Patient name as variable */}
                    <p className="text-muted">Patient name</p>
                </div>
                <div className="col-12 border border-1 border-gray mb-2 "></div>

                <div className="d-flex justify-content-between">
                    <h6 className='text-main'>Booking date</h6>
                    {/* we will add Booking date as variable */}
                    <p className="text-muted">Booking date</p>
                </div>
                <div className="col-12 border border-1 border-gray mb-2 "></div>

                <div className="d-flex justify-content-between">
                    <h6 className='text-main'>Nurse Name</h6>
                    {/* we will add Nurse Name as variable */}
                    <p className="text-muted">Nurse Name</p>
                </div>
                <div className="col-12 border border-1 border-gray mb-2 "></div>

                <div className="d-flex justify-content-between">
                    <h6 className='text-main'>Phone number</h6>
                    {/* we will add Phone number as variable */}
                    <p className="text-muted">Phone number</p>
                </div>
                <div className="col-12 border border-1 border-gray mb-2 "></div>

                <div className="d-flex justify-content-between">
                    <h6 className='text-main'> address</h6>
                    {/* we will add  address as variable */}
                    <p className="text-muted"> address</p>
                </div>
                <div className="col-12 border border-1 border-gray mb-2 "></div>


                <div className="d-flex justify-content-center">
                    <button className="btn btn-success" type="submit">
                        My Resirvation
                    </button>
                </div>
            </div>

        </div>

        })}



            <div className="doctor-cards">
                <h3 className="text-muted">
                    Notes for the nurse <span className="fs-6">(optional)</span>
                </h3>
                {/* change enas ashraf to be variable */}
                <p className="text-muted">
                    Let Nurse: enas ashraf know a little about yourself and your health problem
                </p>
                <div className="d-flex justify-content-around">
                    <div>
                        <label htmlFor="" className="mb-2">
                            Age:
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="patient age"
                            className="form-control mb-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="mb-2">
                            Gender:
                        </label> <br />
                        <input type="radio" name="gender" value="M" />
                        <label className="text-muted me-4   ">male</label>
                        <input type="radio" name="gender" value="f" />
                        <label className="text-muted">female</label>
                    </div>
                </div>

                <div className='ms-5' >
                    <label htmlFor="" >Symptoms:</label>
                    <br />
                    <textarea
                        type="text"
                        id="name"
                        placeholder="write about his health situation"
                        className="form-control mb-3 "
                    />
                </div>

                {/* disabled={formikObj.isValid === false || formikObj.dirty === false} */}
                {/* {isLoading ? (
    <FallingLines
      color="#072E33"
      width="50"
      visible={true}
      ariaLabel="falling-lines-loading"
    />
  ) : (
    'send to the nurse'
  )} */}
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success" type="submit">
                        send to the nurse
                    </button>
                </div>
            </div>
        </div>


    </>
}