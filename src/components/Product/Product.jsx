import { Link } from 'react-router-dom';
import axios from 'axios';
import { Puff } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart as SolidHeart } from 'react-icons/fa';

export default function Product() {
    const { addProduct, addProductToWishList, deleteItemFromWish,wishListStatus,setWishListStatus } = useContext(CartContext)
    //funcation that call allproduct in cart from cart context
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
    //funcation that call all product in wishlist
    async function ProductWishList(id) {
        if (!id) {
            console.error("Product id is not defined");
            return;
        }
        try {
            let res;
            if (wishListStatus[id]) {
                res = await deleteItemFromWish(id);
            } else {
                res = await addProductToWishList(id);
            }

            if (res.status === "success") {
                toast.success(res.message, { duration: 2000 });
                setWishListStatus(prevStatus => ({ ...prevStatus, [id]: !prevStatus[id] }));
                localStorage.setItem('wishlistStatus', JSON.stringify({ ...wishListStatus, [id]: !wishListStatus[id] }));
            } else {
                toast.error("Error occurred");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred");
        }
    }
    //get product from api 
    function getAllProducts() {

        return axios.get('https://ecommerce.routemisr.com/api/v1/products')

    }
    const { isLoading, data } = useQuery('allProducts', getAllProducts)
    //loading screen
    if (isLoading) {
        return <div className="vh-100 d-flex justify-content-center align-items-center">
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
    }

    return <>
        <Helmet>
            <title>Products</title>
        </Helmet>
        <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>

        <div className="d-flex justify-content-center">
            <form class="d-flex justify-content-center mt-5 pt-5 w-75 " role="search">
                <input class="search-input search-pp form-control me-2" type="search" placeholder="Search For Product" aria-label="Search" />
                <button class="btn btn-outline-light" type="submit">Search</button>
            </form>
        </div>
        <div className="row row-cols-2 row-cols-sm-3  row-cols-md-4 row-cols-lg-5 g-3 container-fluid mt-5">

            {data?.data.data.map(function (product, idx) {
                return <div key={idx} className="col  ">
                    <div className="card h-100 product">
                        <Link className='text-decoration-none' to={`/productDetails/${product.id}/${product.category.name}`}>

                            {/* {product.imageCover} */}
                            <img src={require('../../image/healthguard logo.jpeg')} className="card-img-top" alt={product.title} />
                            <div className="card-body">
                                {/* {product.category.name} */}
                                <h6 className="card-title text-main">product category</h6>
                                {/* {product.title.split(' ').slice(0 - 2).join(' ')} */}
                                <h5 className="card-title text-dark">product name</h5>
                            </div>
                            <div className="d-flex justify-content-around">
                                {/* {product.price} EGP */}
                                <p className='logo'>price</p>
                                {/* {product.ratingsAverage} */}
                                <p className='text-dark'> rate <i className="fa-solid fa-star text-warning"></i>  </p>
                            </div>
                        </Link>

                        <div className='d-flex justify-content-around align-items-center mb-2'>
                            <button onClick={() => { addProductToCart(product.id) }} className='btn btn-outline-primary px-4'><i class="fa-solid fa-plus"></i></button>
                            <Link><i>{wishListStatus[product.id] ? (
                            <SolidHeart
                                onClick={() => ProductWishList(product.id)}
                                className="text-danger"
                                style={{ cursor: 'pointer' }}
                            />
                        ) : (
                            <FaRegHeart
                                onClick={() => ProductWishList(product.id)}
                                className="text-dark"
                                style={{ cursor: 'pointer' }}
                            />
                        )}</i></Link>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </>
}

