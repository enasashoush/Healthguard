import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../context/cartContext'
import { toast } from 'react-hot-toast';

export default function WishList() {
  const { wishListProduct, deleteItemFromWish, addProduct, setWishListStatus } = useContext(CartContext)
  // funcation that call funcation delelte from wish list context 
  async function delElement(id) {
    const res = await deleteItemFromWish(id);
    if (res.status === "success") {
      toast.success("Product Deleted");
      // Update wishListStatus state to remove the deleted product id
      setWishListStatus(prevStatus => {
        const updatedStatus = { ...prevStatus };
        delete updatedStatus[id];
        return updatedStatus;
      });
    } else {
      toast.error("Error in Delete Element");
    }
  }

  async function addProductToCart(id) {

    const res = await addProduct(id)
    if (res.status === "success") {
      toast.success(res.message, {
        duration: 2000
      })
    } else {
      toast.error("Error Happened")
    }

  }
  return <>
    <Helmet><title>
      WishList
    </title></Helmet>
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
          <h1 className='text-main'>Wishlist Products</h1>
          <div className="d-felx justify-content-between">
            {wishListProduct.map(function (product, idx) {
              return <div key={idx} className="row align-items-center border-bottom border-3 my-5 pb-3">
                <div className="col-md-2">
                {/* src={product.imageCover} */}
                  <img src={require('../../image/healthguard logo.jpeg')}  className='w-100' alt='cover'></img>
                </div>
                <div className="col-md-8">
                {/* {product.title} */}
                  <h3>product name</h3>
                  {/* {product.price}  */}
                  <h3>price</h3>
                  <button onClick={() => { delElement(product._id) }} className='btn btn-outline-danger mt-2 '>Remove</button>
                </div>
                <div className="col-md-2">
                  <div className="d-flex align-items-center">
                    <button onClick={() => addProductToCart(product._id)} className='btn btn-outline-success '>Add to Cart</button>
                  </div>
                </div>
              </div>

            })}

          </div>
        </div>
      </div>
    </div>
  </>
}
