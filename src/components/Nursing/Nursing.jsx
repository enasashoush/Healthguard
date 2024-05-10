import './nursing.css'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Nursing() {



    const handleBookNow = () => {
        window.location.href = '/bookForm'; // Navigate to '/booking' path
    };

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
                    <div class="doctor-card d-flex justify-content-center align-items-center">
                        <Link className=' d-flex text-decoration-none ' to={`/nurseInfo`}>
                            <img src='https://via.placeholder.com/150' alt="Doctor Image" class="doctor-image" />
                            <div>
                                <h3 class="doctor-name text-main">Dr. Enas </h3>
                                <p class="doctor-location text-dark"> <i class="fa-solid fa-location-dot logo"></i> Location: Nasr City</p>
                                <p class="doctor-available-time text-dark"> <i class="fa-regular fa-clock logo"></i> Available Time: Monday - Friday, 9:00 AM - 5:00 PM</p>
                                <p class="doctor-fees text-dark"> <i class="fa-solid fa-money-bill-wave logo"></i> Consultation Fees: $150</p>
                            </div>
                        </Link>

                        <div >
                            <button className="btn btn-outline-primary mx-2 " onClick={handleBookNow}> Book Now </button>
                        </div>

                    </div>

                </div>
                <div class="col-md-8 offset-md-2">
                    <div class="doctor-card d-flex align-items-center">
                        <img src='https://via.placeholder.com/150' alt="Doctor Image" class="doctor-image" />
                        <div>
                            <h3 class="doctor-name">Dr. Enas </h3>
                            <p class="doctor-location"> <i class="fa-solid fa-location-dot logo"></i> Location: Nasr City</p>
                            <p class="doctor-available-time"> <i class="fa-regular fa-clock logo"></i> Available Time: Monday - Friday, 9:00 AM - 5:00 PM</p>
                            <p class="doctor-fees"> <i class="fa-solid fa-money-bill-wave logo"></i> Consultation Fees: $150</p>
                        </div>

                        <div >
                            <button className="btn btn-outline-primary mx-2 "> Book Now </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 offset-md-2">
                    <div class="doctor-card d-flex align-items-center">
                        <img src='https://via.placeholder.com/150' alt="Doctor Image" class="doctor-image" />
                        <div>
                            <h3 class="doctor-name">Dr. Enas </h3>
                            <p class="doctor-location"> <i class="fa-solid fa-location-dot logo"></i> Location: Nasr City</p>
                            <p class="doctor-available-time"> <i class="fa-regular fa-clock logo"></i> Available Time: Monday - Friday, 9:00 AM - 5:00 PM</p>
                            <p class="doctor-fees"> <i class="fa-solid fa-money-bill-wave logo"></i> Consultation Fees: $150</p>
                        </div>

                        <div >
                            <button className="btn btn-outline-primary mx-2 "> Book Now </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 offset-md-2">
                    <div class="doctor-card d-flex align-items-center">
                        <img src='https://via.placeholder.com/150' alt="Doctor Image" class="doctor-image" />
                        <div>
                            <h3 class="doctor-name">Dr. Enas </h3>
                            <p class="doctor-location"> <i class="fa-solid fa-location-dot logo"></i> Location: Nasr City</p>
                            <p class="doctor-available-time"> <i class="fa-regular fa-clock logo"></i> Available Time: Monday - Friday, 9:00 AM - 5:00 PM</p>
                            <p class="doctor-fees"> <i class="fa-solid fa-money-bill-wave logo"></i> Consultation Fees: $150</p>
                        </div>

                        <div >
                            <button className="btn btn-outline-primary mx-2 "> Book Now </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 offset-md-2">
                    <div class="doctor-card d-flex align-items-center">
                        <img src='https://via.placeholder.com/150' alt="Doctor Image" class="doctor-image" />
                        <div>
                            <h3 class="doctor-name">Dr. Enas </h3>
                            <p class="doctor-location"> <i class="fa-solid fa-location-dot logo"></i> Location: Nasr City</p>
                            <p class="doctor-available-time"> <i class="fa-regular fa-clock logo"></i> Available Time: Monday - Friday, 9:00 AM - 5:00 PM</p>
                            <p class="doctor-fees"> <i class="fa-solid fa-money-bill-wave logo"></i> Consultation Fees: $150</p>
                        </div>

                        <div >
                            <button className="btn btn-outline-primary mx-2 "> Book Now </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>



}