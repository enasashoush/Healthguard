import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Puff } from 'react-loader-spinner';
import { API_BASE_URL } from '../../config';
import { useQuery } from 'react-query';

export default function AllOrders() {
    async function allUserOrder() {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/Orders/user-orders`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
            });
            console.log("API response data:", data);
            return data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            return [];
        }
    }

    const { isLoading, data, error } = useQuery('userOrder', allUserOrder);

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

    return (
        <>
            <Helmet>
                <title>All Orders</title>
            </Helmet>
            <style>{`
                body {
                    background: linear-gradient(to top, #072E33, #009578); 
                    margin: 0;
                    padding: 0; 
                    font-family: Arial, sans-serif;
                    color: #fff;
                }
                .order-container {
                    background: white;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 20px;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
                }
                .order-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 5px;
                }
                .order-info {
                    margin-top: 10px;
                }
                .order-info h3 {
                    margin-bottom: 5px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #8dc73f;
                }
                .order-info h5 {
                    margin-bottom: 5px;
                    font-size: 14px;
                    color: #8dc73f;
                }
                .order {
                    font-size: 16px;
                    color: #8dc73f;
                }
            `}</style>
            <div className="container mt-5 pt-5">
                <div className="row g-4">
                    {data.map((order, idx) => (
                        <div key={idx} className="col-md-6">
                            <div className="order-container rounded-3 p-3">
                                <div className="container">
                                    <div className="row">
                                        {order.items?.map((item, indx) => (
                                            <div key={indx} className="col-md-4">
                                                <div className="my-2">
                                                    <img src={item.pictureUrl} alt="Product" className="order-image" />
                                                    <div className="order-info">
                                                        <h3>{item.productName.split(" ").slice(0, 2).join(" ")}</h3>
                                                        <h5>Count: {item.quantity}</h5>
                                                        <h5>Price: {item.price}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className='order'>Order with name {order.shippingAddress.fName} {order.shippingAddress.lName} and with details {order.shippingAddress.street} at {order.shippingAddress.city}</p>
                                <div className="order-info">
                                    <h5>Delivery Method: {order.deliveryMethod}</h5>
                                    <h5>Total Order Price: {order.total}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
