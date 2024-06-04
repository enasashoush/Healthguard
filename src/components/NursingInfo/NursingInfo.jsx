import { Helmet } from 'react-helmet';
import { Puff } from 'react-loader-spinner';
import { API_BASE_URL } from '../../config';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function NurseInfo() {
    const { id } = useParams()

    function getNurseInfo() {
        return axios.get(`${API_BASE_URL}/api/Nurse/${id}`)

    }

    const { data, isLoading } = useQuery("nurseInfo", getNurseInfo)
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

    const handleBookNow = () => {
        window.location.href = `/bookForm/${id}`; 
    };


    return <>
        <Helmet>
            <title>{data.data.nurseName}</title>
        </Helmet>
        <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>
        <div className="container  bg-light border rounded" style={{ marginTop: "100px" }} >
            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img className=" w-75 w-md-25 mt-3 border rounded-circle" src={data.data.picUrl} alt="Nurse" />
                </div>
                <div className="col-sm-12 col-md-6 p-5">
                    <h3 className="card-title text-main py-2">Nurse Information</h3>
                    <p className="card-text"><strong className='logo'>Name:</strong> {data.data.nurseName} </p>
                    <p className="card-text"><strong className='logo'>Specialization:</strong> {data.data.description} </p>
                    <p className="card-text"><strong className='logo'>Specialty:</strong> {data.data.specialty}</p>
                    <p className="card-text"><strong className='logo'>Hospital:</strong> {data.data.hospital}</p>
                    <p className="card-text"><strong className='logo'>Fees:</strong> {data.data.price} </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center pb-3">
                    <button className="btn btn-outline-primary px-5" onClick={handleBookNow}>Book Now</button>
                </div>
            </div>
        </div>

    </>
}