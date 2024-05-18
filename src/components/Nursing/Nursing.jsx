import './nursing.css'
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
            console.log("respone", data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Error fetching data');
        }
    };


    const handleBookNow = () => {
        window.location.href = '/bookForm'; // Navigate to '/booking' path
    };

    const { isLoading, data } = useQuery('allProducts', getAllNurses)

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
        <Helmet >
            <title>Nursing</title>
        </Helmet>
        <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    {/* /${nurse.id}  hnzwd di fi el link*/}
                    {data?.nurses?.map(function (nurse, idx) {
                        return <div key={idx} class="doctor-card d-flex justify-content-center align-items-center">
                            <Link className=' d-flex text-decoration-none ' to={`/nurseInfo/${nurse.id}`}>
                                <img src={nurse.picUrl} alt="Doctor Image" class="doctor-image" />
                                <div>
                                    <h3 class="doctor-name text-main">{nurse.nurseName} </h3>
                                    <p class="doctor-location text-dark"> <i class="fa-solid fa-location-dot logo"></i> Location: Nasr City</p>
                                    <p class="doctor-available-time text-dark"> <i class="fa-regular fa-clock logo"></i> Available Time: Monday - Friday, 9:00 AM - 5:00 PM</p>
                                    <p class="doctor-fees text-dark"> <i class="fa-solid fa-money-bill-wave logo"></i> Consultation Fees: {nurse.price}</p>
                                </div>
                            </Link>

                            <div >
                                <button className="btn btn-outline-primary mx-2 " onClick={handleBookNow}> Book Now </button>
                            </div>

                        </div>
                    })}

                </div>
            </div>
        </div>

    </>



}