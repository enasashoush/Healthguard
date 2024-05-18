import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../context/cartContext'
import { toast } from 'react-hot-toast';

export default function WishList() {
  const { wishListProduct, deleteItemFromWish, addProduct, setWishListStatus } = useContext(CartContext)
  // funcation that call funcation delelte from wish list context 
  async function delElement(id) {
    const res = await deleteItemFromWish(id);
    if (res) {
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
    if (res) {
      toast.success("Prduct Added successfully", {
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
                  <img src={product.picUrl}  className='w-100' alt='cover'/>
                </div>
                <div className="col-md-8">
                  <h3>{product.productName}</h3>
                  <h3>{product.price}</h3>
                  <button onClick={() =>  delElement(product.id) } className='btn btn-outline-danger mt-2 '>Remove</button>
                </div>
                <div className="col-md-2">
                  <div className="d-flex align-items-center">
                    <button onClick={() => addProductToCart(product.id)} className='btn btn-outline-success '>Add to Cart</button>
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
