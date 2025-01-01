// import axios from 'axios';
// import { useContext, useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { FallingLines, Puff } from 'react-loader-spinner';
// import { useQuery } from 'react-query';
// import { Link, useParams } from 'react-router-dom';
// import { CartContext } from '../../context/cartContext';
// import toast from 'react-hot-toast';
// import { FaRegHeart } from "react-icons/fa";
// import { FaHeart as SolidHeart } from 'react-icons/fa';
// import { API_BASE_URL } from '../../config';

export default function ProductDetails() {
    // const { addProduct, addProductToWishList, deleteItemFromWish, wishListStatus, setWishListStatus } = useContext(CartContext)
    // const [cartLooder, setCartLooder] = useState(false)
    
    // //  fucation that call add product to cart funcation from cart context 
    // async function addProductToCart(productId) {
    //     setCartLooder(true)
    //     const res = await addProduct(productId)
    //     if (res) {
    //         toast.success("Product Added successfully", {
    //             duration: 2000
    //         })
    //     } else {
    //         toast.error("Error Happened")
    //     }
    //     setCartLooder(false)
    // }
    // // funcation that call allproduct to add wish list
    // async function ProductWishList(id) {
    //     if (!id) {
    //         console.error("Product id is not defined");
    //         return;
    //     }
    //     try {
    //         let res;
    //         if (wishListStatus[id]) {
    //             res = await deleteItemFromWish(id);
    //         } else {
    //             res = await addProductToWishList(id);
    //         }
    //         if (res) {
    //             if (wishListStatus[id]) {
    //                 toast.success("Product Removed from Wishlist Successfully", { duration: 2000 });
    //             } else {
    //                 toast.success("Product Added to Wishlist Successfully", { duration: 2000 });
    //             }
    //             setWishListStatus(prevStatus => ({ ...prevStatus, [id]: !prevStatus[id] }));
    //             localStorage.setItem('wishlistStatus', JSON.stringify({ ...wishListStatus, [id]: !wishListStatus[id] }));
    //         } else {
    //             toast.error("Error occurred");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         toast.error("An error occurred");
    //     }
    // }

    // const { id } = useParams()
    // //get product by id from api 
    // function getProductDetails() {
    //     return axios.get(`${API_BASE_URL}/api/Products/${id}`)

    // }

    // const { data, isLoading } = useQuery("productDetails", getProductDetails)
    // //loading screen 
    // if (isLoading) {
    //     return <div className="vh-100 d-flex justify-content-center align-items-center">
    //         <Puff
    //             visible={true}
    //             height="80"
    //             width="80"
    //             color="#0F969C"
    //             ariaLabel="puff-loading"
    //             wrapperStyle={{}}
    //             wrapperClass=""
    //         />
    //     </div>
    // }

    return <>

    </>
}