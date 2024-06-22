
import { Link } from 'react-router-dom';
import './footer.css'

export default function Footer() {

    return <>

        <div id="contact" className="blog py-1 mt-5 shadow-sm ">
            <div className="container text-light my-1">
                <div className="row">
                    <div className="col-xl-6">
                        <div>
                            <h3 className="fw-bold">Get In Touch</h3>
                            <div className="col-1 border border-2 border-success "></div>
                            <p className="text-light"> Welcome to Health Guard, your trusted source for medical supplies tailored to special needs. 
                            We are committed to providing quality products and services to ensure the well-being of our customers. 
                            Whether you need medical supplies or wish to schedule an appointment with a nurse, we are here to help.</p>
                            <div className="text-light">
                                <p><i className="logo fa-solid fa-mobile-screen-button"></i>  0123 456 7890 </p>
                                <p><i className="logo fa-regular fa-envelope"></i> healthguard@gmail.com </p>
                            </div>
                            <div className="d-inline-block">
                                <ul className="list-inline d-flex justify-content-center">
                                    <li><Link href="#"><i className="icon-footer border border-3 rounded-circle p-2 me-2 text-light   fa-brands fa-facebook-f "></i></Link></li>
                                    <li><Link href="#"><i className="icon-footer border border-3 rounded-circle p-2 me-2 text-light   fa-brands fa-instagram"></i></Link></li>
                                    <li><Link href="#"><i className="icon-footer border border-3 rounded-circle p-2 me-2 text-light   fa-brands fa-twitter"></i></Link></li>
                                    <li><Link href="#"><i className="icon-footer border border-3 rounded-circle p-2 me-2 text-light   fa-brands fa-linkedin-in"></i></Link></li>
                                </ul>
                            </div>

                            <footer class="footer text-center">
                                <div class="container">
                                    <span> &copy; 2024 Medical Supplements. All rights reserved.</span>
                                </div>
                            </footer>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
}