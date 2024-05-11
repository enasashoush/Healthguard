import { Link } from 'react-router-dom';
import axios from 'axios';
import { Puff } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart as SolidHeart } from 'react-icons/fa';
import { API_BASE_URL } from '../../config';

export default function Product() {
    const { addProduct, addProductToWishList, deleteItemFromWish, wishListStatus, setWishListStatus } = useContext(CartContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    
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
    
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/Products`, {
                params: {
                    pageSize: 10, // Example: Set a default page size
                    pageIndex: 1, // Example: Set a default page index
                    // Search: search // Uncomment this line if you want to include search functionality
                }
            });
            console.log( "respone",response);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Error fetching data');
        }
    };
    

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value);
    };

    const { isLoading, data } = useQuery('allProducts', getAllProducts)

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
            <form className="d-flex justify-content-center mt-5 pt-5 w-75 " role="search">
                <input className="search-input search-pp form-control me-2" type="search" placeholder="Search For Product" aria-label="Search" onChange={handleSearchInputChange} />
                <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
        </div>
        
        <div className="row row-cols-2 row-cols-sm-3  row-cols-md-4 row-cols-lg-5 g-3 container-fluid mt-5">
            {data?.map(function (product, idx) {
                return <div key={idx} className="col">
                    <div className="card h-100 product">
                        <Link className='text-decoration-none' to={`/productDetails/${product.id}/${product.category}`}>
                            <img src={product.pictureUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h6 className="card-title text-main">{product.category}</h6>
                                <h5 className="card-title text-dark">{product.name.split(' ').slice(0 - 2).join(' ')}</h5>
                            </div>
                            <div className="d-flex justify-content-around">
                                <p className='logo'>{product.price}</p>
                                <p className='text-dark'> {product.rate} <i className="fa-solid fa-star text-warning"></i>  </p>
                            </div>
                        </Link>

                        <div className='d-flex justify-content-around align-items-center mb-2'>
                            <button onClick={() => { addProductToCart(product.id) }} className='btn btn-outline-primary px-4'><i className="fa-solid fa-plus"></i></button>
                            <i>{wishListStatus[product.id] ? (
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
                            )}</i>
                        </div>
                    </div>
                </div>
            })}
        </div>
        
        <div className="pagination-controls">
            <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}>Previous</button>
            <button onClick={() => setCurrentPage(currentPage - 1)}>Page {currentPage - 1}</button>
            <button onClick={() => setCurrentPage(currentPage)} className="active">Page {currentPage}</button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Page {currentPage + 1}</button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
    </>
}
