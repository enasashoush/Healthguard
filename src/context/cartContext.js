import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const CartContext= createContext();
export function CartContextProvider({children}) {
    //cart states
    const [cartProduct, setCartProduct] = useState([])
    const [totalCartProduct, setTotalCartProduct] = useState(0)
    const [numOfCartItem, setNumOfCartItem] = useState(0)
    const [cartId, setCartId] = useState(null)
      /////cart
      //add product to cart
    async function addProduct(productId) {
       try{
        const{data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            "productId": productId
        },{
            headers:{token:localStorage.getItem("tkn")}
        })
        userCart();
        return data;
       } 
       catch(e){
        console.log("error",e)
       }
    }
    // user cart
    async function userCart() {
        try{
            const{data}=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
                headers:{token:localStorage.getItem("tkn")}
            })
            setNumOfCartItem(data.numOfCartItems)
            setTotalCartProduct(data.data.totalCartPrice)
            setCartProduct(data.data.products)
            setCartId(data.data._id)
           } 
           catch(e){
            console.log("error",e)
           }
        
    }
//delete product from cart
    async function deleteItem(productId) {
        try{
            const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                headers:{token:localStorage.getItem("tkn")}
            })
            setNumOfCartItem(data.numOfCartItems)
        setTotalCartProduct(data.data.totalCartPrice)
        setCartProduct(data.data.products)
        return data;
           } 
           catch(e){
            console.log("error",e)
           }
        
    }
    //update product from cart
    async function updateItem(productId,count) {
        try{
            const{data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    "count": count
                }
            ,{
                headers:{token:localStorage.getItem("tkn")}
            })
              setNumOfCartItem(data.numOfCartItems)
              setTotalCartProduct(data.data.totalCartPrice)
              setCartProduct(data.data.products)
        return data;
           } 
           catch(e){
            console.log("error",e)
           }
        
    }
    //clear all product from cart 
    async function clearAllProduct() {
        try{
            const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
              {
                headers:{token:localStorage.getItem("tkn")}
            })
              setNumOfCartItem(0)
              setTotalCartProduct(0)
              setCartProduct([])
        return data;
           } 
           catch(e){
            console.log("error",e)
           }
        
    }
    //wish list states
    const [wishListProduct, setWishListProduct] = useState([])
    const [wishListStatus, setWishListStatus] = useState(() => {
        const savedStatus = localStorage.getItem('wishlistStatus');
        return savedStatus ? JSON.parse(savedStatus) : {};
      });
    //add prduct to wish list   
    async function addProductToWishList(productWishId) {
        try{
         const{data}=await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
             "productId": productWishId
         },{
             headers:{token:localStorage.getItem("tkn")}
         })
         userWishList()
         return data;
        } 
        catch(e){
         console.log("error",e)
        }
     }
     //api of wish list
     async function userWishList() {
        try{
            const{data}=await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
                headers:{token:localStorage.getItem("tkn")}
            })
            setWishListProduct(data.data)
           } 
           catch(e){
            console.log("error",e)
           }
        
    }
    //delete from wish list
    async function deleteItemFromWish(productDElId) {
        try{
            const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productDElId}`,{
                headers:{token:localStorage.getItem("tkn")}
            })
            setWishListProduct(data.data)
            userWishList()
        return data;
           } 
           catch(e){
            console.log("error",e)
           }
        
    }
//to can use user cart and wish list
useEffect(() => {
    userCart()
    userWishList()
   }, [])
    return<CartContext.Provider value={{
        addProduct ,
        cartProduct, 
        totalCartProduct,
        numOfCartItem,
        userCart,
        deleteItem,
        updateItem,
        clearAllProduct,
        cartId,
        setCartProduct,
        setNumOfCartItem,
        setTotalCartProduct,
        addProductToWishList,
        userWishList,
        setWishListProduct,
        wishListProduct,
        deleteItemFromWish,
        wishListStatus,
        setWishListStatus
        }}>
    {children}
    </CartContext.Provider>
    
}