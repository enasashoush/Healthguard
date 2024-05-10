import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/cartContext';
import { AuthContext } from '../../context/authContext';


export default function Navbar() {
    const { token, setToken } = useContext(AuthContext);
    const {numOfCartItem}=useContext(CartContext)
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate()
    function logout() {
        localStorage.removeItem('tkn')
        setToken(null)
        navigate('/login')
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const shouldScroll = window.scrollY > 0;
        if (shouldScroll && !scrolled) {
            setScrolled(true);
        } 
        else {
            setScrolled(false);
        }
    };

    return <>
        <nav className={`navbar navbar-expand-lg navbar-dark ${scrolled ? 'bg-main' : 'bg-white'
            } fixed-top`}>
            <div className="container-fluid">
                <img src={require("../../image/healthguard logo.jpeg")} alt="Logo" width="40" height="35" className="d-inline-block align-text-top rounded-circle mx-2" />
                <Link className="navbar-brand logo fw-bold" to="/home">
                    Health Guard
                </Link>
                <button
                    className="navbar-toggler bg-main"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        {token ? <>
                            <li className="nav-item">
                                <Link className={`nav-link  ${scrolled ? 'text-light' : 'text-main'}`} aria-current="page" to="/home">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${scrolled ? 'text-light' : 'text-main'}`} to="/products">
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${scrolled ? 'text-light' : 'text-main'}`} to="/nursing">
                                    Nursing
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${scrolled ? 'text-light' : 'text-main'}`} to="/wishlist">
                                    Wishlist
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link pe-5 ${scrolled ? 'text-light' : 'text-main'}`} to="/about">
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/nurseBooking">
                                <i class="fa-solid fa-user-nurse text-main"></i>                                
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/cart">
                                    <i className="fa-solid fa-cart-plus pe-3 text-main position-relative">
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                        {numOfCartItem}
                                     <span class="visually-hidden">unread messages</span>
                                     </span>
                                    </i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/account">
                                    <i className="fa-regular fa-user pe-3 text-main"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <span onClick={logout} style={{ cursor: 'pointer' }} className="nav-link text-light" to="/register">
                                    <i className="fa-solid fa-arrow-right-from-bracket text-main"></i>
                                </span>
                            </li>
                        </> : <>
                            <li className="nav-item">
                                <Link className={`nav-link pe-5 ${scrolled ? 'text-light' : 'text-main'}`} to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link pe-5 ${scrolled ? 'text-light' : 'text-main'}`} to="/register">
                                    Sign Up
                                </Link>
                            </li>
                        </>}

                    </ul>
                </div>
            </div>
        </nav>
    </>

}