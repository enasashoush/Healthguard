// import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
// import { CartContext } from '../../context/cartContext'
// import { toast } from 'react-hot-toast';

export default function WishList() {
  // const { wishListProduct, deleteItemFromWish, addProduct, setWishListStatus } = useContext(CartContext)
  // // funcation that call funcation delelte from wish list context 
  // async function delElement(id) {
  //   const res = await deleteItemFromWish(id);
  //   if (res) {
  //     toast.success("Product Deleted");
  //     // Update wishListStatus state to remove the deleted product id
  //     setWishListStatus(prevStatus => {
  //       const updatedStatus = { ...prevStatus };
  //       delete updatedStatus[id];
  //       return updatedStatus;
  //     });
  //   } else {
  //     toast.error("Error in Delete Element"); 
  //   }
  // }
 
  // async function addProductToCart(id) {

  //   const res = await addProduct(id)
  //   if (res) {
  //     toast.success("Prduct Added successfully", {
  //       duration: 2000
  //     })
  //   } else {
  //     toast.error("Error Happened")
  //   }

  // }
  return <>
    <Helmet><title>
      WishList
    </title></Helmet>
  </>
}
