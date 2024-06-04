import React, { useContext } from 'react'
import { CartContext } from '../../context/cartContext'
import { Puff } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {

    const { cartProduct, clearAllProduct, cartId,updateItem, totalCartProduct, numOfCartItem, deleteItem, setCartProduct } = useContext(CartContext)

    //increment element from  cart 
    async function incremunt(itemId, currentQuantity) {
        const count = currentQuantity + 1;
        const res = await updateItem(itemId, count);
        if (res) {
            toast.success("Product count incremented");
        } else {
            toast.error("Error in updating product");
        }
    }
    //decrement element from cart 
    async function decrement(itemId, currentQuantity) {
        const count = currentQuantity - 1;
        if (count === 0) {
            const updatedProducts = cartProduct.filter(item => item.id !== itemId);
            setCartProduct(updatedProducts);
            delElement(itemId);
        } else {
            const res = await updateItem(itemId, count);
            if (res) {
                toast.success("Product count decremented");
            } else {
                toast.error("Error in updating product");
            }
        }
    }




    //delete element from cart 
    async function delElement(itemId) {
        try {
            const res = await deleteItem(itemId);
            if (res) {
                toast.success("Product Deleted");
            } else {
                toast.error("Error in Delete Element");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Error in Delete Element");
        }
    }

    if (cartProduct === null) {
        return <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
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
        </>

    }
    if (cartProduct.length === 0) {
        return <>
            <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>
            <div className="container my-5 bg-grey py-5 ">
                <div className="row p-5 m-5 border bg-white">
                    <h1>No Product In Your Cart Yet, CheckOut Our New Products <Link to="/home" className='text-decoration-none text-main'> Click Here....</Link></h1>
                </div>
            </div>
        </>
    }
    return <>
        <Helmet>
            <title>Cart</title>
        </Helmet>
        <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>
        <div className="container my-5 bg-grey py-5 ">
            <div className="row p-5 m-5 border bg-white">
                <div className="row">
                    <div className='d-flex justify-content-between'>
                        <h1 className='text-main'>Cart Shop</h1>
                        <Link to={`/Payment/${cartId}`} className='btn fs-4 text-white' style={{ backgroundColor: ' #009578' }}>Check Out</Link>

                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <h5>Total price : <span className='logo'>{totalCartProduct}</span></h5>
                        <h5>Total number of items : <span className='logo'>{numOfCartItem}</span></h5>
                    </div>
                </div>
                {cartProduct.map(function (product, idx) {
                    return <div key={idx} className="row align-items-center border-bottom border-3 my-5 pb-3">
                        <div className="col-md-2">
                            <img className='w-100' src={product.picUrl} alt={product.productName} />
                            <img src="" alt="" />

                        </div>
                        <div className="col-md-8">
                            <h3> {product.productName.split(" ").slice(0, 2).join(" ")}</h3>
                            <h3>{product.price}</h3>
                            <button onClick={() => { delElement(product.id) }} className='btn btn-outline-danger '>Remove</button>
                        </div>
                        <div className="col-md-2">
                            <div className="d-flex align-items-center">
                                <button onClick={() => incremunt(product.id, product.quanntity)} className='btn btn-outline-success'>+</button>
                                <span className='mx-2'>{product.quanntity}</span>
                                <button onClick={() => decrement(product.id, product.quanntity)} className='btn btn-outline-success'>-</button>
                            </div>

                        </div>
                    </div>

                })}
                <div className="d-flex align-items-center justify-content-center">
                    <button onClick={() => { clearAllProduct() }} className='btn btn-outline-success py-3 px-4'>Clear Your Cart</button>
                </div>
            </div>
        </div>
    </>
}