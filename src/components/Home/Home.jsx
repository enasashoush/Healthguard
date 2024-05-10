import HomeSlider from './../HomeSlider/HomeSlider';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Categories from './../Categories/Categories';
import Nursing from './../Nursing/Nursing';
import { AuthContext } from './../../context/authContext';
import { useContext } from 'react';


export default function Home() {
    const { token } = useContext(AuthContext);
       return <>
            <HomeSlider />
            <Categories />
            <Nursing />
        </>
}