import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const { cartId, setCartProduct, setTotalCartProduct, setNumOfCartItem } = useContext(CartContext);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');


  useEffect(() => {
    async function fetchDeliveryMethods() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/Orders/DeliveryMethods`);
        setDeliveryMethods(response.data);
      } catch (error) {
        console.error('Error fetching delivery methods:', error);
      }
    }
    fetchDeliveryMethods();
  }, []);


  const navigate = useNavigate();

async function confirmPayment() {
  const cityValue = document.querySelector("#city").value;
  const fName = document.querySelector("#f-name").value;
  const lName = document.querySelector("#l-name").value;
  const streetValue = document.querySelector("#street-address").value;

  const shippingAddress = {
    fName: fName,
    lName: lName,
    street: streetValue,
    city: cityValue
  };

  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/Orders/${cartId}`, {
      deliveryMethodId: selectedDeliveryMethod,
      shipToAddress: shippingAddress
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
    });
    if (data) {
      toast.success("Order is Successfully");
      setCartProduct([]);
      setNumOfCartItem(0);
      setTotalCartProduct(0);
      navigate('/home');
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    toast.error("Please, Fill The Form Data");
  }
}


  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
          color:#77fce1
        }
      `}</style>
      <div className="container pt-5 mt-5">
        <form>
          <div className="form-group">
            <label htmlFor="delivery-method">Delivery Method:</label>
            <select
              id="delivery-method"
              className="form-control mb-3 login-inputt"
              value={selectedDeliveryMethod}
              onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
            >
              <option value="">Select a delivery method</option>
              {deliveryMethods.map(method => (
                <option key={method.id} value={method.id}>
                  {method.shortName} - {method.description} - ${method.cost} - {method.deliveryTime}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="f-name">First Name:</label>
            <input type="text" id="f-name" placeholder="Full Name" className="form-control mb-3 login-inputt" />
          </div>
          <div className="form-group">
            <label htmlFor="l-name">last Name:</label>
            <input type="text" id="l-name" placeholder="Full Name" className="form-control mb-3 login-inputt" />
          </div>
          <div className="form-group">
            <label htmlFor="street-address">Street Address:</label>
            <input type="text" id="street-address" placeholder="Street Address" className="form-control mb-3 login-inputt" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" placeholder="Phone Number" className="form-control mb-3 login-inputt" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" placeholder="City" className="form-control mb-3 login-inputt" />
          </div>
          <div className="form-group">
            <label htmlFor="details">Details:</label>
            <textarea id="details" placeholder="Details" className="form-control mb-3 login-inputt"></textarea>
          </div>
          <button type="button" onClick={confirmPayment} className="btn btn-dark">Confirm Order</button>
        </form>
      </div>
    </>
  );
}
