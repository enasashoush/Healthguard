import './nursing.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import { Puff } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Nursing() {

    const getAllNurses = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/Nurse`);
            console.log("response", data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Error fetching data');
        }
    };

    const handleBookNow = (nurseId) => {
        window.location.href = `/bookForm/${nurseId}`; 
    };

    const { isLoading, data } = useQuery('allProducts', getAllNurses);

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

    return (
        <>
            <Helmet>
                <title>Nursing</title>
            </Helmet>
            <style>{`
                body {
                    background: linear-gradient(to top, #072E33, #009578); 
                    margin: 0;
                    padding: 0; 
                }
            `}</style>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {data?.nurses?.map((nurse, idx) => (
                            <div key={idx} className="doctor-card d-flex justify-content-center align-items-center">
                                <Link className='d-flex text-decoration-none' to={`/nurseInfo/${nurse.id}`}>
                                    <img src={nurse.picUrl} alt="Doctor Image" className="doctor-image" />
                                    <div>
                                        <h3 className="doctor-name text-main">{nurse.nurseName}</h3>
                                        <p className="doctor-location text-dark">
                                            <i className="fa-solid fa-location-dot logo"></i> Location: Nasr City
                                        </p>
                                        <p className="doctor-available-time text-dark">
                                            <i className="fa-regular fa-clock logo"></i> Available Time: Monday - Friday, 9:00 AM - 5:00 PM
                                        </p>
                                        <p className="doctor-fees text-dark">
                                            <i className="fa-solid fa-money-bill-wave logo"></i> Consultation Fees: {nurse.price}
                                        </p>
                                    </div>
                                </Link>
                                <div>
                                    <button className="btn btn-outline-primary mx-2" onClick={() => handleBookNow(nurse.id)}>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
