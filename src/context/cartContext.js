import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
export const CartContext= createContext();
export function CartContextProvider({children}) {
    //cart states
    const [cartProduct, setCartProduct] = useState([])
    const [totalCartProduct, setTotalCartProduct] = useState(0)
    const [numOfCartItem, setNumOfCartItem] = useState(0)
    const [cartId, setCartId] = useState(null)
      /////cart
  // Function to add a product to the cart
  async function addProduct(productId) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/Basket/add-to-basket`,
            {
                "productId":productId
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
            }
        );
        const data = response.data; 
        userCart(); 
        return data;
    } catch (e) {
        console.log("Error:", e);
    }
}


// Function to get the user's cart data
async function userCart() {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/Basket`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
        });
        setNumOfCartItem(data.totalQuantity);
        setTotalCartProduct(data.totalPrice);
        setCartProduct(data.basket.items);
        setCartId(data.basket.id);
        return data;
    } catch (e) {
        console.log("error", e);
    }
}


//delete product from cart
async function deleteItem(itemId) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/Basket/delete-from-basket/${itemId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
        });

        const data = response.data;
        if (data) {
            setNumOfCartItem(data.totalQuantity);
            setTotalCartProduct(data.totalPrice);
            setCartProduct(data.basket.items);
            return data;
        } else {
            return null; 
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}

    //update product from cart
    async function updateItem(itemId,newQuantity) {
        try{
            const{data}=await axios.put(`${API_BASE_URL}/api/Basket/update-basket-item-quantity/${itemId}/${newQuantity}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("tkn")}` }
            })
            setNumOfCartItem(data.totalQuantity);
            setTotalCartProduct(data.totalPrice);
            setCartProduct(data.basket.items);
        return data;
           } 
           catch(e){
            console.log("error",e)
           }
        
    }
    //clear all product from cart 
    async function clearAllProduct(id) {
        try{
            const{data}=await axios.delete(`${API_BASE_URL}/api/Basket/${id}`,{
                "id":id
            },
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