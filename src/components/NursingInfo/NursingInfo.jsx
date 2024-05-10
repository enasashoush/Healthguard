
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Puff } from 'react-loader-spinner';

export default function NurseInfo() {
    const [activeTab, setActiveTab] = useState('reviews');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [nurseInfo, setNurseInfo] = useState(null);

    useEffect(() => {
        // Simulating fetching user info from an API
        setTimeout(() => {
            setNurseInfo({
                name: "Enas",
                location: 'nasr city',
                specialization: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ratione tenetur aspernatur esse laborum harum repellendus voluptatum necessitatibus ullam dolores?",
                fees: "$200",
                image: "https://via.placeholder.com/150", // Example image URL
                // Additional info can be added here
            });
        }, 1000);
    }, []);

    if (!nurseInfo) {
        return<div className="vh-100 d-flex justify-content-center align-items-center">
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
        window.location.href = '/bookForm'; // Navigate to '/booking' path
    };

    return <>
        <Helmet>
            <title>Nurse Info</title>
        </Helmet>
        <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>
        <div className="container  bg-light border rounded"  style={{ marginTop: "100px" }} >
            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img className=" w-50 w-md-25 mt-3 border rounded-circle" src={nurseInfo.image} alt="Nurse Image" />
                </div>
                <div className="col-sm-12 col-md-6 p-5">
                    <h3 className="card-title text-main py-2">Nurse Information</h3>
                    <p className="card-text"><strong className='logo'>Name:</strong> {nurseInfo.name} </p>
                    <p className="card-text"><strong className='logo'>Specialization:</strong> {nurseInfo.specialization} </p>
                    <p className="card-text"><strong className='logo'>Location:</strong> {nurseInfo.location} </p>
                    <p className="card-text"><strong className='logo'>Fees:</strong> {nurseInfo.fees} </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center pb-3">
                    <button className="btn btn-outline-primary px-5" onClick={handleBookNow}>Book Now</button>
                </div>
            </div>
        </div>

        <div className='container'>
            <ul className="nav nav-underline justify-content-center">
                <li className="nav-item text-light">
                    <a
                        className={`nav-link logo fw-bold ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => handleTabClick('reviews')}
                        href="#"
                    >
                        Reviews
                    </a>
                    {activeTab === 'reviews' && (
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, dolorum, repellat doloremque
                            eveniet quam libero saepe rem aliquid nobis consectetur sit laborum soluta. Autem, laboriosam, quia
                            odit veniam sequi beatae eos voluptate dolore eligendi. Quisquam, aperiam, velit culpa fugit
                            eveniet ex quod ducimus voluptate autem molestiae temporibus, iusto vero.
                        </p>
                    )}
                </li>
            </ul>
        </div>
    </>
}