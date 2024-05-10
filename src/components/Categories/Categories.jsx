import { Helmet } from "react-helmet";
import axios from 'axios';
import { Puff } from 'react-loader-spinner';
import './categories.css'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';


export default function Categories() {

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const { isLoading, data } = useQuery('allCategories', getAllCategories)
    console.log(data);
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
            <title>Categories</title>
        </Helmet>

        <div className=" container mt-5 pt-5 ">
            <div className="row  g-4">
                {data?.data.data.map(function (product, idx) {
                   return <div key={idx} className="col-lg-4">
                       <Link className='text-decoration-none' to={`/categoryDetails/${product._id}/${product.name}`}>
                       <div className="card  cat-card">
                            <div className="cat-card-image">
                            {/* src={product.image} alt={product.name} */}
                                <img style={{ height: '300px' }} className="w-100" src={require('../../image/healthguard logo.jpeg')} alt="" />
                                <div className="overlay">
                                    <div className="overlay-text">
                                    {/* {product.name} */}
                                        <h3>category name</h3>
                                    </div>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                })}
            </div>
        </div>


    </>
}