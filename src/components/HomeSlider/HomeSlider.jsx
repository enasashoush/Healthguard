import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {

        const settings = {
            dots: true,
            fade: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            waitForAnimate: true
        };
        return <>
            <div className="slider-container container w-75 mt-5 pt-5">
                <Slider {...settings}>
                    <div >
                        <img className="w-100" src='https://www.slideegg.com/image/catalog/61127-powerpoint%20quote%20slide.png' alt="" />
                    </div>
                    <div>
                        <img className="w-100"  src='https://slidebazaar.com/wp-content/uploads/2022/12/Quote-Slide-for-PowerPoint-jpg-webp.webp' alt="" />
                    </div>
                    <div>
                        <img className="w-100"  src='https://www.slideteam.net/media/catalog/product/cache/330x186/q/u/quotes_comprehensive_guide_to_sustainable_marketing_mkt_ss_slide01.jpg' alt="" />
                    </div>
                    <div>
                        <img className="w-100"  src='https://www.slideteam.net/media/catalog/product/cache/330x186/q/u/quotes_trends_and_opportunities_in_the_information_technology_industry_market_analysis_report_mkt_ss_v_slide01.jpg' alt="" />
                    </div>
                </Slider>
            </div>
        </>

    

}