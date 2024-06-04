import HomeSlider from './../HomeSlider/HomeSlider';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Categories from './../Categories/Categories';
import Nursing from './../Nursing/Nursing';



export default function Home() {
       return <>
            <HomeSlider />
            <Categories />
            <Nursing />
        </>
}