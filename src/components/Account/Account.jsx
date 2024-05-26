import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaEdit, FaPlus, FaShoppingBag, FaCalendar } from 'react-icons/fa';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import avatar from '../../image/avatar.jpeg'; // Import the default image
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import { useQuery } from 'react-query';

const Profile = () => {
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const decoded = jwtDecode(localStorage.getItem("tkn"));
        console.log(decoded);
        setName(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
        setPhone(decoded.phoneNumber);
        setEmail(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
    }, []);

    async function fetchLatestOrder() {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/Orders/user-orders`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
            });
            // Assuming data is an array of orders, sort by date and get the latest one
            const latestOrder = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))[0];
            return latestOrder;
        } catch (error) {
            console.log("error", error);
            return null;
        }
    }

    const { isLoading, data: latestOrder } = useQuery('userOrder', fetchLatestOrder);

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
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="row">
                    {/* Personal Info */}
                    <div className="col-md-4">
                        <div className="card position-relative">
                            <div className="card-body text-center p-5" style={{ height: "400px" }}>
                                <Link to="/updatedUser">
                                    <FaEdit size={20} className="position-absolute top-0 end-0 m-2" style={{ color: '#0F969C' }} />
                                </Link>
                                <img src={avatar} alt="Profile" className="img-fluid rounded-circle mb-3" />
                                <h4 className="card-title text-main">{name}</h4>
                                <p className="card-text">{email}</p>
                                <p className="card-text">{phone}</p>
                            </div>
                        </div>
                    </div>
                    {/* Other Divs */}
                    <div className="col-md-8">
                        {/* My Orders */}
                        <div className="card mb-4">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <Link to="/allOrders">
                                        <FaShoppingBag size={20} className="position-absolute top-0 end-0 m-2" style={{ color: '#0F969C' }} />
                                    </Link>
                                    <h4 className="card-title mb-4 text-center fw-bold logo">My Orders</h4>
                                    {latestOrder ? (
                                        <>
                                            <p><span className="fs-4">Product Name:</span> {latestOrder.items && latestOrder.items.length > 0 ? latestOrder.items[0].productName : 'N/A'}</p>
                                            <p><span className="fs-4">Address Of Order:</span> {latestOrder.shippingAddress ? latestOrder.shippingAddress.street : 'N/A'}</p>
                                            <p><span className="fs-4">Total Count:</span> {latestOrder.items ? latestOrder.items.reduce((total, item) => total + item.quantity, 0) : 0}</p>
                                            <p><span className="fs-4">Total Order:</span> ${latestOrder.totalOrderPrice || 0}</p>
                                            <p><span className="fs-4">Day of Order:</span> {latestOrder.orderDate ? new Date(latestOrder.orderDate).toLocaleDateString() : 'N/A'}</p>
                                        </>
                                    ) : (
                                        <p>No orders found.</p>
                                    )}

                                </div>
                                {latestOrder && latestOrder.items && latestOrder.items.length > 0 && latestOrder.items[0].pictureUrl ? (
                                    <img src={latestOrder.items[0].pictureUrl} alt="Order Image" className="img-fluid rounded-circle" style={{ width: '100px', height: '100px' }} />
                                ) : (
                                    <img src={avatar} alt="Default Image" className="img-fluid rounded-circle" style={{ width: '100px', height: '100px' }} />
                                )}
                            </div>
                        </div>
                        {/* Nurse Reservations */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <Link to="/allReservation">
                                    <FaCalendar size={20} className="position-absolute top-0 end-0 m-2" style={{ color: '#0F969C' }} />
                                </Link>
                                <h4 className="card-title mb-4 text-center fw-bold logo">Nurse Reservations </h4>
                                <p><span className="fs-4">Nurse Name:</span> Example Nurse</p>
                                <p><span className="fs-4">Appointment Address:</span> Example Address</p>
                                <p><span className="fs-4">Price of Visit:</span> $50.00</p>
                                <p><span className="fs-4">Day of Visit:</span> MM/DD/YYYY</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
