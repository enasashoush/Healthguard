import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return <>
        <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
          height: 100vh; 
        }
      `}</style>
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center text-white">
                        <h1 className="display-1">404 - Not Found</h1>
                        <p className="lead">Oops! The page you are looking for does not exist.</p>
                        <Link to="/home" className="btn btn-outline-light mt-3">Go to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default NotFound;
