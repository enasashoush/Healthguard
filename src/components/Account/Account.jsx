import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaEdit, FaPlus, FaShoppingBag, FaCalendar } from 'react-icons/fa'; // Import required icons
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Simulating fetching user info from an API
        setTimeout(() => {
            setUserInfo({
                name: "John Doe",
                email: "john@example.com",
                phone: "+1234567890",
                image: "https://via.placeholder.com/150", // Example image URL
                // Additional info can be added here
            });
        }, 1000);
    }, []);

    if (!userInfo) {
        return<div className="vh-100 d-flex justify-content-center align-items-center">
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

    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>
            <div className="container " style={{ marginTop: "100px" }}>
                <div className="row" >
                    {/* Personal Info */}
                    <div className="col-md-4">
                        <div className="card position-relative">
                            <div className="card-body text-center p-5" style={{ height: "400px" }}>
                                <Link to="/updatedUser">
                                <FaEdit size={20}  className="position-absolute top-0 end-0 m-2" style={{ color: '#0F969C' }} />
                                </Link>
                                <img src={userInfo.image} alt="Profile" className="img-fluid rounded-circle mb-3" />
                                <h4 className="card-title text-main">{userInfo.name}</h4>
                                <p className="card-text">{userInfo.email}</p>
                                <p className="card-text">{userInfo.phone}</p>
                            </div>

                        </div>
                    </div>
                    {/* Other Divs */}
                    <div className="col-md-8">
                        {/* Shipping Info */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <Link to="/updateAddress">
                                <FaPlus size={20}  className="position-absolute top-0 end-0 m-2" style={{ color: '#0F969C' }} />
                                </Link>
                                <h4 className="card-title mb-4 fw-bold text-center logo">Shipping Information</h4>
                                {/* Home Address Content */}
                                <p><span className="fs-4">Home Address :</span> Example Address 1</p>
                                {/* Another Address Content */}
                                <p><span className="fs-4">Address #2 :</span> Example Address 2</p>
                            </div>
                        </div>
                        {/* My Orders */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <Link to="/allOrders">
                                <FaShoppingBag size={20} className="position-absolute top-0 end-0 m-2" style={{ color: '#0F969C' }} />
                                </Link>
                                <h4 className="card-title mb-4 text-center fw-bold logo">My Orders</h4>
                                {/* Orders Content */}
                                <p><span className="fs-4">Product Name :</span> Product Name</p>
                                <p><span className="fs-4">Address Of Order :</span> Order Address</p>
                                <p><span className="fs-4">Count & Price :</span> 1 x $10.00</p>
                                <p><span className="fs-4">Total Count :</span> 1</p>
                                <p><span className="fs-4">Total Order :</span> $10.00</p>
                                <p><span className="fs-4">Day of Order :</span> MM/DD/YYYY</p>
                            </div>
                        </div>
                        {/* Nurse Reservations */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <Link to="/allReservation">
                                <FaCalendar size={20}  className="position-absolute top-0 end-0 m-2" style={{ color: '#0F969C' }} />
                                </Link>
                                <h4 className="card-title mb-4 text-center fw-bold logo">Nurse Reservations </h4>
                                {/* Reservations Content */}
                                <p><span className="fs-4">Nurse Name :</span> Example Nurse</p>
                                <p><span className="fs-4">Appointment Address :</span> Example Address</p>
                                <p><span className="fs-4">Price of Visit :</span> $50.00</p>
                                <p><span className="fs-4">Day of Visit :</span> MM/DD/YYYY</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
