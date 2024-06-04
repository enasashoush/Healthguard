import axios from "axios";
import { API_BASE_URL } from "../../config";
import { QueryClient, useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Puff } from "react-loader-spinner";
import "../NusreBooking/book.css";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function AllReservation() {
    const navigate = useNavigate();

    async function allUserReservation() {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/Nurse/my-appointments`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
            });
            return data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            return [];
        }
    }

    async function deleteReservation(appointmentId) {
        try {
            const { data } = await axios.delete(`${API_BASE_URL}/api/Nurse/cancel-appointment/${appointmentId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
            });
            toast.success("Your Reservation Deleted Successfully ");
            navigate("/account")

            await QueryClient.refetchQueries('userReservation');
            return data;
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    }

    const { isLoading, data, error } = useQuery('userReservation', allUserReservation);

    if (isLoading) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <Puff
                    visible={true}
                    height={80}
                    width={80}
                    color="#0F969C"
                    ariaLabel="puff-loading"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <p>Error loading orders</p>
            </div>
        );
    }

    if (!Array.isArray(data)) {
        console.error("Expected data to be an array, but got:", data);
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <p>Unexpected data format</p>
            </div>
        );
    }

    if (data.length === 0) { 
        return (
            <>
                <Helmet>
                    <title>No Reservations</title>
                </Helmet>
                <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
          height: 100vh; 
        }
      `}</style>
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center text-white">
                                <p className="lead">There is no reservation Found .</p>
                                <button onClick={() => navigate('/nursing')} className="btn btn-outline-light mt-3">Go to Nurse Page</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
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

        <div className='d-flex justify-content-around m-5 row gap-1 '>
            {data?.map(function (nurse, idx) {
                return (
                    <div key={idx} className='doctor-cards col-lg-5 '>
                        <h6 className='text-muted'><i class=" logo fa-regular fa-envelope"></i> We notified Nurse: {nurse.nurseName} of your booking</h6>
                        <h6 className='text-muted my-4'><i class="logo fa-solid fa-money-bill-wave"></i> Examination Fees: {nurse.nurseFees}</h6>
                        <h6 className='text-muted'><i class="logo fa-regular fa-calendar-days"></i> Booking details</h6>
                        <div className='container-fluid mt-4'>
                            <div className="d-flex justify-content-between">
                                <h6 className='text-main'>Patient name</h6>
                                <p className="text-muted">{nurse.patientName}</p>
                            </div>
                            <div className="col-12 border border-1 border-gray mb-2 "></div>
                            <div className="d-flex justify-content-between">
                                <h6 className='text-main'>Booking date</h6>
                                <p className="text-muted">{nurse.bookingDate}</p>
                            </div>
                            <div className="col-12 border border-1 border-gray mb-2 "></div>
                            <div className="d-flex justify-content-between">
                                <h6 className='text-main'>Nurse Name</h6>
                                <p className="text-muted">{nurse.nurseName}</p>
                            </div>
                            <div className="col-12 border border-1 border-gray mb-2 "></div>
                            <div className="d-flex justify-content-between">
                                <h6 className='text-main'> address</h6>
                                <p className="text-muted"> {nurse.streetAddress}</p>
                            </div>
                            <div className="col-12 border border-1 border-gray mb-2 "></div>
                            <div className="d-flex justify-content-center">
                                <button onClick={() => deleteReservation(nurse.appointmentId)} className="btn btn-success" type="submit">
                                    Cancel Reservation
                                </button>

                            </div>

                        </div>

                    </div>

                )
            })}
        </div>
    </>
}

