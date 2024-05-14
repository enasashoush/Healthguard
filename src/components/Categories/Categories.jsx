import { Helmet } from "react-helmet";
import axios from 'axios';
import { Puff } from 'react-loader-spinner';
import './categories.css'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

export default function Categories() {

    async function getAllCategories() {
        try {
            console.log("Fetching categories...");
            const response = await axios.get(`${API_BASE_URL}/api/Products/categories`);
            console.log("Response data:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error("Error fetching categories");
        }
    }

    const { isLoading, data } = useQuery('allCategories', getAllCategories);

    if (isLoading) {
        return (
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
        );
    }

    if (!data) {
        return (
            <div>Error fetching categories. Please try again later.</div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Categories</title>
            </Helmet>

            <div className="container mt-5 pt-5">
                <div className="row g-4">
                    {data?.map((category, idx) => (
                        <div key={idx} className="col-lg-4">
                            <Link className='text-decoration-none' to={`/categoryDetails/${category.id}`}>
                                <div className="card cat-card">
                                    <div className="cat-card-image">
                                        <img style={{ height: '300px' }} className="w-100 img-fluid" src={category.pictureUrl} alt="" />
                                        <div className="overlay">
                                            <div className="overlay-text">
                                                <h3>{category.name}</h3>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
