// import React, { useContext } from 'react'
// import  axios  from 'axios';
// import { CartContext } from '../../context/cartContext';
// import { toast } from 'react-hot-toast';
// import { Helmet } from 'react-helmet';
// import { API_BASE_URL } from '../../config';

// export default function Payment(Basketid) {
//   const{cartId,setCartProduct,setTotalCartProduct,setNumOfCartItem}=  useContext(CartContext)
//    async function confirmPayment(deliveryMethodId) {
//     const phoneValue = document.querySelector("#phone").value;
// const cityValue = document.querySelector("#city").value;
// const detailsValue = document.querySelector("#details").value;

// const shippingAddress = {
//     "fName": "", // Include first name if available
//     "lName": "", // Include last name if available
//     "street": detailsValue,
//     "city": cityValue,
//     "country": cityValue // Assuming country is the same as city
// };

// try {
//     const { data } = await axios.post(`${API_BASE_URL}/api/Orders/${Basketid}`, {
//         "deliveryMethodId": deliveryMethodId,
//         "shipToAddress": shippingAddress
//     }, {
//         headers: { "Authorization": `Bearer ${localStorage.getItem("tkn")}` }
//     });

//     if (data.status === "success") {
//         toast.success("Order is Successfully");
//         setCartProduct([]);
//         setNumOfCartItem(0);
//         setTotalCartProduct(0);
//     } else {
//         toast.error("Error occurred");
//     }

//     console.log(data);
//     return data;
// } catch (e) {
//     console.error("Error:", e);
// }

//     }
//     async function confirmOnlinePayment() {
//         const phoneValue=   document.querySelector("#phone").value;
//            const cityValue=document.querySelector("#city").value;
//           const detailsValue= document.querySelector("#details").value;
//           const shippingAddress={
//            "shippingAddress":{
//                "details":detailsValue,
//                "phone":phoneValue,
//                "city":cityValue
//            }
//           }
//           try{
//            const{data}=await axios.post(`${API_BASE_URL}/api/Payments/webhook`,shippingAddress,
//            {
//                headers:{token:localStorage.getItem("tkn")},
//                params:{url:"https://localhost:3000"}
//            })
//             window.open(data.session.url,"_blank");
//           } 
//           catch(e){
//            console.log("error",e)
//           }
//        }
//   return <>
//   <Helmet>
//     <title>Payment</title>
//   </Helmet>
//   <style>{`
//         body {
//           background: linear-gradient(to top, #072E33, #009578); 
//           margin: 0;
//           padding: 0; 
//           color:#77fce1
//         }
//       `}</style>
//   <div className="container pt-5 mt-5">
//     <form>
//         <label htmlFor=''>
//             Phone :
//         </label>
//         <input type='tel' id='phone' placeholder='Phone Number' className='mb-3 form-control login-inputt'>
//         </input>
//         <label htmlFor=''>
//             City :
//         </label>
//         <input type='text' id='city' placeholder='City' className='mb-3 form-control login-inputt'>
//         </input>
//         <label htmlFor=''>
//            Details :
//         </label>
//         <textarea type='text' id='details' placeholder='Details' className='mb-3 form-control login-inputt'>
//         </textarea>
//         <button type='button' onClick={confirmPayment} className='btn btn-dark '>Confirm Cash Payment</button>
//         <button type='button' onClick={confirmOnlinePayment} className='mx-4 btn btn-dark '>Confirm Online Payment</button>
//     </form>
//     </div></>
// }
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { API_BASE_URL } from '../../config';
import { useParams } from 'react-router-dom';

export default function Payment() {
  const { cartId, setCartProduct, setTotalCartProduct, numOfCartItem, setNumOfCartItem } = useContext(CartContext);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');


  useEffect(() => {
    async function fetchDeliveryMethods() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/Orders/DeliveryMethods`);
        setDeliveryMethods(response.data);
        console.log("iio",response);
      } catch (error) {
        console.error('Error fetching delivery methods:', error);
      }
    }
    fetchDeliveryMethods();
  }, []);

  async function confirmPayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;
    const fName = document.querySelector("#f-name").value;
    const lName = document.querySelector("#l-name").value;
    const streetValue = document.querySelector("#street-address").value;
  
    // const [fName, lName] = fullNameValue.split(' ');
  
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
      }
      console.log(data);
      return data;
    } catch (e) {
      console.error("Error:", e);
      toast.error("There are no items in the  cart");
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
          <button type="button" onClick={confirmPayment} className="btn btn-dark">Confirm Cash Payment</button>
          <button type="button" className="mx-4 btn btn-dark">Confirm Online Payment</button>
        </form>
      </div>
    </>
  );
}
